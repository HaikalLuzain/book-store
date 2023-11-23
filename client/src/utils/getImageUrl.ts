import { MediaImageData } from '@book-store/server/types'

export const getImageUrl = (
  src: MediaImageData,
  width = 1080,
  height = null
) => {
  if (!src) {
    return ''
  }

  const { _id, image } = src

  const storagePath = 'src/storage/media'

  if (_id) {
    // Uploaded image
    return `${storagePath}/${image}?w=${width}${
      height !== null ? '&h=' + height : ''
    }`
  }
  // Unsplash Image
  return `${image}?w=${width}${height !== null ? '&h=' + height : ''}`
}
