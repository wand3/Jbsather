import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";
import type { Request, Response, NextFunction } from "express";

// Read the token from the request
// Check if token is valid
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  const id = req.params.id as string;
   
    

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token provided" });
  }

  try {
    // Verify token and extract the user Id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // const user = await prisma.user.findUnique({
    //   where: { user_id: decoded.id },
    // });
    // Added 'await' which was missing in the original code
    const user = await prisma.user.findUnique({
      where: { user_id: decoded.id },
      // Optional: Exclude password from the returned data
      // select: { id: true, email: true, name: true, created_at: true } 
    });  

    if (!user) {
      return res.status(401).json({ error: "User no longer exists" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Not authorized, token failed" });
  }
};