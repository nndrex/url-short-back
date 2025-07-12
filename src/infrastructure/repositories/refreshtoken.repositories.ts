import { db } from "@config/db.config";
import { refreshTokens } from "@infrastructure/schema";
import { eq } from "drizzle-orm";

export default class RefreshTokenRepository {
    
    async createRefreshToken(userId: number, token: string, expiresAt: Date): Promise<void> {
        try {
            await db.insert(refreshTokens).values({
                userId,
                token,
                expiresAt,
                revoked: false,
            });
        } catch (error) {
            console.error("Error creating refresh token:", error);
            throw new Error("Could not create refresh token");
        }
    }

    async findByToken(token: string) {
        return db.select().from(refreshTokens)
            .where(eq(refreshTokens.token, token))
            .limit(1)
    }

    async revokeToken(token: string) {
        return db.update(refreshTokens)
            .set({ revoked: true })
            .where(eq(refreshTokens.token, token))
    }
}