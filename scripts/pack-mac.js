// scripts/pack-mac.js
const path = require('path');
const packager = require('electron-packager');

(async () => {
  const appBundleId = 'com.medexer.desktop';
  const iconPath = 'dist/logo.icns'; // put a real file here or remove this line

  const identityHash = process.env.CSC_IDENTITY_HASH || null;
  const identityName = process.env.CSC_NAME || null;
  const identity = identityHash || identityName;

  if (!identity) {
    throw new Error('No signing identity provided. Set CSC_IDENTITY_HASH or CSC_NAME.');
  }

  const opts = {
    dir: process.cwd(),
    out: path.join(process.cwd(), 'release'),
    overwrite: true,
    platform: 'darwin',
    // arch: ['arm64'],
    arch: ['arm64', 'x64'],

    appBundleId,
    appCategoryType: 'public.app-category.medical',
    icon: iconPath,

    osxSign: {
      identity,                  // <— name or hash
      hardenedRuntime: true,
      entitlements: 'build/entitlements.mac.plist',
      entitlementsInherit: 'build/entitlements.mac.inherit.plist',
      gatekeeperAssess: false
    }
  };

  console.log('[pack] Using identity:', identity);
  const out = await packager(opts);
  console.log('Packed:', out);
})();
