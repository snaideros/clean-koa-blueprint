import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Router from '@koa/router';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Scanne src/ pour trouver tous les router.ts dans les dossiers de ressources
 */
export const loadResources = async (rootRouter: Router) => {
  // Chemin vers le dossier src (on remonte depuis shared/io)
  const srcPath = path.resolve(__dirname, '../../');
  
  const folders = fs.readdirSync(srcPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name !== 'shared')
    .map(dirent => dirent.name);

  for (const folder of folders) {
    const routerPath = path.join(srcPath, folder, 'router.ts');
    const routerJsPath = path.join(srcPath, folder, 'router.js'); // Pour la prod

    if (fs.existsSync(routerPath) || fs.existsSync(routerJsPath)) {
      // Import dynamique du router
      const module = await import(`../../${folder}/router.js`);
      
      // On cherche un export nommé 'router' ou l'export par défaut
      const resourceRouter = module.router || module.default || module[`${folder}Router`];

      if (resourceRouter && typeof resourceRouter.routes === 'function') {
        rootRouter.use(resourceRouter.routes(), resourceRouter.allowedMethods());
        console.log(`✅ Ressource chargée : /${folder}`);
      }
    }
  }
};