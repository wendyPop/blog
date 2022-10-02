#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'
git push -f https://github.com/wendyPop/blog.git master:gh-pages
cd -
