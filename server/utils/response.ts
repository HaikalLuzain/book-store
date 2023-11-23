import { Response } from 'express'

export const ResponseInternalError = (
  res: Response,
  message = 'Something went wrong'
) => {
  return res.status(500).json({ message })
}

export const ResponseNotImplemented = (res: Response) => {
  return res.status(501).json({ message: 'Not Implemented' })
}

export const ResponseNotFound = (res: Response) => {
  return res.status(404).json({ message: 'not found' })
}

export const ResponseUnauthorized = (res: Response) => {
  return res.status(401).json({ message: 'Unauthorized' })
}

export const ResponseUnprocessable = (
  res: Response,
  message = 'Unprocessable'
) => {
  return res.status(422).json({ message })
}
