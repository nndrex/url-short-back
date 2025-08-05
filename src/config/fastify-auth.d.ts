import { FastifyRequest, FastifyReply } from "fastify";

//this file it's for intellisense and ts error
declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}