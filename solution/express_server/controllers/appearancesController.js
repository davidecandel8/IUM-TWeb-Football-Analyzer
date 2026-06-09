const Model = require('../models/appearance')

/**
 * Asynchronously fetches and calculates the total goals and assists for a given player in a given season.
 * @async
 * @function getGoalsAssists
 * @param {Number} playerId - The unique identifier for the player.
 * @returns {Object} An object containing the player's id, total goals and total assists.
 * @throws error if the database operation fails.
 */
async function getGoalsAssists(playerId){
    try{
        // Fetch the goals and assists data for the given player
        const res = await Model.find({
            player_id: playerId
        }, 'goals assists');

        // Initialize counters for total goals and assists
        let totalGoals = 0;
        let totalAssists = 0;

        // If data exists, calculate the total goals and assists
        if(res.length > 0){
            res.forEach(appearance => {
                totalGoals += appearance.goals;
                totalAssists += appearance.assists;
            });
            // Return the player's id, total goals and assists
            return {player_id: playerId, goals: totalGoals, assists: totalAssists};
        } else {
            // If no data exists, return the player's id with zero goals and assists
            return {player_id: playerId, goals: totalGoals, assists: totalAssists};
        }
    } catch(err) {
        // Log the error and re-throw it
        console.error('Error in getGoalsAssists:', err);
        throw err;
    }
}

module.exports.getGoalsAssists = getGoalsAssists