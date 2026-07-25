import mongoose from 'mongoose';

const connectionString = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
});

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  focus: { type: String, required: true },
});

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  distanceKm: { type: Number, required: true },
  durationMinutes: { type: Number, required: true },
});

const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  points: { type: Number, required: true },
});

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focus: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);
const Activity = mongoose.model('Activity', activitySchema);
const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
const Workout = mongoose.model('Workout', workoutSchema);

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Promise.all([
      User.create({ name: 'Avery', role: 'Captain' }),
      User.create({ name: 'Jordan', role: 'Member' }),
      Team.create({ name: 'River Runners', focus: 'Endurance' }),
      Team.create({ name: 'Peak Pioneers', focus: 'Strength' }),
      Activity.create({ type: 'Run', distanceKm: 5.2, durationMinutes: 32 }),
      Activity.create({ type: 'Yoga', distanceKm: 0, durationMinutes: 25 }),
      LeaderboardEntry.create({ name: 'Avery', points: 1200 }),
      LeaderboardEntry.create({ name: 'Jordan', points: 980 }),
      Workout.create({ title: 'Tempo Run', durationMinutes: 35, focus: 'Cardio' }),
      Workout.create({ title: 'Core Circuit', durationMinutes: 20, focus: 'Strength' }),
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
