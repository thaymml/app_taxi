import express from 'express';
import dotenv from 'dotenv';
import rideRoutes from './routes/rideRoutes';

dotenv.config();

const app = express();
app.use(express.json()); 

const database = require('./config/database'); 
app.get('/', (req, res) => {
    res.send('Conectado ao banco de dados!');
  });

app.use('/rides', rideRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
