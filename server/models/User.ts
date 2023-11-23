import mongoose, { Document, Model, model, Schema } from 'mongoose'
import { User } from 'types/user'
import uuid from 'uuid'

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: {} }
)

export interface UserDocument extends User, Document {
  _id: string
}

export const UserModel: Model<UserDocument> =
  mongoose.models.User || model<UserDocument>('User', UserSchema)
