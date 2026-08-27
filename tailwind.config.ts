import type { Config } from "tailwindcss";

/**
 * TYPOGRAPHY — do not add a fourth font family.
 * display = Archivo        headings, card titles, stat numbers
 * sans    = Inter          body, UI, forms, tables
 * mono    = JetBrains Mono technical annotation only
 * Numeric tables must also carry the `.tabular` utility.
 */
export default {
  theme: {
    fontFamily: {
      display: ['"Archivo Variable"', "Archivo", "system-ui", "sans-serif"],
      sans: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
      mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
    },
  },
} satisfies Config;
