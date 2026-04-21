#!/bin/bash

echo "🚀 Setting up OrderEase Micro Frontend..."

# Check if we're in the right directory
if [ ! -d "orderease" ]; then
    echo "❌ Error: Please run this script from the orderease directory"
    exit 1
fi

# Install dependencies for host app
echo "📦 Installing Host App dependencies..."
cd orderease/host
npm install @craco/craco react-router-dom @types/react-router-dom @module-federation/webpack

# Install dependencies for auth app
echo "📦 Installing Auth App dependencies..."
cd ../auth
npm install @craco/craco react-router-dom @types/react-router-dom @reduxjs/toolkit react-redux @module-federation/webpack

echo "✅ Setup complete!"
echo ""
echo "🎯 Next Steps:"
echo "1. Start Auth App: cd orderease/auth && npm start"
echo "2. Start Host App: cd orderease/host && npm start"
echo "3. Open http://localhost:3000 (Host App)"
echo "4. Open http://localhost:3001 (Auth App)"
echo ""
echo "📚 For detailed instructions, see: MICRO_FRONTEND_SETUP.md"
