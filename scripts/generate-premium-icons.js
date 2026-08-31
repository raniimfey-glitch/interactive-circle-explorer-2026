import sharp from 'sharp';
import path from 'path';

async function generateAppIcons() {
  const inputPath = path.resolve('src/assets/images/circle_premium_icon_1788168079724.jpg');

  const targets = [
    { name: 'icon-512.png', size: 512 },
    { name: 'icon-192.png', size: 192 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon.png', size: 64 }
  ];

  for (const target of targets) {
    const outputPath = path.resolve('public', target.name);
    await sharp(inputPath)
      .resize(target.size, target.size, {
        fit: 'cover',
        position: 'center'
      })
      .png({ compressionLevel: 9 })
      .toFile(outputPath);
    console.log(`Generated /public/${target.name} (${target.size}x${target.size})`);
  }
}

generateAppIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
