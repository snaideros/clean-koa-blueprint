import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import { loadResources } from './shared/io/loadResources.js';

const app = new Koa();
const rootRouter = new Router();

/**
 * 1. Middlewares de base
 */
app.use(bodyParser());

/**
 * 2. Gestionnaire d'erreurs global (Sécurité ultime)
 * Si un Result pattern n'a pas été respecté et qu'une erreur "throw",
 * on évite le crash du serveur et on renvoie un format propre.
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      error: 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Une erreur imprévue est survenue.'
    };
  }
});

/**
 * 3. Assemblage des ressources (Vertical Slices)
 */
await loadResources(rootRouter);

app.use(rootRouter.routes());
app.use(rootRouter.allowedMethods());

/**
 * 4. Lancement du serveur
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

export default app;