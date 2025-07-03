import { UrlUseCase } from "@application/url.usecase";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";


export async function userRoutes(app: FastifyInstance) {
    app.get('/:userId/urls', async (req:FastifyRequest, res:FastifyReply) => {
        const urlUseCase: UrlUseCase = app.diContainer.resolve('urlUseCase');
        const {userId} = req.params as {userId: number};
        const urls = await urlUseCase.getByUserId(userId);
        res.code(200).send({urls});
    });

    app.post('/',async (req:FastifyRequest, res:FastifyReply) => {
        const urlUseCase: UrlUseCase = app.diContainer.resolve('urlUseCase');
        const {domain, fullUrl, userId} = req.body as {domain: string, fullUrl: string, userId: number};
        const newUrl = await urlUseCase.create({domain, fullUrl, userId});
        res.code(201).send({newUrl});
    })
}   
