var express = require('express');
var router = express.Router();
var axios = require('axios');

/**
 * Route serving competitions data.
 * @name get/get_competitions
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the default competitions.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_competitions', async (req, res) => {
    try{
        // Fetch competitions data from the API
        const response = await axios.get('http://localhost:8080/springboot/get_competitions');

        // Send the competitions data as the response
        res.status(200).json(response.data);
    }catch(err){
        // Log any errors and send a response indicating an error occurred
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
})

/**
 * Route serving filtered competitions data.
 * @name get/get_filtered_competitions
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the competitions filtered by name, country, type.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_filtered_competitions', async (req, res) => {
    try {
        // Extract query parameters from the request
        const {competitionName, country, type, limit, offset} = req.query;

        // Fetch filtered competitions data from the API
        const res1 = await axios.get(`http://localhost:8080/springboot/get_filtered_competitions`, {
            params : {
                competitionName,
                country,
                type,
                limit,
                offset
            }
        })

        // If no competitions found, send a response indicating so
        if(res1.status===404){
            res.status(404).send('No competitions found for these filters')
        }

        // Send the filtered competitions data as the response
        res.status(200).json(res1.data);

    } catch (err) {
        // Log any errors and send a response indicating an error occurred
        console.log(err)
        res.status(500).send('An error occurred trying to find the competitions')
    }
})

/**
 * Route serving ranking data.
 * @name get/get_ranking
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the ranking of a specific competition and year.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_ranking', async (req, res) => {
    try{
        // Extract selectedCompetition and selectedYear from the request query parameters
        const { selectedCompetition, selectedYear} = req.query;

        // Fetch ranking data from the API
        const response1 = await axios.get('http://localhost:4000/games/express/get_ranking', {
            params: {
                selectedCompetition,
                selectedYear,
            }
        });

        // Send the ranking data as the response
        res.status(200).json(response1.data);

    }catch(err){
        // Log any errors and send a response indicating an error occurred
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
})

module.exports = router;