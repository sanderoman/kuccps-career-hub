#!/bin/bash
# Setup script for KUCCPS Career Hub
# Run this script to automatically set up the development environment

set -e

echo "=========================================="
echo "KUCCPS Career Hub - Development Setup"
echo "=========================================="
echo ""

# Check Python
echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 not found. Please install Python 3.8+"
    exit 1
fi
echo "✓ Python version: $(python3 --version)"

# Check Node.js
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js not found. Please install Node.js 14+"
    exit 1
fi
echo "✓ Node.js version: $(node --version)"

# Check PostgreSQL
echo "Checking PostgreSQL installation..."
if ! command -v psql &> /dev/null; then
    echo "ERROR: PostgreSQL not found. Please install PostgreSQL 12+"
    exit 1
fi
echo "✓ PostgreSQL version: $(psql --version)"

echo ""

# Setup Backend
echo "Setting up Backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ Created .env file - please update with your configuration"
fi
cd ..

echo ""

# Setup Frontend
echo "Setting up Frontend..."
cd frontend
npm install

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✓ Created .env file - please update with your configuration"
fi
cd ..

echo ""

# Setup Database
echo "Setting up Database..."
createdb kuccps_career_hub 2>/dev/null || echo "Database might already exist"
psql kuccps_career_hub < database/schema.sql
psql kuccps_career_hub < database/seed_data.sql
echo "✓ Database initialized with schema and seed data"

echo ""
echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Update .env files with your configuration"
echo "2. Start backend: cd backend && source venv/bin/activate && python app.py"
echo "3. Start frontend: cd frontend && npm start"
echo "4. Visit http://localhost:3000"
echo ""
