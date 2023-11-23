import authRouter from './auth'
import bookRouter from './book'
import mediaRouter from './media'
import userRouter from './user'

export default function (app: any) {
  app.use('/api/user', userRouter)
  app.use('/api/auth', authRouter)
  app.use('/api/book', bookRouter)
  app.use('/api/media', mediaRouter)
}
