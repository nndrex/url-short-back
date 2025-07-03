import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const urls = pgTable("urls", {
    id:serial("id").primaryKey(),
    domain:text("domain").notNull().unique(),
    fullUrl:text("full_url").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    userId: integer("user_id").notNull(),
});

export const urlRelations = relations(urls, ({ one }) => ({
    user: one(users,{
        fields: [urls.userId],
        references: [users.id]
    })
}));