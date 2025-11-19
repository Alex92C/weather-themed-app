/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string;
  readonly VITE_WEATHER_BASE_ENDPOINT: string;
  readonly VITE_FORECAST_BASE_ENDPOINT: string;
  readonly VITE_GEOCODING_BASE_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
