import { relations } from "drizzle-orm";
import { pgTable,serial, text, timestamp,boolean } from "drizzle-orm/pg-core";
import { urls } from "./url.schema";
import { refreshTokens } from "./refreshtoken.schema";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    urls: many(urls),
    refreshTokens: many(refreshTokens)
}));