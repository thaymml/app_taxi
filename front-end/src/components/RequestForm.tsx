import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Grid, Alert, InputAdornment } from '@mui/material';
import { AccountCircle, LocationOn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface RequestFormProps {
  setRideOptions: React.Dispatch<React.SetStateAction<any>>;
  setRouteResponse: React.Dispatch<React.SetStateAction<any>>;
}

const RequestForm: React.FC<RequestFormProps> = ({ setRideOptions, setRouteResponse }) => {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/estimate', {
        customerId,
        origin,
        destination,
      });
      const { routeResponse, options } = response.data;

      setRideOptions(options);
      setRouteResponse(routeResponse);

      navigate('/ride-options', { state: { routeResponse, options } });
    } catch (err) {
      setError('Erro ao solicitar a viagem.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh', background: 'linear-gradient(to bottom, #fce4ec, #f8bbd0, #f48fb1, #f06292)' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Card style={{ padding: '20px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Solicitação de Viagem
            </Typography>
            {error && <Alert severity="error" style={{ marginBottom: '20px' }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <TextField
                label="ID do Usuário"
                fullWidth
                margin="normal"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                style={{ borderRadius: '8px', padding: '5px' }}
              />
              <TextField
                label="Endereço de Origem"
                fullWidth
                margin="normal"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
                style={{ borderRadius: '8px', padding: '5px' }}
              />
              <TextField
                label="Endereço de Destino"
                fullWidth
                margin="normal"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{ borderRadius: '8px', padding: '5px' }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  borderRadius: '8px',
                  marginTop: '15px',
                  transition: 'background-color 0.3s ease, transform 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Estimar Viagem
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default RequestForm;