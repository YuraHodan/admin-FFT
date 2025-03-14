import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import teamRoutes from './routes/team.routes';
import playerRoutes from './routes/player.routes';
import seasonRoutes from './routes/season.routes';
import tourRoutes from './routes/tour.routes';
import playerNoteRoutes from './routes/player-note.routes';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/seasons', seasonRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/player-notes', playerNoteRoutes);

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
