var express = require('express');
var router = express.Router();
var axios = require('axios');

/**
 * Route serving clubs data.
 * @name get/get_clubs
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the default clubs.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_clubs', async (req, res) => {
    try{
        // Fetch clubs data from the API
        const response = await axios.get('http://localhost:8080/springboot/get_clubs');

        // Send the clubs data as the response
        res.status(200).json(response.data);
    }catch(err){
        // Log any errors and send a response indicating an error occurred
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
})

/**
 * Route serving filtered clubs data.
 * @name get/get_filtered_clubs
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the clubs filtered by name, competition, country.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_filtered_clubs', async (req, res) => {
    try {
        // Extract query parameters from the request
        const {clubName, competition, country, limit, offset} = req.query;

        // Fetch filtered clubs data from the API
        const res1 = await axios.get(`http://localhost:8080/springboot/get_filtered_clubs`, {
            params : {
                clubName,
                competition,
                country,
                limit,
                offset
            }
        })

        // If no clubs found, send a response indicating so
        if(res1.status===404){
            res.status(404).send('No clubs found for these filters')
        }

        // Send the filtered clubs data as the response
        res.status(200).json(res1.data);

    } catch (err) {
        // Log any errors and send a response indicating an error occurred
        console.log(err)
        res.status(500).send('An error occurred trying to find the clubs')
    }
})

module.exports = router;