const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const targetPath = path.join(distDir, '404.html');

try {
  if (!fs.existsSync(indexPath)) {
    console.error('dist/index.html not found; did build succeed?');
    process.exit(1);
  }
  fs.copyFileSync(indexPath, targetPath);
  console.log('Created dist/404.html');
} catch (err) {
  console.error('Failed to create 404.html:', err);
  process.exit(1);
}

