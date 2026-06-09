const Model = require('../models/gameEvent')

/**
 * Asynchronously fetches game events by game id.
 * @async
 * @function getGameEventsByGameId
 * @param {Number} game_id - The unique identifier for the game.
 * @returns {Array} An array of game events.
 * @throws error if the database operation fails.
 */
async function getGameEventsByGameId(game_id) {
    try {
        const gameEvents = await Model.find({ game_id });
        console.log('eventi partita: ' + gameEvents)
        return gameEvents;
    }
    catch(error){
        console.error('Error fetching game events:', error);
        throw error;
    }
}

module.exports.getGameEventsByGameId = getGameEventsByGameId

module.exports.getGameEventsByGameId = getGameEventsByGameId