# @bureaudouble/icons

A comprehensive icon meta library optimized for JSR (JavaScript Registry) package manager, offering efficient per-URL fetching and caching.

## Features

- Wide variety of icons from two popular sets (Lucide, Radix)
- Optimized for JSR package manager
- Per-URL fetching and caching for improved performance
- TypeScript support
- Easy to use with React and other frameworks

## Installation

To use this package with JSR, simply import the icons directly in your code. There's no need for a separate installation step.

## Usage

Import icons directly from the package using the JSR syntax:

```tsx
import UserRoundCheckIcon from "jsr:@bureaudouble/icons/lucide/UserRoundCheckIcon"
import AccessibilityIcon from "jsr:@bureaudouble/icons/radix/AccessibilityIcon"

// Use in your React component
function MyComponent() {
  return (
    <div>
      <UserRoundCheckIcon className="w-10 h-10" />
      <AccessibilityIcon className="w-10 h-10" />
    </div>
  )
}
```

## Advantages

- **Efficient Loading**: Only the specific icons you import are fetched and cached, reducing unnecessary network requests and improving load times.
- **No Bundle Bloat**: Avoid including the entire icon library in your bundle. Each icon is loaded separately as needed.
- **Easy Updates**: Quickly update to the latest version by changing the version number in the import statement.
- **Framework Agnostic**: While the example uses React, the icons can be used with any JavaScript framework or vanilla JS.

## Available Icons

The package includes icons from various popular sets. Explore the available icons in the package documentation or repository.

## License

MIT