import { Request, Response, NextFunction } from "express";
import { requestUser } from "../../types/user.types";
import { ForbiddenError } from "../../utils/errors";

export const roleMiddleware = (requiredRoles: string[]) => {
  return (req: requestUser, next: NextFunction) => {
    const userRoles = req.user?.role || "user";
    if (!requiredRoles.includes(userRoles)) {
      throw new ForbiddenError(
        "You do not have permission to access this resource",
      );
    }
    next();
  };
};
