import type { Request, Response } from "express";


// get home
const home = async (req: Request, res: Response) => {
    res.json({"Response":"Home Callback"})
}


export {home};