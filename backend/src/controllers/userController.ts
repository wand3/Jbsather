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




// // Read all items
// export const getItems = (req: Request, res: Response, next: NextFunction) => {
//     try {
//       res.json(User);
//     } catch (error) {
//       next(error);
//     }
//   };

export {allUsers};