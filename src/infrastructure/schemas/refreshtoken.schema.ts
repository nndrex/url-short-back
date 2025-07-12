import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const refreshTokens = pgTable("refresh_tokens", {
    id:serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    token:text("token").notNull().unique(),
    revoked: boolean("revoked").default(false).notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const refreshTokenRelations = relations(refreshTokens, ({ one }) => ({
    user: one(users,{
        fields: [refreshTokens.userId],
        references: [users.id]
    })
}));