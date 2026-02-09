import jwt from "jsonwebtoken";
import "dotenv/config";
import { asyncHandler } from "../../utils/asyncHandler";
import { requestUser, User } from "../../types/user.types";
import { NextFunction, Response, Request } from "express";
import {} from "../../utils/asyncHandler";
import { UnauthorizedError } from "../../utils/errors";
export interface JwtPayload {
  email: string;
  username: string;

  id?: string;
  role?: string;
}
export const auth = asyncHandler(
  async (req: requestUser, res: Response, next: NextFunction) => {
    let token: string | undefined;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies.access_token) {
      token = req.cookies.access_token;
    }
    if (token === undefined) {
      throw new UnauthorizedError("Not authorized, please login");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      throw new UnauthorizedError("your session has been expired");
    }
    req.user = decoded as User;
    next();
  },
);
