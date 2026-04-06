import type { Request, Response } from "express";


// get home
const home = async (req: Request, res: Response) => {
    res.json({"Response":"Home Callback"})
// export default home = (req: Request, res: Response, next: NextFunction) => {
//     indexRouter.get('/', () => {
//         res.json({"Response":"Index Callback"})
//     })
}


export {home};