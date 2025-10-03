#!/bin/bash

# Developer ID Application Setup Script
# This script helps you set up Developer ID Application for your Medexer app

echo "🔐 Developer ID Application Setup for Medexer"
echo "=============================================="

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This script is for macOS only"
    exit 1
fi

# Check if Xcode command line tools are installed
if ! command -v xcrun &> /dev/null; then
    echo "❌ Xcode command line tools not found. Please install them first:"
    echo "   xcode-select --install"
    exit 1
fi

echo "✅ Xcode command line tools found"

# Check for existing Developer ID certificates
echo ""
echo "🔍 Checking for existing Developer ID Application certificates..."
CERTIFICATES=$(security find-identity -v -p codesigning | grep "Developer ID Application")

if [ -z "$CERTIFICATES" ]; then
    echo "❌ No Developer ID Application certificate found"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://developer.apple.com/account/"
    echo "2. Navigate to Certificates, Identifiers & Profiles"
    echo "3. Create a new 'Developer ID Application' certificate"
    echo "4. Download and install it in your Keychain"
    echo "5. Run this script again"
else
    echo "✅ Found Developer ID Application certificate(s):"
    echo "$CERTIFICATES"
fi

# Check for Team ID
echo ""
echo "🔍 Checking for Team ID configuration..."

if grep -q "YOUR_TEAM_ID" electron-builder.json5; then
    echo "⚠️  Team ID not configured in electron-builder.json5"
    echo ""
    echo "📋 To get your Team ID:"
    echo "1. Go to https://developer.apple.com/account/"
    echo "2. Look for 'Team ID' in the top right corner"
    echo "3. Update electron-builder.json5 with your Team ID"
else
    echo "✅ Team ID appears to be configured"
fi

# Check for environment variables
echo ""
echo "🔍 Checking for environment variables..."

if [ -f ".env" ]; then
    echo "✅ .env file found"
    if grep -q "CSC_LINK" .env; then
        echo "✅ CSC_LINK configured"
    else
        echo "⚠️  CSC_LINK not found in .env"
    fi
    
    if grep -q "CSC_KEY_PASSWORD" .env; then
        echo "✅ CSC_KEY_PASSWORD configured"
    else
        echo "⚠️  CSC_KEY_PASSWORD not found in .env"
    fi
else
    echo "⚠️  .env file not found"
    echo ""
    echo "📋 Create a .env file with:"
    echo "CSC_LINK=path/to/your/DeveloperIDApplication.p12"
    echo "CSC_KEY_PASSWORD=your_certificate_password"
    echo "APPLE_ID=your_apple_id@example.com"
    echo "APPLE_ID_PASSWORD=your_app_specific_password"
    echo "APPLE_TEAM_ID=your_team_id"
fi

# Check entitlements files
echo ""
echo "🔍 Checking entitlements files..."

if [ -f "build/entitlements.mac.plist" ]; then
    echo "✅ build/entitlements.mac.plist found"
else
    echo "❌ build/entitlements.mac.plist not found"
fi

if [ -f "build/entitlements.mac.inherit.plist" ]; then
    echo "✅ build/entitlements.mac.inherit.plist found"
else
    echo "❌ build/entitlements.mac.inherit.plist not found"
fi

echo ""
echo "🚀 Ready to build!"
echo ""
echo "Build commands:"
echo "  npm run build-mac-dev     # Development build (no notarization)"
echo "  npm run build-mac         # Production build (with notarization)"
echo ""
echo "For detailed instructions, see DEVELOPER_ID_SETUP.md"
