import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import { loadResources } from '@shared/io/loadResources.js';

const app = new Koa();
// Initialize root router with /api prefix for better API versioning/routing
const rootRouter = new Router({ prefix: '/api' });

/**
 * 1. Base Middlewares
 */
app.use(bodyParser());

/**
 * 2. Global Error Handler (Safety Net)
 * Even if the Result pattern is bypassed by a 'throw', 
 * this prevents server crashes and returns a clean error format.
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred.'
    };
  }
});

/**
 * 3. Resource Assembly (Vertical Slices)
 * Uses top-level await to ensure all resources are loaded before starting
 */
await loadResources(rootRouter);

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

/**
 * 4. Server Initialization
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server active on http://localhost:${PORT}`);
});

export default app;