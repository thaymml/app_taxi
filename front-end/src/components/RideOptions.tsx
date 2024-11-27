import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid';

interface RouteResponse {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  routes: { overview_polyline: { points: string } }[];
}

interface DriverOption {
  id: string;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  price: number;
}

interface RideOptionsProps {
  routeResponse: RouteResponse;
  options: DriverOption[];
}

const RideOptions: React.FC<RideOptionsProps> = ({ routeResponse, options }) => {
  const handleChooseRide = (driverId: string) => {
    console.log(`Motorista escolhido: ${driverId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div id="map" style={{ height: '400px', marginBottom: '20px' }}>
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=${routeResponse.origin.lat},${routeResponse.origin.lng}&markers=${routeResponse.destination.lat},${routeResponse.destination.lng}&path=enc:${routeResponse.routes[0].overview_polyline.points}&key=YOUR_GOOGLE_API_KEY`}
          alt="Rota"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <Grid container spacing={3} component="div">
        {options.map((driver) => (
          <Grid xs={12} sm={6} md={4} key={driver.id} component="div">
            <Card>
              <CardContent>
                <Typography variant="h6">{driver.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {driver.description}
                </Typography>
                <Typography>Veículo: {driver.vehicle}</Typography>
                <Typography>Avaliação: {driver.rating}</Typography>
                <Typography>Preço: R$ {driver.price}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleChooseRide(driver.id)}
                  fullWidth
                >
                  Escolher
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RideOptions;