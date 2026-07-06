import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Componenti shadcn/ui e hooks generati = codice vendored (non nostro): non lo
  // teniamo agli stessi standard del codice app. Alcuni usano pattern come
  // setState-dentro-effect che la regola strict di React 19 segnala.
  {
    files: ["src/components/ui/**", "src/hooks/**"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores di eslint-config-next.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
])

export default eslintConfig
