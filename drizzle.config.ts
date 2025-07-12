import { defineConfig  } from 'drizzle-kit';

export default defineConfig({
    schema: './src/infrastructure/schema.ts',
    out: './drizzle',
    dbCredentials: {
        url: process.env.DATABASE_URL!
    },
    dialect: 'postgresql'
});
