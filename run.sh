#!/bin/bash

while true; do
    # Perform a git fetch to check for updates without modifying your working tree.
    git fetch > /dev/null 2>&1

    # Check if the local branch is behind the remote branch.
    if [ $(git rev-list HEAD...origin/$(git rev-parse --abbrev-ref HEAD) --count) -gt 0 ]; then
        # If it is behind, pull the latest changes.
        git pull > /dev/null 2>&1
        # After pulling, run npm run build.
        npm run build > /dev/null 2>&1
        # If the build completes successfully, install dependencies and restart the bot.
        if [ $? -eq 0 ]; then
            npm install > /dev/null 2>&1
            pm2 restart "Vtuber Bot" > /dev/null 2>&1

    fi

    # Sleep for 6 seconds before checking again.
    sleep 6
done
