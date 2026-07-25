"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 8000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, required: true },
});
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    focus: { type: String, required: true },
    description: { type: String, required: true },
});
const activitySchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    distanceKm: { type: Number, required: true },
    durationMinutes: { type: Number, required: true },
    description: { type: String, required: true },
});
const leaderboardSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    points: { type: Number, required: true },
    description: { type: String, required: true },
});
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focus: { type: String, required: true },
    description: { type: String, required: true },
});
const User = mongoose_1.default.model('User', userSchema);
const Team = mongoose_1.default.model('Team', teamSchema);
const Activity = mongoose_1.default.model('Activity', activitySchema);
const LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
const Workout = mongoose_1.default.model('Workout', workoutSchema);
app.use(express_1.default.json());
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
mongoose_1.default
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
