# Developer ID Application Setup Guide

This guide explains how to configure and use Developer ID Application for distributing your Medexer app outside the Mac App Store.

## What is Developer ID Application?

Developer ID Application is Apple's code signing certificate that allows you to distribute macOS apps outside the Mac App Store while maintaining security and user trust. Apps signed with Developer ID can be distributed directly from your website or other distribution channels.

## Prerequisites

1. **Apple Developer Account**: Active Apple Developer Program membership ($99/year)
2. **Developer ID Application Certificate**: Download from Apple Developer Portal
3. **App-Specific Password**: For notarization (if you want to notarize your app)

## Step 1: Get Your Developer ID Application Certificate

### 1.1 Access Apple Developer Portal

1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Sign in with your Apple ID
3. Navigate to **Certificates, Identifiers & Profiles**

### 1.2 Create Developer ID Application Certificate

1. Click **Certificates** → **+** (Create a Certificate)
2. Select **Developer ID Application** under **Software**
3. Follow the instructions to create a Certificate Signing Request (CSR):
   - Open **Keychain Access** on your Mac
   - Go to **Keychain Access** → **Certificate Assistant** → **Request a Certificate From a Certificate Authority**
   - Fill in your email and name
   - Select **Saved to disk**
   - Save the `.certSigningRequest` file
4. Upload the CSR file in the Apple Developer Portal
5. Download the certificate (`.cer` file)
6. Double-click the certificate to install it in your Keychain

### 1.3 Export Certificate for CI/CD (Optional)

If you plan to use this in CI/CD or on other machines:

1. Open **Keychain Access**
2. Find your **Developer ID Application** certificate
3. Right-click → **Export**
4. Choose **Personal Information Exchange (.p12)** format
5. Set a password and save the file
6. Keep this file secure - it contains your private key

## Step 2: Configure Your Project

### 2.1 Update Team ID

In `electron-builder.json5`, replace `YOUR_TEAM_ID` with your actual Team ID:

```json5
notarize: {
  teamId: 'YOUR_ACTUAL_TEAM_ID'  // Get this from Apple Developer Portal
}
```

### 2.2 Set Environment Variables

Create a `.env` file in your project root (add to `.gitignore`):

```bash
# Code Signing
CSC_LINK=path/to/your/DeveloperIDApplication.p12
CSC_KEY_PASSWORD=your_certificate_password

# Notarization (Optional)
APPLE_ID=your_apple_id@example.com
APPLE_ID_PASSWORD=your_app_specific_password
APPLE_TEAM_ID=your_team_id
```

### 2.3 App-Specific Password (For Notarization)

If you want to notarize your app:

1. Go to [Apple ID Account Page](https://appleid.apple.com/)
2. Sign in with your Apple ID
3. Go to **Security** section
4. Click **Generate Password** under **App-Specific Passwords**
5. Label it "Electron Builder Notarization"
6. Copy the generated password

## Step 3: Build and Sign Your App

### 3.1 Development Build (No Notarization)

```bash
npm run build-mac-dev
```

This creates a signed but not notarized version for testing.

### 3.2 Production Build (With Notarization)

```bash
npm run build-mac-notarize
```

This creates a signed and notarized version ready for distribution.

### 3.3 Manual Notarization (If Needed)

If automatic notarization fails, you can manually notarize:

```bash
# Build first
npm run build-mac-dev

# Notarize manually
xcrun notarytool submit "path/to/your/app.zip" \
  --apple-id "your_apple_id" \
  --password "your_app_specific_password" \
  --team-id "your_team_id" \
  --wait

# Staple the notarization
xcrun stapler staple "path/to/your/app.dmg"
```

## Step 4: Verify Your App

### 4.1 Check Code Signing

```bash
codesign -dv --verbose=4 "path/to/your/app.app"
```

### 4.2 Verify Notarization

```bash
spctl -a -v "path/to/your/app.app"
```

### 4.3 Check Gatekeeper

```bash
spctl -a -t exec -vv "path/to/your/app.app"
```

## Step 5: Distribution

### 5.1 Direct Distribution

- Upload your `.dmg` file to your website
- Users can download and install directly
- macOS will show a security warning on first run (normal for non-App Store apps)

### 5.2 Alternative Distribution

- **GitHub Releases**: Upload DMG as a release asset
- **S3/Cloud Storage**: Host DMG files on cloud storage
- **Direct Download**: Provide direct download links

## Troubleshooting

### Common Issues

1. **"No identity found"**: Certificate not installed in Keychain
2. **"Invalid signature"**: Wrong certificate or expired
3. **"Notarization failed"**: Check Apple ID credentials and Team ID
4. **"Gatekeeper rejection"**: App not properly notarized

### Debug Commands

```bash
# Check installed certificates
security find-identity -v -p codesigning

# Check specific certificate
security find-certificate -c "Developer ID Application: Your Name"

# Verify app signature
codesign --verify --deep --strict "path/to/your/app.app"

# Check notarization status
xcrun notarytool history --apple-id "your_apple_id" --password "your_password" --team-id "your_team_id"
```

## Security Best Practices

1. **Keep certificates secure**: Never commit `.p12` files to version control
2. **Use environment variables**: Store sensitive data in environment variables
3. **Rotate certificates**: Renew certificates before they expire
4. **Monitor notarization**: Check notarization status regularly

## App Identifier

Your app is configured with the identifier: `com.medexer.desktop`

This identifier should match:

- The certificate you're using
- Any provisioning profiles (if applicable)
- Your app's bundle identifier

## Next Steps

1. Get your Developer ID Application certificate
2. Update the Team ID in `electron-builder.json5`
3. Set up environment variables
4. Build and test your app
5. Distribute through your preferred channels

For more information, refer to:

- [Apple Code Signing Guide](https://developer.apple.com/library/archive/documentation/Security/Conceptual/CodeSigningGuide/)
- [Notarization Guide](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution)
