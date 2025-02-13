import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import teamRoutes from './routes/team.routes';
import playerRoutes from './routes/player.routes';
import fantasyFormationsRoutes from './routes/formations/fantasy-formations.routes';
import mantraFormationsRoutes from './routes/formations/mantra-formations.routes';
import realFormationsRoutes from './routes/formations/real-formations.routes';
import seasonRoutes from './routes/season.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/formations/fantasy', fantasyFormationsRoutes);
app.use('/api/formations/mantra', mantraFormationsRoutes);
app.use('/api/formations/real', realFormationsRoutes);
app.use('/api/seasons', seasonRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/football-manager')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
