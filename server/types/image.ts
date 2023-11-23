import { User } from './user'

export type ImageKind = 'USER' | 'SHOP' | 'WEBSITE'

export interface Image {
  _id?: string
  user: User | string
  kind: ImageKind
  ext: string
  used: boolean
}
