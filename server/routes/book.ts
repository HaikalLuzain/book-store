import express from 'express'
import { authMiddleware } from 'utils/middleware'
import { ResponseInternalError } from 'utils/response'
import { BookModel } from 'models/Book'

const bookRouter = express()

bookRouter
  .get('/', authMiddleware, async (req, res) => {
    try {
      const books = await BookModel.find()

      return res.status(200).json({ books: books })
    } catch (error) {
      ResponseInternalError(res)
    }
  })

  .post('/add', authMiddleware, async (req, res) => {})

export default bookRouter
