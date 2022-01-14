#!/usr/bin/env sh

if [ $# -eq 0 ]; then
    echo "no git commit message provided"
    echo "press any key to continue"
    read -n 1
    exit 1
fi

# abort on errors
set -e

# build
npm run docs:src

# navigate into the build output directory
cd src/.vuepress/

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

# git init
# git add *
# git commit -m "deploy"

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
firebase deploy

cd -

git status
git add .
git commit -m " $1 "
git push