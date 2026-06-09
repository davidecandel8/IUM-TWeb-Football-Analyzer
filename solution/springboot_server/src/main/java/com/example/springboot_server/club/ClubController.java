package com.example.springboot_server.club;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

/**
 * ClubController class for handling HTTP requests related to Club.
 * This class uses ClubService for business logic and data access.
 */
@RestController
public class ClubController {
    private final ClubService clubService;

    /**
     * Constructs a new ClubController with the given ClubService.
     *
     * @param clubService the ClubService to use for business logic and data access
     */
    public ClubController(ClubService clubService) {
        this.clubService = clubService;
    }

    /**
     * Handles GET requests to retrieve the top clubs.
     *
     * @return a ResponseEntity containing a list of ClubDTO objects representing the top clubs and the HTTP status
     */
    @GetMapping("/springboot/get_clubs")
    public ResponseEntity<List<ClubDTO>> getClubs(){
        List<ClubDTO> clubDTOS = clubService.getTopClubs();
        return new ResponseEntity<>(clubDTOS, HttpStatus.OK);
    }

    /**
     * Handles GET requests to retrieve clubs based on the given filters.
     *
     * @param clubName the name of the club to filter by
     * @param competition the competition of the club to filter by
     * @param country the country of the club to filter by
     * @param limit the maximum number of clubs to return
     * @param offset the number of clubs to skip before starting to return clubs
     * @return a ResponseEntity containing a list of ClubDTO objects representing the filtered clubs and the HTTP status
     */
    @GetMapping("/springboot/get_filtered_clubs")
    public ResponseEntity<List<ClubDTO>> getFilteredClubs(@RequestParam String clubName, @RequestParam String competition, @RequestParam String country, @RequestParam String limit, @RequestParam String offset){
        Pageable pageable = PageRequest.of(Integer.parseInt(offset), Integer.parseInt(limit));
        List<ClubDTO> results = clubService.getFilteredClubs(clubName, competition, country, pageable);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }

    /**
     * Handles GET requests to retrieve club names for a list of club IDs.
     *
     * @param club_ids the IDs of the clubs to retrieve names for
     * @return a ResponseEntity containing a list of ClubInfo objects representing the clubs' names and the HTTP status
     */
    @GetMapping("/springboot/get_club_names")
    public ResponseEntity<List<ClubInfo>> getClubNamesByIds(@RequestParam List<Integer> club_ids) {
        List<ClubInfo> clubNames = clubService.getClubNamesByIds(club_ids);
        return new ResponseEntity<>(clubNames, HttpStatus.OK);
    }

    /**
     * Record representing a club's information.
     */
    record ClubInfo(int club_id, String club_name){}
}