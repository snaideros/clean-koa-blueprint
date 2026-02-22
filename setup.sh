#!/bin/bash

# 1. Capture and normalize folder name
# - Convert to lowercase
# - Replace spaces, underscores, and dots with hyphens
# - Remove any characters that are not alphanumeric or hyphens
# - Trim leading/trailing hyphens
RAW_NAME=$(basename "$PWD")
PROJECT_NAME=$(echo "$RAW_NAME" | tr '[:upper:]' '[:lower:]' | tr ' _.' '-' | sed 's/[^a-z0-9-]//g' | sed 's/^-//;s/-$//')
NEW_VERSION="0.1.0"

echo "🚀 Initializing new project: $PROJECT_NAME..."

# 2. Update package.json (Name & Version)
# This replaces the template identity with the new project identity before installation
if [[ "$OSTYPE" == "darwin"* ]]; then
  # Syntax for macOS
  sed -i '' "s/\"name\": \".*\"/\"name\": \"$PROJECT_NAME\"/" package.json
  sed -i '' "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" package.json
else
  # Syntax for Linux
  sed -i "s/\"name\": \".*\"/\"name\": \"$PROJECT_NAME\"/" package.json
  sed -i "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" package.json
fi

# 3. Initialize new local Git repository
echo "📁 Setting up Git repository..."
git init
echo "✅ Git repository initialized."

# 4. Install dependencies
# This will generate the lockfile with the correct project name
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed successfully."

# 5. Configure Husky Hooks
# Note: Husky directories are often excluded from git archives, so we recreate them here
echo "🔧 Configuring Git hooks with Husky..."
npx husky

# Pre-commit hook: Validate code and tests before committing
cat <<EOF > .husky/pre-commit
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

node .github/scripts/validate-commit.js
EOF
chmod +x .husky/pre-commit

# Commit-msg hook: Ensure Conventional Commits compliance
cat <<EOF > .husky/commit-msg
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

npx --no -- commitlint --edit "\$1"
EOF
chmod +x .husky/commit-msg

echo "✅ Git Hooks installed successfully."

# 6. Cleanup
# Remove setup script and template README to start fresh
rm -f setup.sh
rm -f README.md

echo "✨ Done! Your software factory is ready."
echo "👉 Next step: Create your purpose.md at the root and call @architect."