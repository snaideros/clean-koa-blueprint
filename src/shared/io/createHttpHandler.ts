import { Context } from 'koa';
import { Result } from '../Result.js';

export type HttpRequest = {
  body: any;
  query: any;
  params: any;
  headers: any;
  user?: any;
};

/**
 * Higher-Order Function to decouple Koa from controllers 
 */
export const createHttpHandler = (controller: (req: HttpRequest) => Promise<Result<any>>) => {
  return async (ctx: Context) => {
    // 1. Normalization: Map Koa context to a neutral HttpRequest object
    const httpRequest: HttpRequest = {
      body: ctx.request.body,
      query: ctx.query,
      params: (ctx as any).params,
      headers: ctx.headers,
      user: ctx.state.user
    };

    // 2. Call the framework-agnostic controller
    const result = await controller(httpRequest);

    // 3. Response mapping: Map Result success/failure to HTTP status codes
    if (result.success) {
      ctx.status = 200;
      ctx.body = result.data;
    } else {
      const { error } = result;
      // Map business error codes to HTTP status
      ctx.status = error.code === 'NOT_FOUND' ? 404 : 400;
      ctx.body = {
        error: error.code,
        message: error.message
      };
    }
  };
};