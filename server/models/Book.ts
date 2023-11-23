import mongoose, { Document, Model, model, Schema } from 'mongoose'
import { MediaImageData } from 'types'
import { Book } from 'types/book'
import uuid from 'uuid'

// mongoose.models = mongoose.models || {}

const ImageSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  ext: {
    type: String,
    required: true,
  },
})

const BookSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  images: [ImageSchema],
})

export interface ImageDocument extends MediaImageData, Document {
  _id: string
}

export interface BookDocument extends Book, Document {
  _id: string
  images: [ImageDocument]
}

export const BookModel: Model<BookDocument> =
  mongoose.models.Book || model<BookDocument>('Book', BookSchema)
