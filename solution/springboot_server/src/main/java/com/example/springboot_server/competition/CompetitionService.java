package com.example.springboot_server.competition;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

/**
 * CompetitionService class for managing operations related to Competition.
 * This class uses CompetitionRepository for data access.
 */
@Service
public class CompetitionService {
    private final CompetitionRepository competitionRepository;

    /**
     * Constructs a new CompetitionService with the given CompetitionRepository.
     *
     * @param competitionRepository the CompetitionRepository to use for data access
     */
    public CompetitionService(CompetitionRepository competitionRepository) {
        this.competitionRepository = competitionRepository;
    }

    /**
     * Retrieves the top competitions.
     *
     * @return a list of CompetitionDTO objects representing the top competitions
     */
    public List<CompetitionDTO> getTopCompetitions() {
        return competitionRepository.findTopCompetition().stream()
                .map(record -> new CompetitionDTO(
                        (String) record[0],
                        (String) record[1],
                        (String) record[2],
                        (String) record[3],
                        (Integer) record[4],
                        (String) record[5],
                        (String) record[6])
        ).collect(Collectors.toList());
    }

    /**
     * Retrieves competitions based on the given filters.
     *
     * @param competitionName the name of the competition to filter by
     * @param country the country of the competition to filter by
     * @param type the type of the competition to filter by
     * @param pageable the pagination information
     * @return a list of CompetitionDTO objects representing the filtered competitions
     */
    public List<CompetitionDTO> getFilteredCompetitions(String competitionName, String country, String type, Pageable pageable){
        Page<Object[]> results = null;

        if(!competitionName.equals("") && country.equals("") && type.equals("")) {
            results = competitionRepository.findCompetitionsByCompetitionName(competitionName, pageable);
        } else if(competitionName.equals("") && !country.equals("") && type.equals("")) {
            results = competitionRepository.findCompetitionsByCountry(country, pageable);
        } else if(competitionName.equals("") && country.equals("") && !type.equals("")) {
            results = competitionRepository.findCompetitionsByType(type, pageable);
        } else if(!competitionName.equals("") && !country.equals("") && type.equals("")) {
            results = competitionRepository.findCompetitionsByCompetitionNameAndCountry(competitionName, country, pageable);
        } else if(!competitionName.equals("") && country.equals("") && !type.equals("")) {
            results = competitionRepository.findCompetitionsByCompetitionNameAndType(competitionName, type, pageable);
        } else if(competitionName.equals("") && !country.equals("") && !type.equals("")) {
            results = competitionRepository.findCompetitionsByCountryAndType(country, type, pageable);
        } else if(!competitionName.equals("") && !country.equals("") && !type.equals("")) {
            results = competitionRepository.findCompetitionsByCompetitionNameAndCountryAndType(competitionName, country, type, pageable);
        }

        return results.stream()
                .map(record -> new CompetitionDTO(
                        (String) record[0],
                        (String) record[1],
                        (String) record[2],
                        (String) record[3],
                        (Integer) record[4],
                        (String) record[5],
                        (String) record[6])
        ).collect(Collectors.toList());
    }
}