# React + TypeScript + Vite

This is a template vite project with no styling, etc.

I created this via:

* `npm create vite@latest`
* Followed instructions
* Pick React -> TypeScript + SWC
* Removed css and images
* Cleaned up code
* Converted `App.tsx` to named export.

## Add MUI

* `npm install @mui/material @emotion/react @emotion/styled`
* `npm install @fontsource/roboto`

### Add code

```javascript
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

## Add react-query

* `npm install @tanstack/react-query`

## Add zod

* `npm install zod`

## Add react-error-boundary

* `npm install react-error-boundary`

## Add lint rules

* `npm install eslint-plugin-unused-imports`
* `npm install --save-dev --save-exact prettier eslint-plugin-prettier eslint-config-prettier`

### Add code to eslintrc

```javascript
  "extends": ["plugin:prettier/recommended"]
  "plugins": ["unused-imports", "prettier"],
  "rules": {
    "unused-imports/no-unused-imports": "error",
    "prettier/prettier": "error",
  }
```

## Usage

* Run `npm install`
* Run `npm run dev`
