import 'dotenv/config';

import { defineConfig} from 'drizzle-kit';
// config({ path: ".env" });
export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
