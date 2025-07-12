import AuthUseCase from "@application/auth.usecase";
import { loginDto } from "@interfaces/dto/auth.dto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function authRoutes(app: FastifyInstance) {
    app.post('/login', async (req:FastifyRequest<{Body: loginDto }>, res: FastifyReply) => {
        const authUseCase: AuthUseCase = app.diContainer.resolve('authUseCase');
        try {
            const result = await authUseCase.login(req.body.email, req.body.password);
            if (!result) {
                throw new Error('Invalid credentials');
            }
            const token = app.jwt.sign(
                { userId: result.id, email: result.email },
                { expiresIn: '1h' }
            ) 
            res.code(200).send({ token });
        } catch (error) {
            res.code(401).send(error);
        }
    });
}
