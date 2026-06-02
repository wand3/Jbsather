import type { NextFunction, Request, Response } from "express";
import { errorHandler } from "../middlewares/errorHandler.js";
import { prisma } from "../config/db.js";

const allUsers = async function (req: Request, res: Response) {
  try {
    console.log("DATABASE_URL used by Prisma:", process.env.DATABASE_URL);
    const result = await prisma.user.findMany();
    res.json(result);
  } catch (error: any) {
    console.error("Database error:", error);
    res.status(500).json({ error: error.message });
  }
};


// Update profile


// Certification (CREATE / UPDATE / DELETE)


// Education (CREATE / UPDATE / DELETE)


// Experience (CREATE / UPDATE / DELETE)


// Experience Story (CREATE / UPDATE / DELETE)


// Language (CREATE / UPDATE / DELETE)


// Personality Trait (CREATE / UPDATE / DELETE)


// Skills (CREATE / UPDATE / DELETE)


// Social links (CREATE / UPDATE / DELETE)



export {allUsers};