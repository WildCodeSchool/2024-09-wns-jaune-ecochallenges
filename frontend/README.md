# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

### To display images from the files service:

    - Add the image to persist/files-dev/your folder

call the image in html using /files/your folder/your image

```html
<img src="/files/icons/water.png" alt="test" />
```

### 🧪 Testing

This project uses **Vitest** as the frontend test environment.

- All test files should be placed in the `__tests__` folder inside the `frontend/` directory.
- You can run the tests from the project root using either of the following commands:

```bash
npm run test       # runs Vitest from within the frontend folder
make vitest          # runs Vitest using the Makefile from the project root
```

### 🎨 Theme System

Our app uses a custom color system based on OKLCH values for accurate contrast and modern color handling.
All design tokens are defined using CSS variables inside :root, with optional dark mode support.

You should `not` have to edit colors on a `shadcn` component and be able to use a `variant` if needed.

Follow this guideline for your custom component:

| Variable                       | Description                                                   |
| ------------------------------ | ------------------------------------------------------------- |
| `--background`                 | App/page background color                                     |
| `--foreground`                 | Default text color                                            |
| `--card`                       | Background for cards, tiles, and surfaces                     |
| `--card-foreground`            | Text color used inside cards                                  |
| `--popover`                    | Background for tooltips, dropdowns, or small overlays         |
| `--popover-foreground`         | Text inside popovers                                          |
| `--primary`                    | Main CTA (call-to-action) background (e.g., Validate, Submit) |
| `--primary-foreground`         | Text/icon color on primary buttons                            |
| `--secondary`                  | Secondary buttons or supporting interface zones               |
| `--secondary-foreground`       | Text on secondary elements                                    |
| `--accent`                     | Hover, active, or interactive accents                         |
| `--accent-foreground`          | Foreground on accent elements                                 |
| `--muted`                      | Disabled backgrounds, dividers, placeholders                  |
| `--muted-foreground`           | Dimmed or secondary text                                      |
| `--destructive`                | Error or delete action background                             |
| `--destructive-foreground`     | Text on destructive buttons                                   |
| `--border`                     | Border color for containers, cards, and forms                 |
| `--input`                      | Background for input fields and form controls                 |
| `--ring`                       | Focus ring color (used on focusable inputs/buttons)           |
| `--sidebar`                    | Sidebar or drawer menu background                             |
| `--sidebar-foreground`         | Text/icons inside sidebar                                     |
| `--sidebar-primary`            | Active sidebar item background                                |
| `--sidebar-primary-foreground` | Text for active nav item                                      |
| `--sidebar-accent`             | Hovered nav item background                                   |
| `--sidebar-accent-foreground`  | Text/icon on hovered nav item                                 |
| `--sidebar-border`             | Border between sidebar items or from layout                   |
| `--sidebar-ring`               | Focus ring for sidebar elements                               |
