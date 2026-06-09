var express = require('express');
var router = express.Router();

const controller = require('../controllers/appearancesController')

/**
 * Route that gets goals and assists for given player IDs.
 *
 * @name get/goals_assists
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 *
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the results of the goals and assists for each player ID.
 * If there are any errors, returns a status of 500 and a JSON object containing the errors.
 */
router.get('/express/get_goals_assists', async (req, res, next)=>{
    // Extract player IDs from the request query and convert them to numbers
    const playerIds = Object.values(req.query).map(Number)
    console.log(playerIds)

    // Create an array of promises for each player ID to get their goals and assists
    const promises = playerIds.map(playerId => controller.getGoalsAssists(playerId).catch(err => ({ error: err })));

    // Wait for all promises to resolve
    const results = await Promise.all(promises);

    // Filter out any results that returned an error
    const errors = results.filter(result => result.error);

    // If there are any errors, return a status of 500 and the errors
    if (errors.length > 0) {
        res.status(500).json({ errors });
    } else {
        // If there are no errors, return a status of 200 and the results
        res.status(200).json({ results });
    }
})

module.exports = router