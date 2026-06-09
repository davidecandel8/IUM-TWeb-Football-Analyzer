var express = require('express');
var router = express.Router();
var axios = require('axios');

/**
 * Route serving game lineups data.
 * @name get/get_game_lineups
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the lineups of a specific game.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_game_lineups', async (req, res) => {
    try{
        // Extract game_id from the request query parameters
        const { game_id } = req.query;

        // Fetch game lineups data from the API
        const response1 = await axios.get('http://localhost:4000/game_lineups/express/get_game_lineups', {
            params: {
                game_id
            }
        });

        // If no game lineups found, send a response indicating so
        if(response1.status===404){
            res.status(404).send('No game-lineups found for this game')
        }

        // Extract player IDs from the game lineups data
        const playerIds = response1.data.map(lineup => [lineup.player_id]);

        // Remove duplicate player IDs
        const uniquePlayerIds = [...new Set(playerIds.flat())];

        // Fetch player names from the API
        const response2 = await axios.get('http://localhost:8080/springboot/get_player_names', {
            params: {
                player_ids: uniquePlayerIds.join(',')
            }
        });

        // Create a mapping of player IDs to player image URLs
        const playerInfoMap = response2.data.reduce((acc, player) => {
            acc[player.player_id] = player.image_url;
            return acc;
        }, {});

        // Combine the game lineups data with the player image URLs
        const result = response1.data.map(lineup => ({
            game_lineup_id: lineup.game_lineup_id,
            game_id: lineup.game_id,
            club_id: lineup.club_id,
            type: lineup.type,
            number: lineup.number,
            player_id: lineup.player_id,
            player_image_url: playerInfoMap[lineup.player_id] ? playerInfoMap[lineup.player_id] : '',
            player_name: lineup.player_name,
            team_captain: lineup.team_captain,
            position: lineup.position
        }));

        // Log the combined data
        console.log(result);

        // Send the combined data as the response
        res.status(200).json(result);

    }catch(err){
        // Log any errors and send a response indicating an error occurred
        console.error(err);
        res.status(500).send('An error occurred while fetching data');
    }

})

module.exports = router;