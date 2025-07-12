import { FastifyInstance, FastifyRequest , FastifyReply} from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import jwt from '@fastify/jwt';

export default fastifyPlugin(async (app: FastifyInstance) => {
    app.register(jwt,{
      secret: Bun.env.JWT_SECRET || 'secretjwtdefault', 
      cookie: {
        cookieName: 'token', // Name of the cookie to store the JWT 
        signed: false, // Set to true if you want to sign the cookie
      },
    })  
    
    app.decorate("authenticate", async function(request:FastifyRequest, reply:FastifyReply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})