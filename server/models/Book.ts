import mongoose, { Document, Model, model, Schema } from 'mongoose'
import { Book } from 'types/book'
import uuid from 'uuid'

mongoose.models = mongoose.models || {}

const BookSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4
    },
    title: {
      type: String,
      required: true
    },
    genre: {
      type: String,
      required: true
    },
    publisher: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  }
)

export interface BookDocument extends Book, Document {
  _id: string
}

export const BookModel: Model<BookDocument> = 
mongoose.models.Book || model<BookDocument>('Book', BookSchema)