var express = require('express');
var router = express.Router();
var axios = require('axios');

/**
 * Route serving games data.
 * @name get/get_games
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the games searched by competition, year, round.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_games', async (req, res) => {
    try{
        // Extract query parameters from the request
        const { selectedCompetition, selectedYear, selectedRound, limit, offset } = req.query;

        // Fetch games data from the API
        const response1 = await axios.get('http://localhost:4000/games/express/get_games', {
            params: {
                selectedCompetition,
                selectedYear,
                selectedRound,
                limit,
                offset
            }
        });

        // Log the response data
        console.log('res1 data in games: ' + JSON.stringify(response1.data))

        // If no games found, send a response indicating so
        if(response1.status===404){
            res.status(404).send('No games found for these filters')
        }

        // Extract club IDs from the games data
        const clubIds = response1.data.map(game => [game.home_club_id, game.away_club_id]);

        // Remove duplicate club IDs
        const uniqueClubIds = [...new Set(clubIds.flat())];

        // Fetch club names from the API
        const response2 = await axios.get('http://localhost:8080/springboot/get_club_names', {
            params: {
                club_ids: uniqueClubIds.join(',')
            }
        });

        // Log the response data
        console.log('res2 data in games: ' + JSON.stringify(response2.data))

        // Create a mapping of club IDs to club names
        const clubNamesById = response2.data.reduce((acc, club) => {
            acc[club.club_id] = club.club_name;
            return acc;
        }, {});

        // Combine the games data with the club names
        const result = response1.data.map(game => ({
            game_id: game.game_id,
            home_club_id: game.home_club_id,
            away_club_id: game.away_club_id,
            home_club_name: clubNamesById[game.home_club_id],
            away_club_name: clubNamesById[game.away_club_id],
            home_club_goals: game.home_club_goals,
            away_club_goals: game.away_club_goals
        }));

        // Send the combined data as the response
        res.status(200).json(result);

    }catch(err){
        // Log any errors and send a response indicating an error occurred
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }
})

module.exports = router;