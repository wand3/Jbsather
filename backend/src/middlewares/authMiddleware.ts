import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import type { Request, Response, NextFunction } from "express";


// Read the token from the request
// Check if token is valid
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
    console.log(token)
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
    console.log(token)

  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token provided' });
  }

  // 🔐 Ensure secret is available
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const decoded = jwt.verify(token, secret) as { id: string; role?: string };
    console.log(decoded)

    const user = await prisma.user.findUnique({
      where: { user_id: decoded.id },
    });
    console.log(user)

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    if (!user.isAuthenticated) return res.status(403).json({ error: "Account not activated" });


    req.user = user;   // user object now contains role (if in DB)
    console.log(user)
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized, token failed' });
  }
};