const Model = require('../models/gameLineup');

/**
 * Asynchronously fetches game lineups by game id.
 * @async
 * @function getGameLineupsByGameId
 * @param {Number} game_id - The unique identifier for the game.
 * @returns {Array} An array of game lineups.
 * @throws error if the database operation fails.
 */
async function getGameLineupsByGameId(game_id) {
    try {
        return gameLineups = await Model.find({ game_id });
    }
    catch(error){
        console.error('Error fetching game lineups:', error);
        throw error;
    }
}

module.exports.getGameLineupsByGameId = getGameLineupsByGameId