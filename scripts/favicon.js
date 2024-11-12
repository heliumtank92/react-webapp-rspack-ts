const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

;(async () => {
  const dir = __dirname
  const favicon = path.resolve(dir, '../public/static/icons/favicon.svg')
  const faviconBuffer = fs.readFileSync(favicon)

  await sharp(faviconBuffer)
    .resize(32, 32)
    .toFile(
      path.resolve(dir, '../dist/static/icons/favicon.ico'),
      (err, info) => {}
    )

  await sharp(faviconBuffer)
    .resize(192, 192)
    .toFile(
      path.resolve(dir, '../dist/static/icons/favicon-192.png'),
      (err, info) => {}
    )

  await sharp(faviconBuffer)
    .resize(512, 512)
    .toFile(
      path.resolve(dir, '../dist/static/icons/favicon-512.png'),
      (err, info) => {}
    )
})()
