const Model = require('../models/game')
const {json} = require("express");

/**
 * Asynchronously fetches games by applying the provided filters.
 * @async
 * @function getGamesByFilters
 * @param {Number} selectedCompetition - The unique identifier for the competition.
 * @param {Number} selectedYear - The year for which the games are to be fetched.
 * @param {Number} selectedRound - The round for which the games are to be fetched.
 * @param {Number} limit - The maximum number of games to be returned.
 * @param {Number} offset - The number of games to skip before starting to return.
 * @returns {Array} An array of games that match the provided filters.
 * @throws error if the database operation fails.
 */
async function getGamesByFilters(selectedCompetition, selectedYear, selectedRound, limit, offset) {
   try {
    /**
     * If no filters are provided, return an empty array.
     */
    if (selectedCompetition == null && selectedYear == null && selectedRound == null) {
        return [];
    }

    /**
     * Initialize an empty query object to store the filters.
     */
    const query = {};

    /**
     * If a competition filter is provided, add it to the query.
     */
    if (selectedCompetition) {
        query.competition_id = selectedCompetition;
    }

    /**
     * If a year filter is provided, add it to the query.
     */
    if (selectedYear) {
        query.season = selectedYear;
    }

    /**
     * If a round filter is provided, add it to the query.
     */
    if (selectedRound) {
        query.round = selectedRound;
    }

    /**
     * Fetch the games from the database that match the query, skipping the first 'offset' games and limiting the result to 'limit' games.
     * Return the fetched games.
     */
    const games = await Model.find(query, 'game_id home_club_id away_club_id home_club_goals away_club_goals')
                             .skip(offset)
                             .limit(limit);
    return games;
}
catch(error){
    /**
     * If an error occurs during the database operation, log the error and re-throw it.
     */
    console.error('Error fetching games:', error);
    throw error;
}
}

/**
 * Asynchronously fetches the ranking of clubs for a given competition and year.
 * @async
 * @function getRanking
 * @param {Number} selectedCompetition - The unique identifier for the competition.
 * @param {Number} selectedYear - The year for which the ranking is to be fetched.
 * @returns {Array} An array of club rankings.
 * @throws error if the database operation fails.
 */
async function getRanking(selectedCompetition, selectedYear) {
    try {
        /**
         * Create a query object with the provided competition and season.
         */
        const query = {
            competition_id: selectedCompetition,
            season: selectedYear
        };

        /**
         * Fetch the games from the database that match the query.
         */
        const games = await Model.find(query, 'home_club_id away_club_id home_club_name away_club_name home_club_goals away_club_goals');
        /**
         * Initialize objects to store the points, games played, goals scored, and goals conceded for each club.
         */
        let points = {};
        let gamesPlayed = {};
        let goalsScored = {};
        let goalsConceded = {};

        /**
         * For each game, calculate the points for the home and away clubs and update the respective counters.
         */
        games.forEach(game => {
            const homeClubId = game.home_club_id;
            const homeClub = game.home_club_name;
            const awayClubId = game.away_club_id;
            const awayClub = game.away_club_name;
            const [homePoints, awayPoints] = calculatePoints(game);

            // Update the counters for the home club
            points[homeClub] = (points[homeClub] || 0) + homePoints;
            gamesPlayed[homeClub] = (gamesPlayed[homeClub] || 0) + 1;
            goalsScored[homeClub] = (goalsScored[homeClub] || 0) + game.home_club_goals;
            goalsConceded[homeClub] = (goalsConceded[homeClub] || 0) + game.away_club_goals;

            // Update the counters for the away club
            points[awayClub] = (points[awayClub] || 0) + awayPoints;
            gamesPlayed[awayClub] = (gamesPlayed[awayClub] || 0) + 1;
            goalsScored[awayClub] = (goalsScored[awayClub] || 0) + game.away_club_goals;
            goalsConceded[awayClub] = (goalsConceded[awayClub] || 0) + game.home_club_goals;
        });

        /**
         * Convert the points object into an array of objects, each representing a club.
         * Each object contains the club's id, name, points, games played, goals scored, goals conceded, and goal difference.
         */
        const rankingArray = Object.keys(points).map(club => ({
            ClubId: games.find(game => game.home_club_name === club)?.home_club_id || games.find(game => game.away_club_name === club)?.away_club_id,
            Club: club,
            Points: points[club],
            GamesPlayed: gamesPlayed[club] || 0, // Ensure the games played count is at least 0
            GoalsScored: goalsScored[club] || 0,
            GoalsConceded: goalsConceded[club] || 0,
            GoalsDifference: (goalsScored[club] || 0) - (goalsConceded[club] || 0)
        }));

        /**
         * Sort the ranking array in descending order of points.
         */
        rankingArray.sort((a, b) => b.Points - a.Points);

        /**
         * Return the sorted ranking array.
         */
        return rankingArray;
    } catch (error) {
        /**
         * If an error occurs during the database operation, log the error and re-throw it.
         */
        console.error('Error fetching ranking:', error);
        throw error;
    }
}

/**
 * Calculates the points for the home and away clubs based on the goals scored.
 * @function calculatePoints
 * @param {Object} game - The game object containing the goals scored by the home and away clubs.
 * @returns {Array} An array containing the points for the home and away clubs.
 */
function calculatePoints(game) {

    /**
     * Calculate the points for the home club.
     * If the home club scored more goals, they get 3 points.
     * If the home club and away club scored the same number of goals, they get 1 point.
     * If the home club scored fewer goals, they get 0 points.
     */
    const homePoints = game.home_club_goals > game.away_club_goals ? 3 : (game.home_club_goals === game.away_club_goals ? 1 : 0);

    /**
     * Calculate the points for the away club.
     * If the away club scored more goals, they get 3 points.
     * If the away club and home club scored the same number of goals, they get 1 point.
     * If the away club scored fewer goals, they get 0 points.
     */
    const awayPoints = game.away_club_goals > game.home_club_goals ? 3 : (game.home_club_goals === game.away_club_goals ? 1 : 0);

    /**
     * Return an array containing the points for the home and away clubs.
     */
    return [homePoints, awayPoints];

}

module.exports.getGamesByFilters = getGamesByFilters
module.exports.getRanking = getRanking
