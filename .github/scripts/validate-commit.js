import { execSync } from 'child_process';

// On récupère le message de commit que l'agent/utilisateur est en train d'écrire
// (Note: Husky permet d'accéder à l'index Git)
const commitMessage = execSync('git log -1 --pretty=%B').toString().trim();

console.log(`🔍 Validation du commit : "${commitMessage}"`);

// Cas 1 : Phase RED (Le testeur commit un test qui échoue)
if (commitMessage.includes('RED phase') || commitMessage.startsWith('test')) {
  console.log('🧪 Phase RED détectée : On autorise le commit sans vérifier les tests (ou on vérifie juste la syntaxe).');
  process.exit(0);
}

// Cas 2 : Phase GREEN ou REFACTOR
// On lance les tests. S'ils échouent, process.exit(1) arrêtera le commit.
try {
  console.log('🚀 Lancement des tests de validation...');
  execSync('npm test', { stdio: 'inherit' });
  console.log('✅ Tests validés !');
} catch (error) {
  console.error('❌ Échec du commit : Les tests ne passent pas. Repasse en phase GREEN.');
  process.exit(1);
}