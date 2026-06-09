const mongoose = require('mongoose');

/**
 * Define the schema for a game lineup.
 * @typedef {Object} GameLineup
 * @property {Number} game_lineups_id - The unique identifier for the game lineup.
 * @property {Number} game_id - The identifier for the game in which the lineup is used.
 * @property {Number} club_id - The identifier for the club for which the lineup is used.
 * @property {String} type - The type of lineup (e.g., starting, substitute).
 * @property {Number} number - The number of the player in the lineup.
 * @property {Number} player_id - The identifier for the player in the lineup.
 * @property {String} player_name - The name of the player in the lineup.
 * @property {Boolean} team_captan - Indicates whether the player is the team captain.
 * @property {String} position - The position of the player in the lineup.
 */
const gameLineup = new mongoose.Schema({
    game_lineups_id: {
        type: Number,
        required: true
    },
    game_id: {
        type: Number,
        required: true
    },
    club_id: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    player_id: {
        type: Number,
        required: true
    },
    player_name: {
        type: String,
        required: true
    },
    team_captan: {
        type: Boolean,
        required: true
    },
    position: {
        type: String,
        required: true
    },
});

/**
 * Create a model from the GameLineup schema.
 */
const GameLineup = mongoose.model('game_lineups', gameLineup);

module.exports = GameLineup;

module.exports = GameLineup