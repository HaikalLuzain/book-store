import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import cookieParser from 'cookie-parser'
import { ConnectToDB } from './config/DatabaseConnection'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV

const corsOptions = {
  origin: 'http://localhost:3000', // reqexp will match all prefixes
  methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
  credentials: true, // required to pass
  allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
}

// app.options('*', cors(corsOptions))
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
routes(app)

// app.get('/api/cookie', (req, res) => {
//   const options = {
//     secure: false,
//     httpOnly: true,
//   }
//   return res
//     .cookie('cookieName', 'cookieValue', options)
//     .status(200)
//     .send('cookie sent')
// })

app.listen(port, () => {
  if (NODE_ENV !== 'test') console.log(`Server is running on port: ${port}`)
})

ConnectToDB()

export default app
