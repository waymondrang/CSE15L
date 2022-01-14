#!/usr/bin/env sh

# abort if no commit message argument
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

# deploy to firebase
firebase deploy

# return to original working directory
cd -

# stage changes, commit, and push
git status
git add .
git commit -m " $1 "
git push

# success!
echo "process complete!"
read -n 1