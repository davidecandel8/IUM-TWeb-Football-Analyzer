var express = require('express');
var router = express.Router();
var axios = require('axios');

/**
 * Route serving game events data.
 * @name get/get_game_events
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 * @returns {Object} - If successful, returns a status of 200 and a JSON object containing the events of a specific game.
 * If there are any errors, returns a status of 500 and a JSON object containing the error message.
 */
router.get('/main/get_game_events', async (req, res) => {
    try{
        // Extract game_id from the request query parameters
        const { game_id } = req.query;

        // Fetch game events data from the API
        const response1 = await axios.get('http://localhost:4000/game_events/express/get_game_events', {
            params: {
                game_id
            }
        });

        // If no game events found, send a response indicating so
        if(response1.status===404){
            res.status(404).send('No events found for this game')
        }

        // Extract player IDs from the game events data
        const playerIds = response1.data.map(event => [event.player_id, event.player_assist_id, event.player_in_id]);

        // Remove duplicate player IDs
        const uniquePlayerIds = [...new Set(playerIds.flat())];

        // Fetch player names from the API
        const response2 = await axios.get('http://localhost:8080/springboot/get_player_names', {
            params: {
                player_ids: uniquePlayerIds.join(',')
            }
        });

        // Create a mapping of player IDs to player names
        const playerInfoMap = response2.data.reduce((acc, player) => {
            acc[player.player_id] = player.name;
            return acc;
        }, {});

        // Combine the game events data with the player names
        const result = response1.data.map(event => ({
            game_event_id: event.game_event_id,
            game_id: event.game_id,
            minute: event.minute,
            type: event.type,
            club_id: event.club_id,
            description: event.description,
            player_id: event.player_id,
            player_name: playerInfoMap[event.player_id] ? playerInfoMap[event.player_id] : '',
            player_in_id: event.player_in_id,
            player_in_name: playerInfoMap[event.player_in_id] ? playerInfoMap[event.player_in_id] : '',
            player_assist_id: event.player_assist_id,
            player_assist_name: playerInfoMap[event.player_assist_id] ? playerInfoMap[event.player_assist_id] : ''
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