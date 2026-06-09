var express = require('express');
var router = express.Router();

const controller = require('../controllers/gameEventsController')

/**
 * Route that gets game events for a given game ID.
 *
 * @name get/game_events
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 *
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the game events for the given game ID.
 * If the game ID does not exist or there are no game events, returns a status of 404.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/express/get_game_events', async (req, res, next) => {
    // Extract game ID from the request query
    const { game_id } = req.query;
    console.log(game_id)
    try {
        // Fetch game events for the given game ID
        const gameEvents = await controller.getGameEventsByGameId(game_id);
        // If there are no game events, return a status of 404
        if(gameEvents.length===0){
            res.status(404)
        }
        // If there are game events, return a status of 200 and the game events
        res.status(200).json(gameEvents);
    } catch (error) {
        // Log the error and return a status of 500 and the error message
        console.error('Error fetching game events:', error);
        res.status(500).json({ error: 'An error occurred while fetching game events' });
    }

})

module.exports = router