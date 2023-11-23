import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserModel } from 'models/User'
import { User } from 'types/user'
import { ResponseUnauthorized } from './response'

export interface RequestWithAuth extends Request {
  user: User
}

const cookieName = 'bs_auth'

export const authMiddleware = async (
  req: RequestWithAuth,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies[cookieName]

  if (!token) return ResponseUnauthorized(res)

  try {
    const decode: any = jwt.verify(token, process.env.TOKEN_SECRET)
    const user = await UserModel.findOne({
      _id: decode._id,
    }).select('-password')
    req.user = user
    next()
  } catch (error) {
    res.status(400).send('Invalid Token')
  }
}

export const generateToken = (res: Response, data: any) => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: '1d' })

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(new Date().getTime() + 1 * 3600 * 1000),
  })
  // res.header('authorization', token)

  return token
}
