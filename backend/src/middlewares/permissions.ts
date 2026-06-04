import type { Request, Response, NextFunction } from "express";
import { PermissionArray, type PermissionAction, type PermissionConfig } from "./rbac.js";
import { prisma } from "../config/db.js";
import type { AppAction } from "../middlewares/rbac.js";
import type { User } from "../generated/prisma/client.js";


// Create a custom interface extending the standard Request
// interface AuthenticatedRequest extends Request {
//     user?: {
//         role: PermissionAction; // Or whatever type your role is
//         // other properties...
//     };
// }

// export function requirePermission(action: AppAction) {
//   return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     const id = req.params.id as string;
//     // if (!id || !isValidCuid(id)) {
//     //     return res.status(400).json({ error: 'Invalid user ID format' });
//     // }
    
//     // Added 'await' which was missing in the original code
//     const user = await prisma.user.findUnique({
//         where: { user_id: id },
//         // Optional: Exclude password from the returned data
//         // select: { id: true, email: true, name: true, created_at: true } 
//     });    
    
//     const userRole = req.user?.role as PermissionAction | undefined;

//     if (!userRole) {
//       return res.status(401).json({ error: "Unauthenticated" });
//     }

//     const allowedRoles = [action];

//     if (!allowedRoles) {
//       return res.status(500).json({ error: `Permission not defined: ${action}` });
//     }

//     if (!allowedRoles.includes(userRole)) {
//       return res.status(403).json({ error: "Insufficient permissions" });
//     }

//     next();
//   };
// } 



export interface AuthenticatedRequest extends Request {
  user?: User;
}

export const requirePermission = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    // console.log(userRole)
    if (!userRole) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};