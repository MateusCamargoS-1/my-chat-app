import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error(err);

  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
 res.status(status).json({
    success: false,
    message: message,
  });
};

export default errorMiddleware;
