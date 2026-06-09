var express = require('express');
var router = express.Router();

const controller = require('../controllers/gamesController')

/**
 * Route that gets games based on the provided filters.
 *
 * @name get/games
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 *
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the games that match the provided filters.
 * If no games match the provided filters, returns a status of 404.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/express/get_games', async (req, res, next) => {
    const { selectedCompetition, selectedYear, selectedRound, limit, offset } = req.query;

    try {
        const games = await controller.getGamesByFilters(selectedCompetition, selectedYear, selectedRound, limit, offset);
        if(games.length===0){
            res.status(404)
        }
        res.status(200).json(games);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ error: 'An error occurred while fetching games' });
    }

})

/**
 * Route that gets the ranking for a given competition and year.
 *
 * @name get/ranking
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 *
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the ranking for the given competition and year.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/express/get_ranking', async (req, res, next) => {
    const { selectedCompetition, selectedYear} = req.query;

    try {
        const ranking = await controller.getRanking(selectedCompetition, selectedYear);

        res.status(200).json(ranking);
    } catch (error) {
        console.error('Error fetching ranking:', error);
        res.status(500).json({ error: 'An error occurred while fetching ranking' });
    }
})

module.exports = router