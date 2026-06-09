const mongoose = require('mongoose');

/**
 * Define the schema for a game.
 * @typedef {Object} Game
 * @property {Number} game_id - The unique identifier for the game.
 * @property {String} competition_id - The identifier for the competition in which the game is played.
 * @property {Number} season - The year in which the game is played.
 * @property {Date} date - The date of the game.
 * @property {Number} home_club_id - The identifier for the home club.
 * @property {Number} away_club_id - The identifier for the away club.
 * @property {Number} home_club_goals - The number of goals scored by the home club.
 * @property {Number} away_club_goals - The number of goals scored by the away club.
 * @property {Number} home_club_position - The position of the home club in the league table at the time of the game.
 * @property {Number} away_club_position - The position of the away club in the league table at the time of the game.
 * @property {String} home_club_manager_name - The name of the home club's manager.
 * @property {String} away_club_manager_name - The name of the away club's manager.
 * @property {String} stadium - The name of the stadium where the game is played.
 * @property {Number} attendance - The number of spectators at the game.
 * @property {String} referee - The name of the referee for the game.
 * @property {String} url - The URL of the game's page on the website.
 * @property {String} home_club_name - The name of the home club.
 * @property {String} away_club_name - The name of the away club.
 * @property {String} aggregate - The aggregate score of the game.
 * @property {String} competition_type - The type of competition in which the game is played.
 */
const game = new mongoose.Schema({
    game_id: {
        type: Number,
        required: true
    },
    competition_id: {
        type: String,
        required: true
    },
    season: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    home_club_id: {
        type: Number,
        required: true
    },
    away_club_id: {
        type: Number,
        required: true
    },
    home_club_goals: {
        type: Number,
        required: true
    },
    away_club_goals: {
        type: Number,
        required: true
    },
    home_club_position: {
        type: Number,
        required: true
    },
    away_club_position: {
        type: Number,
        required: true
    },
    home_club_manager_name: {
        type: String,
        required: true
    },
    away_club_manager_name: {
        type: String,
        required: true
    },
    stadium: {
        type: String,
        required: true
    },
    attendance: {
        type: Number,
        required: true
    },
    referee: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    home_club_name: {
        type: String,
        required: true
    },
    away_club_name: {
        type: String,
        required: true
    },
    aggregate: {
        type: String,
        required: true
    },
    competition_type: {
        type: String,
        required: true
    },
});

/**
 * Create a model from the Game schema.
 */
const Game = mongoose.model('games', game);

module.exports = Game;

module.exports = Game;