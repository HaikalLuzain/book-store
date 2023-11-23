import { MediaImageData } from '.'
import { User } from '.';

export interface Book {
  _id?: string 
  title: string
  genre: string
  publisher: string
  description: string
  price: number
  author: string
  images: [MediaImageData],
  user?: string | User
}