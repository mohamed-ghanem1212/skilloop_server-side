import { NextFunction, Response, Request } from "express";
import { requestUser } from "../types/user.types";

// export type requestType = Request | requestUser;
export const asyncHandler = (
  fn: (req: any, res: Response, next: NextFunction) => any
) => {
  return (req: any, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};
