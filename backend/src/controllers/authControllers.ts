import type { Request, Response, NextFunction } from "express";


// get user
const getUser = async (req: Request, res: Response) => {
    res.json({"Response":"get Callback"})
}

// Register user 
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    res.json({"Response":"create Callback"})
}

// Login user 
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    res.json({"Response":"Login Callback"})
}

// Update user 
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    res.json({"Response":"update Callback"})
}

export {getUser, createUser, updateUser, loginUser};