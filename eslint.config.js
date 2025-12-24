import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-plugin-prettier";
import vitest from "eslint-plugin-vitest";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  // Base JavaScript rules
  js.configs.recommended,

  // Base TypeScript rules
  ...tseslint.configs.recommended,

  // TypeScript + React files
  {
    files: ["**/*.{ts,tsx}"],

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
      prettier,
    },

    settings: {
      // Required for eslint-plugin-import to work with TypeScript
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },

      // Required to resolve TypeScript paths and type-only imports
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
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

      // Fail on incorrect import paths (including import type)
      "import/no-unresolved": "error",

      // Sort and fix imports and exports
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
