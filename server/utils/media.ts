import { ImageModel } from 'models/Image'
import path from 'path'
import sharp from 'sharp'
import { Image, ImageKind, User } from 'types'

export interface StoreMedia {
  files: string[]
  user: User
  kind?: ImageKind
}

export const resizeImage = async (filepath, name) => {
  const max = 1080
  try {
    // Getting metadata
    const { width, height, format } = await sharp(filepath).metadata()
    const img = await sharp(filepath)
    // Getting resize image
    if (height > max || width > max) {
      await img.resize(max)
      if (format === 'jpeg') {
        await img.jpeg({ quality: 100 })
      }
    }

    await img.toFile(path.resolve(process.env.UPLOAD_DIR, name))
    return name
  } catch (e) {
    throw new Error('error while process image')
  }
}

export const storeImageData = async ({ files, user, kind }: StoreMedia) => {
  const out = await ImageModel.create(
    files.map((file) => {
      return {
        ext: path.extname(file),
        used: false,
        kind: kind || 'BOOK',
        user,
      } as Image
    })
  )

  return out.map(({ ext, _id, used }) => ({ _id, image: _id + ext, used }))
}
