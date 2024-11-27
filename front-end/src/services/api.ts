import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

export const estimateRide = async (data: { customer_id: string, origin: string, destination: string }) => {
  return api.post('/rides/estimate', data);
};

export const confirmRide = async (data: any) => {
  return api.post('/rides/confirm', data);
};

export const getRideHistory = async (customerId: string, driverId: string) => {
  return api.get(`/ride/history?customer_id=${customerId}&driver_id=${driverId}`);
};