export interface RideRequest {
    customer_id: string;
    origin: string;
    destination: string;
  }
  
  export interface RideResponse {
    origin: { latitude: number; longitude: number };
    destination: { latitude: number; longitude: number };
    distance: number;
    duration: string;
    options: {
      id: number;
      name: string;
      description: string;
      vehicle: string;
      review: {
        rating: number;
        comment: string;
      };
      value: number;
    }[];
    routeResponse: object;
  }