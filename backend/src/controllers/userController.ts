import type { NextFunction, Request, Response } from "express";
// import User from '../schemas/user.js'

const user = async function (req: Request, res:Response) {
    res.json({"Response":"User Callback"})
}

// Read all items
export const getItems = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(User);
    } catch (error) {
      next(error);
    }
  };

export {user};