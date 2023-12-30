/* eslint-disable import/prefer-default-export */
export const ENV = {
  SSO: import.meta.env.VITE_SSO,
  SSO_KEY: import.meta.env.VITE_SSO_KEY,
  API: import.meta.env.VITE_API_BASE_URL,
  SSO_API: import.meta.env.VITE_SSO_API,
  GPT_API: import.meta.env.VITE_GPT_API,
  GPT_KEY: import.meta.env.VITE_GPT_KEY,
};
