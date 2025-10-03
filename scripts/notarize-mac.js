// scripts/notarize-mac.js
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

(async () => {
  const { notarize } = await import('@electron/notarize');

  const APPLE_ID = process.env.APPLE_ID;
  const APPLE_APP_SPECIFIC_PASSWORD = process.env.APPLE_APP_SPECIFIC_PASSWORD;
  const APPLE_TEAM_ID = process.env.APPLE_TEAM_ID || 'C2YPAB4FS4';

  if (!APPLE_ID || !APPLE_APP_SPECIFIC_PASSWORD || !APPLE_TEAM_ID) {
    console.warn('[notarize] Missing APPLE_ID / APPLE_APP_SPECIFIC_PASSWORD / APPLE_TEAM_ID. Skipping.');
    process.exit(0);
  }

  const releaseDir = path.join(process.cwd(), 'release');
  const findApp = (dir) => {
    const entries = fs.readdirSync(dir);
    for (const e of entries) {
      const full = path.join(dir, e);
      if (e.endsWith('.app')) return full;
      if (fs.statSync(full).isDirectory()) {
        // Check for nested Medexer.app
        const nested = path.join(full, 'Medexer.app');
        if (fs.existsSync(nested)) return nested;

        // Recursively search subdirectories (for release/1.0.0/mac/ structure)
        const found = findApp(full);
        if (found) return found;
      }
    }
    return null;
  };

  const appPath = findApp(releaseDir);
  if (!appPath) throw new Error('Could not find .app in release/ directory tree');

  console.log('[notarize] Submitting with notarytool:', appPath);

  await notarize({
    tool: 'notarytool',
    appBundleId: 'com.medexer.desktop',
    appPath,
    appleId: APPLE_ID,
    appleIdPassword: APPLE_APP_SPECIFIC_PASSWORD,
    teamId: APPLE_TEAM_ID,
    verbose: true
  });

  console.log('[notarize] Notarization request succeeded, stapling...');
  execFileSync('xcrun', ['stapler', 'staple', appPath], { stdio: 'inherit' });

  // Staple any DMG/ZIP artifacts
  const artifacts = fs.readdirSync(releaseDir).filter(f => f.endsWith('.dmg') || f.endsWith('.zip'));
  for (const artifact of artifacts) {
    const artifactPath = path.join(releaseDir, artifact);
    console.log('[notarize] Stapling artifact:', artifactPath);
    execFileSync('xcrun', ['stapler', 'staple', artifactPath], { stdio: 'inherit' });
  }

  console.log('[notarize] All stapling complete. Validating app...');
  execFileSync('spctl', ['--assess', '--type', 'execute', '-v', appPath], { stdio: 'inherit' });
})();

