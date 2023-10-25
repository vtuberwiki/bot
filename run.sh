#!/bin/bash

while true; do
    # Perform a git fetch to check for updates without modifying your working tree.
    git fetch

    # Check if the local branch is behind the remote branch.
    if [ $(git rev-list HEAD...origin/$(git rev-parse --abbrev-ref HEAD) --count) -gt 0 ]; then
        # If it is behind, pull the latest changes.
        git pull
        # After pulling, run npm run build.
        npm run build
    fi

    # Sleep for 6 seconds before checking again.
    sleep 6
done
