import React, { useState } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';

interface Ride {
  id: string;
  date: string;
  driverName: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  value: number;
}

const RideHistory: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [driverId, setDriverId] = useState<string>('');
  const [rides, setRides] = useState<Ride[]>([]);

  const handleFilter = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/ride/history?customer_id=${userId}&driver_id=${driverId}`
      );
      const data = await response.json();
      setRides(data.rides);
    } catch (error) {
      console.error('Erro ao buscar histórico de viagens:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Card style={{ marginBottom: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Histórico de Viagens
          </Typography>
          <Grid container spacing={2} component="div">
            <Grid xs={12} sm={6} component="div">
              <TextField
                label="ID do Usuário"
                fullWidth
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Grid>
            <Grid xs={12} sm={6} component="div">
              <Select
                value={driverId}
                fullWidth
                onChange={(e) => setDriverId(e.target.value)}
              >
                <MenuItem value="">Todos os Motoristas</MenuItem>
                <MenuItem value="1">Motorista 1</MenuItem>
                <MenuItem value="2">Motorista 2</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
            onClick={handleFilter}
          >
            Aplicar Filtro
          </Button>
        </CardContent>
      </Card>
      {rides.length > 0 ? (
        <Grid container spacing={2} component="div">
          {rides.map((ride) => (
            <Grid xs={12} key={ride.id} component="div">
              <Card>
                <CardContent>
                  <Typography>
                    {new Date(ride.date).toLocaleString()} - {ride.driverName}
                  </Typography>
                  <Typography>
                    {ride.origin} → {ride.destination}
                  </Typography>
                  <Typography>Distância: {ride.distance} km</Typography>
                  <Typography>Duração: {ride.duration}</Typography>
                  <Typography>Valor: R$ {ride.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Sem viagens para exibir.</Typography>
      )}
    </div>
  );
};

export default RideHistory;