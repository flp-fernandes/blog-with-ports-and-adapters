import {
  type Request,
  type Response,
  type Router,
  type NextFunction
} from 'express';
import { type Container } from './core';

/* HTTP Interface */
export type HttpRouter = Router
export type HttpRequest = Request
export type HttpResponse = Response
export type HttpNext = NextFunction

export interface IHttpRoute {
  register: (r: HttpRouter) => void
}

export interface IHttpInterface {
  serve: () => void
}

export interface HttpControllerConfig {
  validator: typeof import('../interface/http/middleware/validator').validator
  coreContainer: Container
}
