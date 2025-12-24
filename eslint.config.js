import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import vitest from "eslint-plugin-vitest";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  // Base JavaScript rules
  js.configs.recommended,

  // Base TypeScript rules
  ...tseslint.configs.recommended,

  // JSX accessibility rules
  jsxA11y.flatConfigs.recommended,

  // TypeScript + React files
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ['dist', 'node-modules'],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      prettier,
    },

    settings: {
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },

      "import/resolver": {
        typescript: {
          project: "./tsconfig.app.json",
          alwaysTryTypes: true,
        },
      },

      react: {
        version: "detect",
      },
    },

    rules: {
      // React / Vite
      "react/react-in-jsx-scope": "off",
      ...reactHooks.configs.recommended.rules,

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Import correctness
      "import/no-unresolved": ["error"],

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // TypeScript ergonomics
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],

      // Prettier formatting
      "prettier/prettier": "error",
    },
  },

  // Vitest test files
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
];
