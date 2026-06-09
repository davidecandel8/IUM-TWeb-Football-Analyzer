var express = require('express');
var router = express.Router();
var axios = require('axios')
const support = require('../utils/support')

/**
 * Route serving default players data.
 * @name get/get_default_players
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the default players.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_default_players', async (req, res) => {
    try{
        // Fetch default players data from the API
        const res1 = await axios.get('http://localhost:8080/springboot/get_default_players')

        // Prepare the parameters for the next API call
        const params = support.preparePlayerParams(res1.data)

        // Fetch goals and assists data for each player from the API
        const res2 = await axios.get(`http://localhost:4000/appearances/express/get_goals_assists?${params}`)

        // Combine the players data with their respective goals and assists data
        const defaultPlayers = support.combinePlayerResults(res1.data, res2.data)

        // Send the combined data as the response
        res.status(200).json(defaultPlayers)
    }catch(err){
        console.error(err);
        res.status(500).send('An error occurred while loading players');
    }

})

/**
 * Route serving filtered players data.
 * @name get/get_filtered_players
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the players filtered by name, club, position.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_filtered_players', async (req, res) => {
    try {
        // Extract query parameters from the request
        const {playerName, teamName, position, limit, offset} = req.query;

        // Fetch filtered players data from the API
        const res1 = await axios.get(`http://localhost:8080/springboot/get_filtered_players`, {
            params : {
                playerName,
                teamName,
                position,
                limit,
                offset
            }
        })

        // If no players found, send a response indicating so
        if(res1.status===404){
            res.status(404).send('No players found for these filters')
        }

        // Prepare the parameters for the next API call
        let params = support.preparePlayerParams(res1.data)

        // Fetch goals and assists data for each player from the API
        const res2 = await axios.get(`http://localhost:4000/appearances/express/get_goals_assists?${params}`)

        // Combine the players data with their respective goals and assists data
        const filteredPlayers = support.combinePlayerResults(res1.data, res2.data)

        // Send the combined data as the response
        res.status(200).json(filteredPlayers)

    } catch (err) {
        console.log(err)
        res.status(500).send('An error occurred trying to find the players')
    }
})

module.exports = router;