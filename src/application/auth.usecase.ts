import RefreshTokenRepository from "@infrastructure/repositories/refreshtoken.repositories";
import UsersUseCase from "./users.usecase";
import bcrypt from "bcrypt";
import { User } from "@domain/entities/user.entity";
import { randomBytes } from "node:crypto";
import { promisify } from "node:util";

export default class AuthUseCase {
    constructor(private refreshTokenRepository: RefreshTokenRepository, 
        private usersUseCase: UsersUseCase) {}

    async login(email:string, password:string) : Promise<User> {
        const validUser =  await this.usersUseCase.getByEmail(email);
        if (!validUser) {
            throw new Error("Invalid email or password");
        }
        const passwordMatch = await bcrypt.compare(password, validUser.password);
        if (!passwordMatch) {
            throw new Error("Invalid email or password");
        }

        console.log(`Logging in user with email: ${email}`);
        return validUser;
    }
    async createRefreshToken(userId: number, expiresAt: Date) {
        const randomBytesAsync = promisify(randomBytes);
        const refreshToken=  await randomBytesAsync(32).then(buffer => buffer.toString('hex'));
        console.log(`Creating refresh token for user ID: ${userId}`);        

        return this.refreshTokenRepository.createRefreshToken(userId, refreshToken, expiresAt);
    }

    async findRefreshToken(token: string) {
        return this.refreshTokenRepository.findByToken(token);
    }

    async revokeRefreshToken(token: string) {
        return this.refreshTokenRepository.revokeToken(token);
    }
}
