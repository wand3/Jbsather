import jwt from "jsonwebtoken";
import type { Response } from "express";


export const generateToken = (userId: string, res: Response) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');

  const token = jwt.sign({ id: userId }, secret, { expiresIn: '1d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return token; // so it can be used in the response body
};