export interface RideRequest {
    customer_id: string;
    origin: string;
    destination: string;
  }
  
  export interface RideOption {
    id: string;
    name: string;
    description: string;
    vehicle: string;
    review: {
      rating: number;
    };
    value: number;
  }