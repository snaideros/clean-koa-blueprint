import { execSync } from 'child_process';

/**
 * Git Commit Validation Script
 * Purpose: Ensures that code quality gates are respected based on the TDD phase.
 */

try {
  // 1. Retrieve the latest commit message
  // Using 'git log' to inspect the message before final validation
  const commitMessage = execSync('git log -1 --pretty=%B').toString().trim();

  console.log(`🔍 Validating commit: "${commitMessage}"`);

  /**
   * CASE 1: RED PHASE (TDD Start)
   * We allow commits to fail tests if the message explicitly mentions "RED phase"
   * or starts with "test", as the production code isn't implemented yet.
   */
  if (
    commitMessage.toLowerCase().includes('red phase') || 
    commitMessage.toLowerCase().startsWith('test')
  ) {
    console.log('🧪 RED phase detected: Allowing commit without full test validation.');
    process.exit(0);
  }

  /**
   * CASE 2: GREEN or REFACTOR PHASE
   * For any other commit (feat, fix, refactor), tests MUST pass.
   * This enforces the "Zero tolerance" rule for broken code in main/dev branches.
   */
  try {
    console.log('🚀 Running mandatory test suite...');
    // Executes the native Node.js test runner defined in package.json
    execSync('npm test', { stdio: 'inherit' });
    console.log('✅ All tests passed. Commit authorized.');
  } catch (error) {
    console.error('❌ Commit rejected: Tests are failing.');
    console.error('💡 Ensure you are in GREEN phase before committing non-test changes.');
    process.exit(1);
  }

} catch (globalError) {
  console.error('⚠️ Validation script error:', globalError.message);
  process.exit(1);
}