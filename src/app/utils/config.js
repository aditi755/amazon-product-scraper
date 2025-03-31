// /src/utils/config.js
const dev = process.env.NODE_ENV !== 'production';

export const API_URL = dev
  ? process.env.NEXT_PUBLIC_API_DEV // From .env.local
  : process.env.NEXT_PUBLIC_API_PROD; // From .env.local
