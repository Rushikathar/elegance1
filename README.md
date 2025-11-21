# Project: website

This is a small static website project located in the `website/` folder.

Contents:
- `website.html` — main HTML file
- `assets/` — CSS, JS and images

How to upload to GitHub (quick steps):

1. Initialize a git repo locally (run in PowerShell inside this folder):

   git init
   git add .
   git commit -m "Initial commit"

2a. Create a remote repository on GitHub via the website (https://github.com/new).
    - Name the repo (e.g. `website`) and set Public or Private.
    - Do NOT initialize with a README (we already have one).
    - Copy the remote URL (HTTPS or SSH).

   Then in PowerShell:

   git branch -M main
   git remote add origin <REMOTE_URL>
   git push -u origin main

2b. Or create and push using GitHub CLI (if installed and authenticated):

   gh repo create <your-username>/<repo-name> --public --source=. --remote=origin --push

If you want, I can run the local git commands for you or guide you through creating the remote repo.
