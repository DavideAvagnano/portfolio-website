import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {/* config options here */}

// Wrappa la config con next-intl. Senza argomenti usa il path di default
// `./src/i18n/request.ts` per la request config.
const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
