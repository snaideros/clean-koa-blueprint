import Router from '@koa/router';
import { createHttpHandler } from '@shared/io/createHttpHandler.js';
import { PingController } from './adapters/http-controllers/PingController.js';

const router = new Router({ prefix: '/ping' });

// Utilisation du handler
router.post('/', createHttpHandler(PingController));

export const pingRouter = router;