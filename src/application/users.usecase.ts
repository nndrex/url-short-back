import { User } from "@domain/entities/user.entity";
import UserRepository from "@infrastructure/repositories/user.repositories";
import { CreateUserDTO } from "@interfaces/dto/users.dto";
import bcrypt from "bcrypt";

export default class UsersUseCase {
    constructor(private userRepository:UserRepository) {
        this.userRepository = userRepository;
        // Initialization logic can go here if needed.
    }

    async getByEmail(email: string) {
        console.log(`Fetching user by email: ${email}`);
        return await this.userRepository.findByEmail(email);
    }

    async create(createUser: CreateUserDTO): Promise<User> {
        console.log(`Creating user with email: ${createUser.email}`);
        createUser.password = await this.hashPassword(createUser.password);
        return await this.userRepository.create(createUser);
    }

    async getById(id: string) {
        console.log(`Fetching user by ID: ${id}`);
        return await this.userRepository.findById(id);
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }
}