import { db } from "@config/db.config";
import { User } from "@domain/entities/user.entity";
import { IUserRepository } from "@domain/repositories/user.repository";
import { users } from "@infrastructure/schema";

export default class UserRepository implements IUserRepository {
    findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
        return user[0] as User;
    }

    async create(user: User): Promise<User> {
        const insertedId = await db.insert(users).values({
            email: user.email,
            password: user.password,
            name: user.name
        }).returning();
        return insertedId[0] as User;
    }

    update(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}
