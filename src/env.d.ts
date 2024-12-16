/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WOOCOMMERCE_URL: string
  readonly VITE_CONSUMER_KEY: string
  readonly VITE_CONSUMER_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
