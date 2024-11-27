import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err); 
  res.status(500).json({
    error_code: 'INTERNAL_SERVER_ERROR',
    error_description: err.message || 'Internal Server Error',
  });
};
