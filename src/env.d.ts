/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_SSO: string;
  readonly VITE_SSO_KEY: string;
  readonly VITE_SSO_API: string;
  readonly VITE_GPT_API: string;
  readonly VITE_GPT_KEY: string;
}
