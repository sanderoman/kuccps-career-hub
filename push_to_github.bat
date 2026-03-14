@echo off
REM KUCCPS Career Hub - GitHub Push Script for Windows

echo.
echo ============================================
echo KUCCPS Career Hub - GitHub Setup & Push
echo ============================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed or not in PATH
    echo.
    echo Please download and install Git from: https://git-scm.com/download/win
    echo After installation, restart your terminal and run this script again.
    pause
    exit /b 1
)

echo [1/6] Checking git installation... OK
echo.

REM Initialize git repository
cd /d c:\kuccps
echo [2/6] Initializing git repository...
git init
if %ERRORLEVEL% NEQ 0 (
    echo WARNING: Repository may already be initialized
)

echo.
echo [3/6] Adding all files to staging...
git add .

echo.
echo [4/6] Creating initial commit...
git commit -m "KUCCPS Career Hub - Final Updates with 2024 Cutoff Data, Search Bar, Chatbot, and University Highlights"

echo.
echo ============================================
echo [5/6] Remote Repository Setup
echo ============================================
echo.
echo You need to:
echo 1. Create a new repository on GitHub.com
echo 2. Get the repository URL (e.g., https://github.com/USERNAME/kuccps-career-hub.git)
echo.
set /p GITHUB_URL="Enter your GitHub repository URL: "

if "%GITHUB_URL%"=="" (
    echo ERROR: No URL provided
    pause
    exit /b 1
)

echo.
echo [6/6] Pushing to GitHub...
git remote add origin %GITHUB_URL%
git branch -M main
git push -u origin main

echo.
echo ============================================
echo SUCCESS! Repository pushed to GitHub
echo ============================================
echo.
echo Your code is now available at:
echo %GITHUB_URL%
echo.
pause
