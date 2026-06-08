import type { Request, Response, NextFunction } from "express";
import { PermissionArray, type PermissionAction, type PermissionConfig } from "./rbac.js";
import { prisma } from "../config/db.js";
import type { User } from "../generated/prisma/client.js";




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