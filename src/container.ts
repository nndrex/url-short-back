import { diContainer } from '@fastify/awilix';
import {asClass, createContainer} from 'awilix'
import UrlRepository from '@infrastructure/repositories/url.repostiories';
import { UrlUseCase } from '@application/url.usecase';
import UserRepository from '@infrastructure/repositories/user.repositories';
import UsersUseCase from '@application/users.usecase';
export const container = createContainer();

container.register({
    urlRepository : asClass(UrlRepository).singleton().classic(),
    urlUseCase: asClass(UrlUseCase).scoped().classic(),
    userRepository: asClass(UserRepository).singleton().classic(),
    usersUseCase: asClass(UsersUseCase).scoped().classic(),
}); 