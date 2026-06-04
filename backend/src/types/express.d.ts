// types/express.d.ts
import type { User } from "../generated/prisma/client.js";

declare global {
  namespace Express {
    interface Request {
      user?: User; // optional, set by authMiddleware
    }
  }
}
