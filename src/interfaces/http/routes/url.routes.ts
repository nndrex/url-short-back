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
    

}
