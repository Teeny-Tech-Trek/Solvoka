import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // Typography is centralised in tailwind.config.ts (font-display / font-sans / font-mono).
      // Raw font-family declarations bypass those tokens and drift the type system — use the
      // Tailwind classes instead.
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXAttribute[name.name='style'] Property[key.name='fontFamily']",
          message:
            'Do not set fontFamily inline. Use the font-display / font-sans / font-mono Tailwind classes from tailwind.config.ts.',
        },
      ],
    },
  },
])
