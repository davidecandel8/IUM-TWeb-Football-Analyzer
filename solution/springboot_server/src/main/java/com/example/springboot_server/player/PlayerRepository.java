package com.example.springboot_server.player;

import com.example.springboot_server.entities.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;
import java.util.List;

/**
 * This class uses JpaRepository for data access.
 * It provides methods for retrieve information from the player table.
 */
public interface PlayerRepository extends JpaRepository<Player, Integer> {

    /**
     * Custom query to find top players based on the market value in a specific season.
     *
     * @param season the season to filter players
     * @return a list of objects containing player_id and their maximum market value
     */
    @Query(value = "SELECT player_id, MAX(market_value_in_eur)" +
            "FROM player_valuations " +
            "WHERE date LIKE (:season%) " +
            "GROUP BY player_id " +
            "ORDER BY MAX(market_value_in_eur) DESC " +
            "LIMIT 9", nativeQuery = true)
    List<Object[]> findTopPlayers(@Param("season") int season);

    /**
     * Custom query to find players based on player name, team name, and position.
     *
     * @param playerName the name of the player
     * @param teamName the name of the team
     * @param position the position of the player
     * @param pageable pagination information
     * @return a list of player IDs
     */
    @Query(value = "SELECT p.player_id FROM players p " +
            "WHERE (:playerName = '' OR LOWER(p.name) LIKE  CONCAT('%', LOWER(:playerName), '%')) " +
            "AND (:teamName = '' OR p.current_club_id IN (SELECT c.club_id FROM clubs c WHERE LOWER(c.name) LIKE CONCAT('%', LOWER(:teamName), '%'))) " +
            "AND (:position = '' OR p.position = :position)" , nativeQuery = true)
    List<Integer> findPlayers(@Param("playerName") String playerName, @Param("teamName") String teamName, @Param("position") String position, Pageable pageable);

    /**
     * Custom query to find club names for a list of player IDs.
     *
     * @param ids the list of player IDs
     * @return a list of objects containing player_id and their club name
     */
    @Query(value = "SELECT p.player_id, c.name " +
            "FROM players p " +
            "JOIN clubs c ON p.current_club_id = c.club_id " +
            "WHERE p.player_id IN (:ids)", nativeQuery = true)
    List<Object[]> findClubNames(@Param("ids") List<Integer> ids);

    /**
     * Custom query to find market values for a list of player IDs.
     *
     * @param ids the list of player IDs
     * @return a list of objects containing player_id and their market value
     */
    @Query(value = "SELECT p.player_id, p.highest_market_value_in_eur " +
            "FROM players p" +
            " WHERE p.player_id IN (:ids)", nativeQuery = true)
    List<Object[]> findMarketValues(@Param("ids") List<Integer> ids);

    /**
     * Custom query to find dates of market values for a list of player IDs.
     *
     * @param ids the list of player IDs
     * @return a list of objects containing player_id and the date of their market value
     */
    @Query(value = "SELECT pv.player_id, MIN(pv.date) " +
            "FROM player_valuations pv " +
            "JOIN players p ON pv.player_id = p.player_id AND p.highest_market_value_in_eur = pv.market_value_in_eur " +
            "WHERE p.player_id IN (:ids) " +
            "GROUP BY pv.player_id", nativeQuery = true)
    List<Object[]> findDatesOfMarketValues(@Param("ids") List<Integer> ids);

    /**
     * Custom query to get player information for a list of player IDs.
     *
     * @param ids the list of player IDs
     * @return a list of objects containing player information
     */
    @Query(value = "SELECT p.player_id, p.name, p.last_season, p.current_club_name , p.position ,p.image_url, p.sub_position, p.date_of_birth, p.height_in_cm, p.foot, p.country_of_citizenship " +
            "FROM players p " +
            "WHERE p.player_id IN :ids", nativeQuery = true)
    List<Object[]> getPlayerInformation(@Param("ids") List<Integer> ids);

    /**
     * Custom query to get player information for a list of player IDs.
     *
     * @param player_ids the list of player IDs
     * @return a list of objects containing player_id, name, and image_url
     */
    @Query(value = "SELECT player_id, name, image_url FROM players WHERE player_id IN :player_ids", nativeQuery = true)
    List<Object[]> findPlayerInfo(List<Integer> player_ids);
}