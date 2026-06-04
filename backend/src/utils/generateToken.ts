import jwt from "jsonwebtoken";
// import { Secret} from "jsonwebtoken";
import type { Response } from "express";
import { createSecretKey } from "node:crypto";


// export const generateToken = (userId: string, res: Response) => {

//   const payload = { id: userId };
//   const token = jwt.sign(payload, process.env.JWT_SECRET!, {
//     expiresIn: process.env.JWT_EXPIRES_IN || '7200',
//   });

//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//     maxAge: 1000 * 60 * 60 * 24 * 7,
//   });
//   return token;
// };

export const generateToken = (userId: string, res: Response) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not set');

  const token = jwt.sign({ id: userId }, secret, { expiresIn: '1d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return token; // 🔁 so it can be used in the response body
};