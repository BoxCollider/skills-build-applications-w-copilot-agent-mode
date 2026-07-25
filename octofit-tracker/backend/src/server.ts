import express from 'express';
import mongoose from 'mongoose';

export const app = express();
export const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  focus: { type: String, required: true },
  description: { type: String, required: true },
});

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  durationMinutes: { type: Number, required: true },
  description: { type: String, required: true },
});

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
  description: { type: String, required: true },
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
  description: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);
const Activity = mongoose.model('Activity', activitySchema);
const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
const Workout = mongoose.model('Workout', workoutSchema);

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find({}).lean();
  res.json({ apiBaseUrl, users });
});

app.post('/api/users/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ apiBaseUrl, user });
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json({ apiBaseUrl, teams });
});

app.post('/api/teams/', async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json({ apiBaseUrl, team });
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json({ apiBaseUrl, activities });
});

app.post('/api/activities/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json({ apiBaseUrl, activity });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).lean();
  res.json({ apiBaseUrl, leaderboard });
});

app.post('/api/leaderboard/', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body);
  res.status(201).json({ apiBaseUrl, entry });
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json({ apiBaseUrl, workouts });
});

app.post('/api/workouts/', async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json({ apiBaseUrl, workout });
});

app.get('/', (_req, res) => {
  res.send('OctoFit backend is running');
});

export async function startServer() {
  // Seed the octofit_db database with test data
  await mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.warn('MongoDB connection unavailable, continuing without a database connection.', error);
    })
    .finally(() => {
      app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${apiBaseUrl}`);
      });
    });
}
