# TailAdmin Theming Guide

## Centralized Font and Color Management

This TailAdmin template uses **Tailwind CSS v4** with a powerful centralized theming system. All custom styles are defined in `src/index.css` using CSS custom properties.

### 🎨 Color System

The color system is completely centralized in `src/index.css` within the `@theme` block:

```css
@theme {
  /* Brand Colors */
  --color-brand-25: #f2f7ff;
  --color-brand-50: #ecf3ff;
  --color-brand-100: #dde9ff;
  --color-brand-200: #c2d6ff;
  --color-brand-300: #9cb9ff;
  --color-brand-400: #7592ff;
  --color-brand-500: #465fff; /* Primary brand color */
  --color-brand-600: #3641f5;
  --color-brand-700: #2a31d8;
  --color-brand-800: #252dae;
  --color-brand-900: #262e89;
  --color-brand-950: #161950;

  /* Semantic Colors */
  --color-success-500: #12b76a;
  --color-error-500: #f04438;
  --color-warning-500: #f79009;

  /* Gray Scale */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f2f4f7;
  --color-gray-500: #667085;
  --color-gray-900: #101828;
}
```

### 🔤 Typography System

Fonts are also centralized:

```css
@theme {
  --font-outfit: Outfit, sans-serif;

  /* Custom Text Sizes */
  --text-theme-xl: 20px;
  --text-theme-sm: 14px;
  --text-theme-xs: 12px;
}
```

### 🎯 Usage in Components

You can use these colors anywhere in your Tailwind classes:

```tsx
// Use brand colors
<div className="bg-brand-500 text-white">Primary Button</div>
<div className="text-brand-600 border-brand-200">Branded Element</div>

// Use semantic colors
<div className="bg-success-500">Success State</div>
<div className="bg-error-500">Error State</div>

// Use custom typography
<h1 className="text-theme-xl font-outfit">Custom Heading</h1>
```

### 🛠️ Adding Custom Styles

To add new custom colors or modify existing ones:

1. **Add to `src/index.css`** in the `@theme` block:

```css
@theme {
  /* Your custom colors */
  --color-purple-500: #8b5cf6;
  --color-custom-accent: #ff6b6b;
}
```

2. **Use immediately** in your components:

```tsx
<div className="bg-purple-500 text-custom-accent">Custom styled element</div>
```

### 🌓 Dark Mode Support

The app has built-in dark mode support. Colors automatically adapt using the `dark:` prefix:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Adapts to theme
</div>
```

### 📱 Custom Utilities

The template includes many custom utility classes defined in `index.css`:

```css
@utility menu-item {
  @apply relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg text-theme-sm;
}

@utility menu-item-active {
  @apply bg-brand-50 text-brand-500 dark:bg-brand-500/[0.12] dark:text-brand-400;
}
```

### 🎨 Example: Adding a New Color Scheme

Here's how to add a custom color scheme for a new feature:

```css
/* Add to @theme block in src/index.css */
@theme {
  --color-task-primary: #6366f1;
  --color-task-secondary: #f3f4f6;
  --color-task-accent: #10b981;
}
```

Then use it:

```tsx
<div className="bg-task-primary text-white p-4 rounded-lg">
  <h3 className="text-task-accent">Task Card</h3>
  <p className="text-task-secondary">Description</p>
</div>
```

### 🔧 Benefits

1. **Centralized**: All colors and fonts in one place
2. **Consistent**: Ensures design system compliance
3. **Maintainable**: Easy to update themes globally
4. **Scalable**: Easy to add new colors and variants
5. **TypeScript Support**: Full IntelliSense support
6. **Dark Mode**: Automatic dark mode support
7. **Performance**: No runtime CSS-in-JS overhead
