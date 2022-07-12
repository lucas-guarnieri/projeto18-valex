import {Request, Response, NextFunction} from "express";

export default function errorHandler (error, req: Request, res: Response, next: NextFunction) {
  console.log(error);//TODO: delete
  if (error.code !== 500) {
    return res.status(parseInt(error.code)).send(error.message);
  }

  res.sendStatus(500); // internal server error
}