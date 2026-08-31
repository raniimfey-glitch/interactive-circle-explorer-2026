import sharp from 'sharp';
import path from 'path';

async function processOgImage() {
  const inputPath = path.resolve('src/assets/images/og_image_circle_1788167917674.jpg');
  const outputPath = path.resolve('public/og-image.png');

  await sharp(inputPath)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center'
    })
    .png({ quality: 90 })
    .toFile(outputPath);

  console.log('Successfully created /public/og-image.png (1200x630)');
}

processOgImage().catch(err => {
  console.error('Error processing OG image:', err);
  process.exit(1);
});
