import mongoose, { Document, Model, model, Schema } from 'mongoose'
import { User, Image } from 'types'
import uuid from 'uuid'

export const ImageSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
    },
    user: {
      type: String,
      required: true,
      ref: 'User',
    },
    ext: {
      type: String,
      required: true,
      default: '',
    },
    used: {
      type: Boolean,
      required: true,
      default: false,
    },
    kind: {
      type: String,
      default: 'WEBSITE',
      required: true,
    },
  },
  { timestamps: {} }
)

export interface ImageDocument extends Image, Document {
  _id: string
  user: User
}

export const ImageModel: Model<ImageDocument> =
  mongoose.models.Image || model<ImageDocument>('Image', ImageSchema)
