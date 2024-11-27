import { Client } from 'pg';

const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432; 

const client = new Client({
  host: process.env.DB_HOST,       
  port: port,                     
  database: process.env.DB_NAME,   
  user: process.env.DB_USER,       
  password: process.env.DB_PASSWORD, 
});

client.connect()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch((err: Error) => {  
    console.error('Erro de conexão:', err);
  });

export default client;