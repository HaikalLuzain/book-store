import express from 'express'
import formidable from 'formidable'
import { resizeImage, storeImageData } from 'utils/media'
import { authMiddleware, RequestWithAuth } from 'utils/middleware'
import fs from 'fs'
import { ResponseInternalError } from 'utils/response'

const mediaRouter = express()
const form = new formidable.IncomingForm()

mediaRouter.post('/', authMiddleware, async (req: RequestWithAuth, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      form.parse(req, async (err, _, { file }) => {
        try {
          if (err) {
            return reject(err)
          }

          // if (!/image\/[png|jpg|jpeg]/.test(file.type)) {
          //   return reject(new Error('File tidak didukung'))
          // }

          // const user = req.user

          // const result = await storeImageData({ files: [file.name], user })

          // if (result.length > 0) {
          //   const { _id, image } = result[0]
          //   await resizeImage(file.path, image)
          //   fs.unlinkSync(file.path)
          //   resolve({ _id, image })
          // } else {
          //   return res
          //     .status(422)
          //     .json({ message: 'error while processing image...' })
          // }
        } catch (e) {
          try {
            // Forced delete file
            // fs.unlinkSync(file.path)
          } catch (e) {
            // ...
          }
          return reject(e)
        }
      })
    })

    return res.json(result)
  } catch (error) {
    ResponseInternalError(res)
  }
})

export default mediaRouter
