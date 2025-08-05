import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.js';
import { sequelize } from './database/index.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

sequelize.sync().then(() => {
  console.log('📦 Database synchronized');
  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
  });
});