package com.example.springboot_server.player;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

/**
 * PlayerController class for handling HTTP requests related to Player.
 * This class uses PlayerService for business logic and data access.
 */
@RestController
public class PlayerController {

    private final PlayerService playerService;

    /**
     * Constructs a new PlayerController with the given PlayerService.
     *
     * @param playerService the PlayerService to use for business logic and data access
     */
    @Autowired
    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    /**
     * Handles GET requests to retrieve the default players.
     *
     * @return a ResponseEntity containing a list of PlayerDTO objects representing the default players and the HTTP status
     */
    @GetMapping("/springboot/get_default_players")
    public ResponseEntity<List<PlayerDTO>> get_default_players(){
        return new ResponseEntity<>(playerService.getTopPlayers(), HttpStatus.OK);
    }

    /**
     * Handles GET requests to retrieve players based on the given filters.
     *
     * @param playerName the name of the player to filter by
     * @param teamName the name of the team to filter by
     * @param position the position of the player to filter by
     * @param limit the maximum number of players to return
     * @param offset the number of players to skip before starting to return players
     * @return a ResponseEntity containing a list of PlayerDTO objects representing the filtered players and the HTTP status
     */
    @GetMapping("/springboot/get_filtered_players")
    public ResponseEntity<List<PlayerDTO>> get_filtered_players(@RequestParam String playerName, @RequestParam String teamName, @RequestParam String position, @RequestParam String limit, @RequestParam String offset){
        Pageable pageable = PageRequest.of(Integer.parseInt(offset), Integer.parseInt(limit));
        List<PlayerDTO> results = playerService.getFilteredPlayers(playerName, teamName, position ,pageable);
        if(results == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    /**
     * Handles GET requests to retrieve player names for a list of player IDs.
     *
     * @param player_ids the IDs of the players to retrieve names for
     * @return a ResponseEntity containing a list of PlayerInfo objects representing the players' names and the HTTP status
     */
    @GetMapping("/springboot/get_player_names")
    public ResponseEntity<List<PlayerInfo>> getPlayerNameById(@RequestParam List<Integer> player_ids) {

        List<PlayerInfo> playerNames = playerService.getPlayerInfo(player_ids);

        return new ResponseEntity<>(playerNames, HttpStatus.OK);
    }

    /**
     * Record representing a player's information.
     */
    record PlayerInfo(int player_id, String name, String image_url){}
}