import type { Request, Response } from "express";


// get home
const home = async (req: Request, res: Response) => {
    res.json({"Response":"Home Callback"})
}

const apiHealth = async(req: Request, res:Response) => {
    res.json({ message: "Backend is working" });
}


export {home, apiHealth};