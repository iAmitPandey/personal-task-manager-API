import express, { json } from 'express';
import { config } from './config/config.js';
import authRoutes from './routes/user.routes.js';
import taskRoutes from './routes/tasks.routes.js';
import errorHandler from './middleware/error.middleware.js';

import morgan from 'morgan';
import logger from './config/logger.js';

const app = express();
app.use(json());

const stream = {
    write: (message) => logger.info(message.trim()), 
  };
  
  
  app.use(
    morgan('combined', {
      stream,
      skip: (req, res) => res.statusCode < 400, 
    })
  );

// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);

const PORT = config.port || 8000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
