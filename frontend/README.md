# Информация по директориям

## dist

Это папка билда. Если её нет, то:

```bash
cd frontend
npm run build
```

## src

Здесь располагаются все TS- и TSX-модули, а также CSS-файлы

### assets

Здесь располагаются файлы изображений, шрифтов и прочей статики

### components

Здесь располагаются TSX-модули с UI-комопнентами React: баннеры, кнопки, списки и т.д. - и их файлы их стилей

### hooks

Здесь располагаются TSX-модули с пользовательскими хуками React

### store

Здесь располагаются TS-модули с менеджером состояний, а именно Redux

### utils

Здесь располагаются TS-модули для всяких часто и много где используемых утилит: констант, функций и т.п.

### views

Здесь располагаются TSX-модули со страницами сайта и маршрутизацией

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
