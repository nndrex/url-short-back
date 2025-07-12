import { drizzle } from 'drizzle-orm/bun-sql';
import {SQL} from 'bun'
const client = new SQL(Bun.env.DATABASE_URL!);
export const db = drizzle({client});