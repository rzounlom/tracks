// auth HOF

import { NextApiRequest, NextApiResponse } from 'next'

import jwt from 'jsonwebtoken'
import prisma from './prisma'

export const validateRoute = (handler) => {
  // takes a handler and only calls the handler if user/token is valid

  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN

    if (token) {
      let user

      try {
        // verify secret by using password used to sign
        const { id } = jwt.verify(token, 'hello')

        // try to find user with the id from the token
        user = await prisma.user.findUnique({
          where: { id },
        })

        // throw error if not user found
        if (!user) {
          throw new Error('User not found')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not Authorizied' })
      }

      return handler(req, res, user)
    }

    // if not token return 401 error
    res.status(401)
    res.json({ error: 'Not Authorizied' })
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, 'hello')
  return user
}
