import { Router } from 'express';
import { estimateRide, confirmRide, listRides } from '../controllers/rideController';

const router = Router();

router.post('/estimate', estimateRide);
router.patch('/confirm', confirmRide);
router.get('/:customer_id', listRides);

export default router;