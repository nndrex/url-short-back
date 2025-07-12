// src/config/awilix.ts
import { fastifyAwilixPlugin  } from '@fastify/awilix';
import { InjectionMode } from 'awilix';
import { FastifyInstance } from 'fastify';
import { container } from '../container';

export async function registerDI(app: FastifyInstance) {
  app.register(fastifyAwilixPlugin,{
    disposeOnClose: true,
    strictBooleanEnforced:false,
    container
  } );
}
