import { Request, Response, NextFunction } from 'express';
import { estimateRideService, confirmRideService, listRidesService } from '../services/ride';

export const estimateRide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await estimateRideService(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error); 
  }
};

export const confirmRide = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = await confirmRideService(req.body);
    res.status(200).json({ success: true }); 
  } catch (error) {
    next(error);
  }
};

export const listRides = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { customer_id } = req.params;
    const { driver_id } = req.query;
    const result = await listRidesService(customer_id, driver_id as string);
    res.status(200).json(result);  
  } catch (error) {
    next(error);
  }
};