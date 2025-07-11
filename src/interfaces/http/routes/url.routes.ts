import { UrlUseCase } from "@application/url.usecase";
import { IGetUrlQuery } from "@interfaces/dto/url.dto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function urlRoutes(app: FastifyInstance) {
    app.get('/', async (req:FastifyRequest<{Querystring:IGetUrlQuery}>, res:FastifyReply) => {
        const urlUseCase: UrlUseCase = app.diContainer.resolve('urlUseCase');
        if(req.query.domain) {
        const {domain} = req.query;
        const urlByDomain =  await urlUseCase.getByDomain(domain);
        res.code(200).send({urlByDomain});
        }
        const allUrls = await urlUseCase.getAll();
        res.code(200).send({allUrls});
    });
    // app.post('/', async (req:FastifyRequest<{Body:postUrlBody}>, res:FastifyReply) => {
    //     const urlUseCase: UrlUseCase = app.diContainer.resolve('urlUseCase');
    //     const {domain, fullUrl, userId} = req.body;
    //     const newUrl = await urlUseCase.create({domain, fullUrl, userId});
    //     res.code(201).send({newUrl});
    // }
    // );

    

}
