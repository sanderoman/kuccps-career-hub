# KUCCPS Career Hub - GitHub Push Script (PowerShell)

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "KUCCPS Career Hub - GitHub Setup & Push" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
$gitCheck = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCheck) {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please download and install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installation, close and reopen PowerShell, then run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[1/6] Git installation verified... OK" -ForegroundColor Green
Write-Host ""

# Navigate to project root
Set-Location c:\kuccps
Write-Host "[2/6] Initializing git repository..."
git init
if ($LASTEXITCODE -eq 0) {
    Write-Host "      Repository initialized" -ForegroundColor Green
} else {
    Write-Host "      WARNING: Repository may already exist" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[3/6] Adding all files to staging..."
git add .
Write-Host "      Files staged" -ForegroundColor Green

Write-Host ""
Write-Host "[4/6] Creating initial commit..."
git commit -m "KUCCPS Career Hub - Final Updates with 2024 Cutoff Data, Search Bar, Chatbot, and University Highlights"
Write-Host "      Commit created" -ForegroundColor Green

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "[5/6] Remote Repository Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To complete the push, you need to:" -ForegroundColor Yellow
Write-Host "  1. Go to https://github.com/new" -ForegroundColor Cyan
Write-Host "  2. Create a new repository (name: 'kuccps-career-hub')" -ForegroundColor Cyan
Write-Host "  3. Copy the repository URL" -ForegroundColor Cyan
Write-Host ""

$githubUrl = Read-Host "Enter your GitHub repository URL"

if ([string]::IsNullOrWhiteSpace($githubUrl)) {
    Write-Host "ERROR: No URL provided" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "[6/6] Pushing to GitHub..." -ForegroundColor Cyan
git remote add origin $githubUrl
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Green
    Write-Host "SUCCESS! Repository pushed to GitHub" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your code is now available at:" -ForegroundColor Yellow
    Write-Host $githubUrl -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "ERROR: Push failed. Check your credentials and URL." -ForegroundColor Red
    Write-Host ""
}

Read-Host "Press Enter to exit"
