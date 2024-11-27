import axios from 'axios';
import { RideRequest, RideResponse } from '../models/ride';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const drivers = [
  {
    id: 1,
    name: 'Homer Simpson',
    vehicle: 'Plymouth Valiant 1973',
    rating: 2,
    ratePerKm: 2.5,
    minKm: 3,
  },
  {
    id: 2,
    name: 'Dominic Toretto',
    vehicle: 'Dodge Charger R/T 1970',
    rating: 4,
    ratePerKm: 5,
    minKm: 5,
  },
  {
    id: 3,
    name: 'James Bond',
    vehicle: 'Aston Martin DB5',
    rating: 5,
    ratePerKm: 10,
    minKm: 10,
  },
];

export const estimateRideService = async (data: RideRequest) => {
  if (!data.origin || !data.destination || !data.customer_id) {
    throw new Error('Invalid input');
  }

  const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
    params: {
      origin: data.origin,
      destination: data.destination,
      key: GOOGLE_API_KEY,
    },
  });

  const route = response.data.routes[0].legs[0];
  const distance = route.distance.value / 1000; 
  const duration = route.duration.text;

  const availableDrivers = drivers.filter(driver => driver.minKm <= distance);

  const options = availableDrivers.map(driver => ({
    id: driver.id,
    name: driver.name,
    description: `Descrição do motorista ${driver.name}`,
    vehicle: driver.vehicle,
    review: {
      rating: driver.rating,
      comment: `${driver.name} é ótimo!`,
    },
    value: distance * driver.ratePerKm,
  })).sort((a, b) => a.value - b.value);

  return {
    origin: route.start_location,
    destination: route.end_location,
    distance,
    duration,
    options,
    routeResponse: response.data,
  };
};

export const confirmRideService = async (data: any) => {
  const { customer_id, origin, destination, driver, distance, duration } = data;

  if (!customer_id || !origin || !destination || !driver || !distance || !duration) {
    throw new Error('Missing required fields');
  }

  const selectedDriver = drivers.find(d => d.id === driver.id);
  if (!selectedDriver) throw new Error('Driver not found');
  if (selectedDriver.minKm > distance) throw new Error('Invalid distance for the driver');

  return {
    success: true,
  };
};

export const listRidesService = async (customer_id: string, driver_id?: string) => {
  const rides = [
    {
      id: 1,
      date: new Date(),
      origin: 'Rua A',
      destination: 'Rua B',
      distance: 10,
      duration: '20 min',
      driver: { id: 1, name: 'Homer Simpson' },
      value: 25,
    },
  ];

  if (driver_id) {
    return {
      customer_id,
      rides: rides.filter(ride => ride.driver.id.toString() === driver_id),
    };
  }

  return { customer_id, rides };
};