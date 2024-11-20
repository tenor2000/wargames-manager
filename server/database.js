import { Client } from 'pg';

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Export the client instance to be used in other files
export default client;