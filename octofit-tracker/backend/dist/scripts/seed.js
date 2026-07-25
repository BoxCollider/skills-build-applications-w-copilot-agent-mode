"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
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
// Seed the octofit_db database with test data
// This script populates users, teams, activities, leaderboard entries, and workouts.
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            User.deleteMany({}),
            Team.deleteMany({}),
            Activity.deleteMany({}),
            LeaderboardEntry.deleteMany({}),
            Workout.deleteMany({}),
        ]);
        await Promise.all([
            User.create({
                name: 'Avery',
                role: 'Captain',
                description: 'Team captain focused on strategy and motivation',
            }),
            User.create({
                name: 'Jordan',
                role: 'Member',
                description: 'Reliable team member who contributes consistently',
            }),
            Team.create({
                name: 'River Runners',
                focus: 'Endurance',
                description: 'Training group dedicated to long-distance endurance sessions',
            }),
            Team.create({
                name: 'Peak Pioneers',
                focus: 'Strength',
                description: 'Performance-focused team centered on strength building',
            }),
            Activity.create({
                type: 'Run',
                distanceKm: 5.2,
                durationMinutes: 32,
                description: 'Morning run through the river trail',
            }),
            Activity.create({
                type: 'Yoga',
                distanceKm: 0,
                durationMinutes: 25,
                description: 'Gentle recovery session centered on flexibility',
            }),
            LeaderboardEntry.create({
                name: 'Avery',
                points: 1200,
                description: 'Top performer with strong weekly consistency',
            }),
            LeaderboardEntry.create({
                name: 'Jordan',
                points: 980,
                description: 'Steady contributor with reliable weekly effort',
            }),
            Workout.create({
                title: 'Tempo Run',
                durationMinutes: 35,
                focus: 'Cardio',
                description: 'Structured interval session for aerobic endurance',
            }),
            Workout.create({
                title: 'Core Circuit',
                durationMinutes: 20,
                focus: 'Strength',
                description: 'Short core and conditioning session for balance',
            }),
        ]);
        console.log('Database seeding complete');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
seedDatabase();
