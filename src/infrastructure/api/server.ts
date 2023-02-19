import dotenv from 'dotenv';
import { app } from './express';

dotenv.config();

const port: number = Number(process.env.port) || 3000;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
