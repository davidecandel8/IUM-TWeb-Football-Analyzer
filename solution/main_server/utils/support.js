/**
 * This function prepares the parameters for the player request.
 * It takes an array of player data and a season, and returns a URLSearchParams string.
 *
 * @param {Array} data - The player data array. Each element of the array should be an object with a `player_id` property.
 * @returns {string} - A URLSearchParams string with player IDs and season.
 */
exports.preparePlayerParams = (data) => {
    // Map over the data array to get an array of player IDs
    const playerIds = data.map((player, index) => player.player_id);

    // Reduce the playerIds array into an object with keys as `player_id${index + 1}` and values as player IDs
    let params = playerIds.reduce((obj, id, index) => {
        obj[`player_id${index + 1}`] = id;
        return obj;
    }, {});

    // Convert the params object into a URLSearchParams string and return it
    return new URLSearchParams(params).toString();
}

/**
 * This function combines the results of two player data arrays.
 * It takes two arrays of player data and returns a new array where each element is an object that combines the properties of the corresponding elements from the input arrays.
 *
 * @param {Array} data1 - The first player data array. Each element of the array should be an object with a `player_id` property.
 * @param {Array} data2 - The second player data array. Each element of the array should be an object with a `player_id` property.
 * @returns {Array} - A new array where each element is an object that combines the properties of the corresponding elements from the input arrays.
 */
exports.combinePlayerResults = (data1, data2) => {
    // Map over the first data array
    return data1.map(player1 => {
        // For each player in the first data array, find the corresponding player in the second data array
        const player2 = data2.results.find(player2 => player2.player_id === player1.player_id);
        // Return a new object that combines the properties of the two players
        return {...player1, ...player2};
    });
}