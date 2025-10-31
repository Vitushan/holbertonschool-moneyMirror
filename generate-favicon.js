const sharp = require('sharp');
const fs = require('fs');

async function generateFavicon() {
  try {
    // Lire le SVG
    const svgBuffer = fs.readFileSync('./public/icon.svg');

    // Générer un PNG 32x32 d'abord (ICO format)
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile('./public/favicon-32.png');

    console.log('✅ favicon-32.png généré avec succès');

    // Générer aussi un 16x16
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile('./public/favicon-16.png');

    console.log('✅ favicon-16.png généré avec succès');

    // Générer un 512x512 pour Apple touch icon
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile('./public/apple-touch-icon.png');

    console.log('✅ apple-touch-icon.png généré avec succès');

    // Renommer favicon-32.png en favicon.ico
    fs.copyFileSync('./public/favicon-32.png', './public/favicon.ico');
    console.log('✅ favicon.ico créé avec succès');

    console.log('\n✨ Tous les favicons ont été générés !');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

generateFavicon();
