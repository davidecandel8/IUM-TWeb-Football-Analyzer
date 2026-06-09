package com.example.springboot_server.player;

import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import java.util.*;

/**
 * PlayerService class for performing operations on the Player entity.
 * This class uses PlayerRepository for data access.
 */
@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    private final int season = 2023;

    /**
     * Constructor for the PlayerService class.
     *
     * @param playerRepository the player repository
     */
    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }


    /**
     * Get the top players based on the market value in a specific season.
     *
     * @return a list of PlayerDTO objects containing player information
     */
    public List<PlayerDTO> getTopPlayers() {

        List<PlayerValue> topPlayers = playerRepository.findTopPlayers(season).stream()
                .map(record -> new PlayerValue((Integer) record[0], (Integer) record[1]))
                .toList();

        System.out.println("topPlayers: " + topPlayers.toString());

        List<ClubPlayer> clubs = playerRepository.findClubNames(topPlayers.stream().map(pv -> pv.playerId).toList()).stream()
                .map(record -> new ClubPlayer((Integer) record[0], (String) record[1]))
                .toList();

        return playerRepository.getPlayerInformation(topPlayers.stream().map(pv -> pv.playerId).toList()).stream().map(
                record -> {
                    return new PlayerDTO(
                            (Integer) record[0],
                            (String) record[1],
                            (Integer) record[2],
                            clubs.stream().filter(c -> c.playerId== (Integer)record[0]).findFirst().get().clubName, // club_name
                            (String) record[4],
                            (String) record[5],
                            (String) record[6],
                            ((java.sql.Date) record[7]).toLocalDate(),
                            record[8] != null ? (Integer) record[8] : -1,
                            record[9] != null ? (String) record[9] : "",
                            (String) record[10],
                            season + "",
                            topPlayers.stream().filter(pv -> pv.playerId == (Integer) record[0]).findFirst().get().maxMarketValue
                    );
                }
        ).sorted(Comparator.comparing(PlayerDTO::getHighest_market_value).reversed()).toList();

    }

    /**
     * Get the filtered players based on player name, team name, and position.
     *
     * @param playerName the name of the player
     * @param teamName the name of the team
     * @param position the position of the player
     * @param pageable pagination information
     * @return a list of PlayerDTO objects containing player information
     */
    public List<PlayerDTO> getFilteredPlayers(String playerName, String teamName, String position, Pageable pageable) {

        List<Integer> ids =  playerRepository.findPlayers(playerName, teamName, position, pageable);
        System.out.println("ids player filtrati: " + ids.toString());
        List<Object[]> marketValues = playerRepository.findMarketValues(ids);
        List<PlayerValue> playerValues = marketValues.stream()
                .map(record -> {
                    return new PlayerValue((Integer) record[0], record[1] != null ? (Integer)record[1] : -1);                })
                .toList();

        System.out.println("playerValues: " + playerValues.toString());

        List<Object[]> dates = playerRepository.findDatesOfMarketValues(ids);
        List<DateValuePlayer> dateValuePlayers = dates.stream()
                .map(record -> {
                    return new DateValuePlayer((Integer) record[0], (String) record[1]);
                })
                .toList();

        System.out.println("dateValuePlayers: " + dateValuePlayers.toString());

        List<ClubPlayer> clubs = playerRepository.findClubNames(ids).stream()
                .map(record -> new ClubPlayer((Integer) record[0], (String) record[1]))
                .toList();

        return playerRepository.getPlayerInformation(ids).stream()
                .map(record -> {
                    String valueDate = dateValuePlayers.stream()
                            .filter(pv -> pv.playerId == (Integer) record[0])
                            .findFirst().filter(pv -> pv.value_date != null).map(pv -> pv.value_date).orElse(record[2].toString());

                    return new PlayerDTO(
                            (Integer) record[0],
                            (String) record[1],
                            (Integer) record[2],
                            clubs.stream().filter(c -> c.playerId == (Integer) record[0]).findFirst().get().clubName,
                            (String) record[4],
                            (String) record[5],
                            (String) record[6],
                            ((java.sql.Date) record[7]).toLocalDate(),
                            record[8] != null ? (Integer) record[8] : -1,
                            record[9] != null ? (String) record[9] : "",
                            (String) record[10],
                            valueDate,
                            playerValues.stream().filter(pv -> pv.playerId == (Integer) record[0]).findFirst().get().maxMarketValue
                    );
                })
                .toList();
    }

    /**
     * Get the player information for a list of player IDs.
     *
     * @param player_ids the list of player IDs
     * @return a list of PlayerController.PlayerInfo objects containing player information
     */
    public List<PlayerController.PlayerInfo> getPlayerInfo(List<Integer> player_ids) {
        return playerRepository.findPlayerInfo(player_ids).stream()
                .map(record -> new PlayerController.PlayerInfo((Integer) record[0], (String) record[1], (String) record[2]))
                .toList();
    }

    /* record classes for mapping the results of the custom queries */
    record PlayerValue(int playerId, int maxMarketValue) {}
    record ClubPlayer(int playerId, String clubName) {}
    record DateValuePlayer(int playerId, String value_date) {}
}
