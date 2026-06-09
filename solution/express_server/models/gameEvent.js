const mongoose = require('mongoose');

/**
 * Define the schema for a game event.
 * @typedef {Object} GameEvent
 * @property {Number} game_event_id - The unique identifier for the game event.
 * @property {Number} game_id - The identifier for the game in which the event occurred.
 * @property {Number} minute - The minute of the game in which the event occurred.
 * @property {String} type - The type of event (e.g., goal, foul, substitution).
 * @property {Number} club_id - The identifier for the club involved in the event.
 * @property {Number} player_id - The identifier for the player involved in the event.
 * @property {String} description - A description of the event.
 * @property {Number} player_in_id - The identifier for the player who was substituted in during the event (if applicable).
 * @property {Number} player_assist_id - The identifier for the player who assisted in the event (if applicable).
 */
const gameEvent = new mongoose.Schema({
    game_event_id: {
        type: Number,
        required: true
    },
    game_id: {
        type: Number,
        required: true
    },
    minute: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    club_id: {
        type: Number,
        required: true
    },
    player_id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    player_in_id: {
        type: Number,
        required: false
    },
    player_assist_id: {
        type: Number,
        required: false
    }
});

/**
 * Create a model from the GameEvent schema.
 */
const GameEvent = mongoose.model('game_events', gameEvent);

module.exports = GameEvent;

module.exports = GameEvent;