import express, { json } from 'express';
import { config } from './config/config.js';
import router from './routes/index.js';
import errorHandler from './middleware/error.middleware.js';
import db from './models/index.js';
const sequelize = db.sequelize;

import morgan from 'morgan';
import logger from './utils/logger.js';

const stream = {
    write: (message) => logger.info(message.trim()), 
  };
  
  const app = express();
  
  app.use(
    morgan('combined', {
      stream,
      skip: (req, res) => res.statusCode < 400, 
    })
  );

app.use(json());

app.use(router);

app.use(errorHandler);

sequelize.authenticate().then(()=>{
  logger.info('Connected to the database.');
  const PORT = config.port;
  app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
});
    
