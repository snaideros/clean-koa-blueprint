import Router from '@koa/router';
import { createHttpHandler } from '@shared/io/createHttpHandler.js';
import { PingController } from './adapters/http-controllers/PingController.js';

const router = new Router({ prefix: '/ping' });

/**
 * Route: POST /api/ping
 * Description: Orchestrates the SendPing use case
 */
router.post('/', createHttpHandler(PingController));

export const pingRouter = router;
export default router;