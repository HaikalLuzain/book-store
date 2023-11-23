import express from 'express'
import { ResponseInternalError, ResponseUnprocessable } from 'utils/response'
import { UserModel } from 'models/User'
import * as Yup from 'yup'
import validateError from 'utils/validatorError'
import { generateHash } from 'utils/password'
import { authMiddleware } from 'utils/middleware'
const userRouter = express()

userRouter
  .get('/', authMiddleware, async (req, res) => {
    try {
      const users = await UserModel.find()

      return res.status(200).json({ data: users })
    } catch (error) {
      console.log(error)
      ResponseInternalError(res)
    }
  })

  .post('/', async (req, res) => {
    try {
      // VALIDATION
      try {
        await Yup.object()
          .shape({
            name: Yup.string().required().min(3),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
          })
          .validate(req.body, { abortEarly: false })
      } catch (e) {
        return validateError(e, res)
      }

      const { name, email, password } = req.body

      const foundDuplicates = await UserModel.findOne({ email })

      if (foundDuplicates) {
        return ResponseUnprocessable(res, 'Pengguna sudah terdaftar!')
      }

      const generatedPassword = await generateHash(password)

      const user = await UserModel.create({
        name: name,
        email: email,
        password: generatedPassword,
      })

      return res.status(200).json({ data: user })
    } catch (error) {
      ResponseInternalError(res)
    }
  })

export default userRouter
