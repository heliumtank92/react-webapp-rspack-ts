const HOME_IMAGE = [
  {
    src: new URL('~/src/AssetFiles/home.png?as=avif', import.meta.url).href,
    alt: 'Home Image',
    as: 'image/avif'
  },
  {
    src: new URL('~/src/AssetFiles/home.png?as=webp', import.meta.url).href,
    alt: 'Home Image',
    as: 'image/webp'
  },
  {
    src: new URL('~/src/AssetFiles/home.png', import.meta.url).href,
    alt: 'Home Image',
    as: 'image/png'
  }
]

export default HOME_IMAGE
