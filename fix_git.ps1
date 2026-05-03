# This script fixes the frontend submodule issue
Write-Host "Starting fix..." -ForegroundColor Cyan

# 1. Delete the .git folder in frontend
if (Test-Path "frontend\.git") {
    Write-Host "Removing frontend\.git..."
    Remove-Item -Recurse -Force "frontend\.git"
} else {
    Write-Host "frontend\.git already removed or not found."
}

# 2. Remove from git cache
Write-Host "Updating git index..."
git rm --cached frontend -f

# 3. Add back as regular folder
Write-Host "Adding frontend as regular folder..."
git add frontend
git add .

# 4. Commit and Push
Write-Host "Committing and Pushing..."
git commit -m "Fix: converted frontend to regular folder"
git push

Write-Host "Done! Check your GitHub now." -ForegroundColor Green
