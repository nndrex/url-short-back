import Fastify from 'fastify';
import { urlRoutes } from '@interfaces/http/routes/url.routes'; 
import { userRoutes } from '@interfaces/http/routes/user.routes';
import {registerDI} from '@config/awilix.config';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });

await registerDI(app);

await app.register(cors, {
  origin: '*', // Allow all origins for simplicity, adjust as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
});
await app.register(urlRoutes, { prefix: '/api/urls' });
await app.register(userRoutes, { prefix: '/api/users' });


const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();