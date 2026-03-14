@echo off
REM Setup script for KUCCPS Career Hub (Windows)
REM Run this script to automatically set up the development environment

echo.
echo ==========================================
echo KUCCPS Career Hub - Development Setup
echo ==========================================
echo.

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python 3.8+
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do echo Python version: %%i

REM Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install Node.js 14+
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo Node.js version: %%i

REM Check PostgreSQL
echo Checking PostgreSQL installation...
psql --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: PostgreSQL not found. Please install PostgreSQL 12+
    exit /b 1
)
for /f "tokens=*" %%i in ('psql --version') do echo PostgreSQL version: %%i

echo.

REM Setup Backend
echo Setting up Backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt

if not exist .env (
    copy .env.example .env
    echo Created .env file - please update with your configuration
)
cd ..

echo.

REM Setup Frontend
echo Setting up Frontend...
cd frontend
call npm install

if not exist .env (
    copy .env.example .env
    echo Created .env file - please update with your configuration
)
cd ..

echo.

REM Setup Database
echo Setting up Database...
psql -U postgres -c "CREATE DATABASE kuccps_career_hub;" 2>nul || (
    echo Note: Database might already exist
)
psql -U postgres -d kuccps_career_hub -f database\schema.sql
psql -U postgres -d kuccps_career_hub -f database\seed_data.sql
echo Database initialized with schema and seed data

echo.
echo ==========================================
echo Setup Complete!
echo ==========================================
echo.
echo Next steps:
echo 1. Update .env files with your configuration
echo 2. Start backend: cd backend ^&^& venv\Scripts\activate ^&^& python app.py
echo 3. Start frontend: cd frontend ^&^& npm start
echo 4. Visit http://localhost:3000
echo.

pause
