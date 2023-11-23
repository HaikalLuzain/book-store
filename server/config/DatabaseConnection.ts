import mongoose from 'mongoose'
import dotenv from 'dotenv'

export const ConnectToDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose
  }

  dotenv.config()

  const mongoDBConn = `mongodb://localhost/book-store`

  await mongoose.connect(process.env.MONGO_URI || mongoDBConn, {
    connectTimeoutMS: 15000,
    useNewUrlParser: true,
    autoIndex: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })

  console.log('Connected to Database')
}
