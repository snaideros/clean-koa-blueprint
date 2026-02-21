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
 * Higher-Order Function pour Koa
 */
export const createHttpHandler = (controller: (req: HttpRequest) => Promise<Result<any>>) => {
  return async (ctx: Context) => {
    // 1. Normalisation (Koa utilise ctx.request.body et ctx.params via koa-router)
    const httpRequest: HttpRequest = {
      body: ctx.request.body,
      query: ctx.query,
      params: (ctx as any).params, // Dépend de ton router
      headers: ctx.headers,
      user: ctx.state.user // Convention Koa pour les données d'auth
    };

    // 2. Appel du contrôleur agnostique
    const result = await controller(httpRequest);

    // 3. Réponse
    if (result.success) {
      ctx.status = 200;
      ctx.body = result.data;
    } else {
      // Mapping des erreurs métier -> HTTP
      ctx.status = result.error.code === 'NOT_FOUND' ? 404 : 400;
      ctx.body = {
        error: result.error.code,
        message: result.error.message
      };
    }
  };
};