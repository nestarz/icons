import { basename, fromFileUrl, join } from "jsr:@std/path";
import { htmlToJsx } from "npm:html-to-jsx-transform";
import { BlobReader, TextWriter, ZipReader } from "jsr:@zip-js/zip-js";

for (
  const pkg of [{
    name: "lucide",
    url:
      "https://github.com/lucide-icons/lucide/releases/download/0.441.0/lucide-icons-0.441.0.zip",
  }, {
    name: "radix",
    url:
      "https://raw.githubusercontent.com/radix-ui/icons/master/radix-icons.zip",
  }]
) {
  const out = import.meta.resolve(`./${pkg}/`);
  await Deno.remove(fromFileUrl(out), { recursive: true }).catch(() => null);
  await Deno.mkdir(fromFileUrl(out), { recursive: true });

  const zipReader = new ZipReader(
    new BlobReader(
      await fetch(
        "https://github.com/lucide-icons/lucide/releases/download/0.441.0/lucide-icons-0.441.0.zip",
      ).then((r) => r.blob()),
    ),
  );

  const fileNames = [];
  for await (const iterator of await zipReader.getEntries()) {
    const writer = new TextWriter();
    const svg = await iterator?.getData?.(writer);
    if (!svg || !iterator.filename.endsWith(".svg")) continue;

    const jsx = htmlToJsx(svg);
    const name = basename(iterator.filename, ".svg")
      .replace(
        /([-_][0-9a-z])/gi,
        ($1) => $1.toUpperCase().replace("-", "").replace("_", ""),
      )
      .replace(/^([a-z])/gi, ($1) => $1.toUpperCase())
      .concat("Icon");
    const string =
      `/* @deno-types="npm:@types/react@^18.2.0" */\nimport * as React from "react";export const ${name} = ({ className }: { className?: string; }): any => ${
        jsx.replace(
          /<svg\s+/,
          "<svg className={className} ",
        )
      }; export default ${name};`;
    const filename = `${name}.tsx`;
    await Deno.writeTextFile(new URL(filename, out), string);
    fileNames.push({ name, filename });
  }
  await zipReader.close();

  await Deno.writeTextFile(
    "deno.json",
    JSON.stringify(
      {
        ...(JSON.parse(await Deno.readTextFile("deno.json")) ?? {}),
        exports: Object.fromEntries(
          fileNames.map(({ filename, name }) => [
            "./" + join(pkg.name, name),
            "./" + join(pkg.name, filename),
          ]),
        ),
      },
      null,
      2,
    ),
  );
}
