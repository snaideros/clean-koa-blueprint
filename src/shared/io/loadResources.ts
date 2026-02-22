import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Router from '@koa/router';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Scans src/ directory to find and load all resource routers automatically
 */
export const loadResources = async (rootRouter: Router) => {
  // Resolved to the src/ root directory
  const srcPath = path.resolve(__dirname, '../../');
  
  const folders = fs.readdirSync(srcPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'shared')
    .map(dirent => dirent.name);

  for (const folder of folders) {
    const routerPath = path.join(srcPath, folder, 'router.ts');
    const routerJsPath = path.join(srcPath, folder, 'router.js');

    if (fs.existsSync(routerPath) || fs.existsSync(routerJsPath)) {
      // Dynamic import using .js extension for ESM compatibility
      const module = await import(`../../${folder}/router.js`);
      
      const resourceRouter = module.router || module.default || module[`${folder}Router`];

      if (resourceRouter && typeof resourceRouter.routes === 'function') {
        rootRouter.use(resourceRouter.routes(), resourceRouter.allowedMethods());
        console.log(`✅ Resource loaded: /${folder}`);
      }
    }
  }
};