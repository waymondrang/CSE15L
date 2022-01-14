#!/usr/bin/env sh

# abort if no git commit message argument
if [ $# -eq 0 ]; then
    echo "no git commit message provided"
    exit 1
fi

# abort on errors
set -e

# build
npm run docs:src

# navigate into the build output directory
cd src/.vuepress/dist

# initialize directory, stage and commit changes
git init
git add *
git commit -m " $1 "

# push to github pages branch of repository
git push -f https://github.com/waymondrang/CSE15L.git main:gh-pages

# return to original working directory
cd -

# success!
echo "process complete!"
read -n 1