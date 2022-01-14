#!/usr/bin/env sh

# abort if no git commit message argument
if [ $# -eq 0 ]; then
    echo "no git commit message provided"
    exit 1
fi

# abort on errors
set -e

# stage changes, commit, and push
git status
git add .
git commit -m " $1 "
git push

# success!
echo "process complete!"
read -n 1