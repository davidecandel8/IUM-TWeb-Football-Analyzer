package com.example.springboot_server.competition;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

/**
 * CompetitionController class for handling HTTP requests related to Competition.
 * This class uses CompetitionService for business logic and data access.
 */
@RestController
public class CompetitionController {
    private final CompetitionService competitionService;

    /**
     * Constructs a new CompetitionController with the given CompetitionService.
     *
     * @param competitionService the CompetitionService to use for business logic and data access
     */
    public CompetitionController(CompetitionService competitionService) {
        this.competitionService = competitionService;
    }

    /**
     * Handles GET requests to retrieve the default competitions.
     *
     * @return a ResponseEntity containing a list of CompetitionDTO objects representing the default competitions and the HTTP status
     */
    @GetMapping("/springboot/get_competitions")
    public ResponseEntity<List<CompetitionDTO>> getCompetitions(){
        List<CompetitionDTO> competitionDTOS = competitionService.getTopCompetitions();
        return new ResponseEntity<>(competitionDTOS, HttpStatus.OK);
    }

    /**
     * Handles GET requests to retrieve competitions based on the given filters.
     *
     * @param competitionName the name of the competition to filter by
     * @param country the country of the competition to filter by
     * @param type the type of the competition to filter by
     * @param limit the maximum number of competitions to return
     * @param offset the number of competitions to skip before starting to return competitions
     * @return a ResponseEntity containing a list of CompetitionDTO objects representing the filtered competitions and the HTTP status
     */
    @GetMapping("/springboot/get_filtered_competitions")
    public ResponseEntity<List<CompetitionDTO>> getFilteredCompetitions(@RequestParam String competitionName, @RequestParam String country, @RequestParam String type, @RequestParam String limit, @RequestParam String offset){
        System.out.println("competitionName: " + competitionName + " country: " + country + " type: " + type);
        Pageable pageable = PageRequest.of(Integer.parseInt(offset), Integer.parseInt(limit));
        List<CompetitionDTO> results = competitionService.getFilteredCompetitions(competitionName, country, type, pageable);
        if(results == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(results, HttpStatus.OK);
    }
}
