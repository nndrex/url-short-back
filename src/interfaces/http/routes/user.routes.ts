import { UrlUseCase } from "@application/url.usecase";
import UsersUseCase from "@application/users.usecase";
import { CreateUserDTO, CreateUserResponseDTO } from "@interfaces/dto/users.dto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";


export async function userRoutes(app: FastifyInstance) {
    app.get('/:userId/urls', async (req:FastifyRequest, res:FastifyReply) => {
        const urlUseCase: UrlUseCase = app.diContainer.resolve('urlUseCase');
        const {userId} = req.params as {userId: number};
        const urls = await urlUseCase.getByUserId(userId);
        res.code(200).send({urls});
    });

    app.post('/',async (req:FastifyRequest<{Body: CreateUserDTO}>, res:FastifyReply) => {
        const usersUseCase: UsersUseCase = app.diContainer.resolve('usersUseCase');
        const newUser = await usersUseCase.create(req.body);
        const newUserResponse: CreateUserResponseDTO = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            isActive: newUser.isActive
        };
        // Remove password from response for security
        res.code(201).send({newUserResponse});
    })

}   
