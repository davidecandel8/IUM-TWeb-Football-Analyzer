var express = require('express');
var router = express.Router();

const controller = require('../controllers/gameLineupsController')

/**
 * Route that gets game lineups for a given game ID.
 *
 * @name get/game_lineups
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 *
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the game lineups for the given game ID.
 * If the game ID does not exist or there are no game lineups, returns a status of 404.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/express/get_game_lineups', async (req, res, next) => {
    // Extract game ID from the request query
    const { game_id } = req.query;

    try {
        // Fetch game lineups for the given game ID
        const gameLineups = await controller.getGameLineupsByGameId(game_id);
        // If there are no game lineups, return a status of 404
        if(gameLineups.length===0){
            res.status(404)
        }
        // If there are game lineups, return a status of 200 and the game lineups
        res.status(200).json(gameLineups);
    } catch (error) {
        // Log the error and return a status of 500 and the error message
        console.error('Error fetching game lineups:', error);
        res.status(500).json({ error: 'An error occurred while fetching game lineups' });
    }

})

module.exports = router