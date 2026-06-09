const mongoose = require('mongoose');

/**
 * Define the schema for a player's appearance in a game.
 * @typedef {Object} Appearance
 * @property {String} appearance_id - The unique identifier for the appearance.
 * @property {Number} game_id - The identifier for the game in which the player appeared.
 * @property {Number} player_id - The identifier for the player who made the appearance.
 * @property {Number} player_club_id - The identifier for the club for which the player made the appearance.
 * @property {Number} player_current_club_id - The identifier for the player's current club.
 * @property {Date} date - The date of the game in which the player made the appearance.
 * @property {String} player_name - The name of the player who made the appearance.
 * @property {String} competition_id - The identifier for the competition in which the game was played.
 * @property {Number} yellow_cards - The number of yellow cards the player received in the game.
 * @property {Number} red_cards - The number of red cards the player received in the game.
 * @property {Number} goals - The number of goals the player scored in the game.
 * @property {Number} assists - The number of assists the player made in the game.
 * @property {Number} minutes_played - The number of minutes the player played in the game.
 */
const appearance = new mongoose.Schema({
    appearance_id: {
        type: String,
        required: true
    },
    game_id: {
        type: Number,
        required: true
    },
    player_id: {
        type: Number,
        required: true
    },
    player_club_id: {
        type: Number,
        required: true
    },
    player_current_club_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    player_name: {
        type: String,
        required: true
    },
    competition_id: {
        type: String,
        required: true
    },
    yellow_cards: {
        type: Number,
        required: true
    },
    red_cards: {
        type: Number,
        required: true
    },
    goals: {
        type: Number,
        required: true
    },
    assists: {
        type: Number,
        required: true
    },
    minutes_played: {
        type: Number,
        required: true
    }
});

/**
 * Create a model from the Appearance schema.
 */
const Appearance = mongoose.model('appearances', appearance);

module.exports = Appearance;
module.exports = Appearance;
