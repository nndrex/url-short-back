import AuthUseCase from "@application/auth.usecase";
import { loginDto } from "@interfaces/dto/auth.dto";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function authRoutes(app: FastifyInstance) {
    const authUseCase: AuthUseCase = app.diContainer.resolve('authUseCase');
    app.post('/login', async (req: FastifyRequest<{ Body: loginDto }>, res: FastifyReply) => {
        try {
            await verifyAlreadyLoggedIn(req, res);
            const result = await authUseCase.login(req.body.email, req.body.password);
            if (!result) {
                throw new Error('Invalid credentials');
            }
            const oneDayFromNow = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day expiration
            const refreshtoken = await authUseCase.createRefreshToken(result.id, oneDayFromNow);
            const token = app.jwt.sign(
                { userId: result.id, email: result.email },
                { expiresIn: 1000 * 60 * 5 } // 5 minutes expiration
            )
            setCookies(res, refreshtoken, token, oneDayFromNow);
            return res.code(200).send('login successful');
        } catch (error) {
            return res.code(401).send(error);
        }
    });

    app.post('/logout',{onRequest:[app.authenticate]},  async (req: FastifyRequest, res: FastifyReply) => {

        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.code(400).send('No refresh token provided');
        }
        await authUseCase.revokeRefreshToken(refreshToken);
         res.clearCookie('token', {
            domain: 'localhost',
         });
        const refreshTokenPaths = ['/api/auth/refresh', '/api/auth/logout'];
        refreshTokenPaths.forEach(path => {
            res.clearCookie('refreshToken', {
                domain: 'localhost',
                path: path,
            });
        })
        res.code(200).send('logout successful');
    })

    //TODO: Maybe move to another file like controller
    // of course that implies i need to move the other routes to controllers
    function setCookies(res: FastifyReply, refreshtoken: string, token: string, expiration: Date) {

        res.setCookie('token', token,
            {
                domain: 'localhost',
                path: '/',
                maxAge: 1000 * 60 * 5, // 5 minutes     
                expires: new Date(Date.now() + 1000 * 60 * 5), // 5 minutes
            }
        )
        const refreshTokenPaths = ['/api/auth/refresh', '/api/auth/logout'];
        refreshTokenPaths.forEach(path => {
            res.setCookie('refreshToken', refreshtoken, {
                domain: 'localhost',
                path: path,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 day
                expires: expiration,
            });

        })
    }
    async function verifyAlreadyLoggedIn(req: FastifyRequest, res: FastifyReply) {
        try {
            await req.jwtVerify();
            return res.code(400).send('User already logged in');
        } catch (error) {
            console.error("JWT verification failed:", error);
        }
    }

}
