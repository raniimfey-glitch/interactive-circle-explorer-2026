import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateIcons() {
  const svgPath = path.resolve('public/icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const targets = [
    { name: 'icon-512.png', size: 512 },
    { name: 'icon-192.png', size: 192 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon.png', size: 64 }
  ];

  for (const target of targets) {
    const outputPath = path.resolve('public', target.name);
    await sharp(svgBuffer)
      .resize(target.size, target.size)
      .png({ compressionLevel: 9 })
      .toFile(outputPath);
    console.log(`Generated ${target.name} (${target.size}x${target.size})`);
  }
}

generateIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
