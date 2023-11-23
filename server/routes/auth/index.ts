import express from 'express'
import { UserModel } from 'models/User'
import { compareHash, generateHash } from 'utils/password'
import { ResponseInternalError, ResponseUnprocessable } from 'utils/response'
import validateError from 'utils/validatorError'
import * as Yup from 'yup'
import {
  authMiddleware,
  generateToken,
  RequestWithAuth,
} from 'utils/middleware'
const authRouter = express()

authRouter
  .post('/login', async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await UserModel.findOne({ email }).select('+password')

      if (!user)
        return ResponseUnprocessable(res, 'The email is not in our record')

      if (await compareHash(password, user.password)) {
        // Create jwt
        generateToken(res, { _id: user._id, name: user.name })

        res.status(200).json({
          success: true,
          message: 'Berhasil login',
          user: {
            name: user.name,
            email: user.email,
          },
        })
      } else {
        ResponseUnprocessable(res, 'Invalid password')
      }
    } catch (error) {
      ResponseInternalError(res)
    }
  })

  .post('/register', async (req, res) => {
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
        return res.status(422).json({ message: 'Pengguna sudah terdaftar!' })
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

  .get('/define', authMiddleware, async (req: RequestWithAuth, res) => {
    try {
      return res.status(200).json(req.user)
    } catch (error) {
      ResponseInternalError(res)
    }
  })

  .post('/logout', authMiddleware, async (req, res) => {
    try {
      return res
        .clearCookie('bs_auth')
        .status(200)
        .json({ message: 'Successfully logout' })
    } catch (error) {
      ResponseInternalError(res)
    }
  })

export default authRouter
