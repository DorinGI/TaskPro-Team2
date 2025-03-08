import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import fs from 'fs';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import boardRoutes from './routes/boardRoutes.js';
import columnRoutes from './routes/columnRoutes.js';
import cardRoutes from './routes/cardRoutes.js';

dotenv.config();

const app = express();
app.use(cors());

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// 🔥 Conectăm baza de date
connectDB();

// ✅ Montează corect rutele pentru backend
app.use('/api/auth', authRoutes); // 🔥 Acum frontend-ul va putea folosi `http://localhost:5000/api/auth/register`
app.use('/api/users', userRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/columns', columnRoutes);
app.use('/api/cards', cardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// ✅ Integrare Swagger pentru documentația API
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TaskPro Team 2 API',
      version: '1.0.0',
      description: 'API Documentation using Swagger',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log('📄 Swagger Docs available at http://localhost:5000/api-docs');
