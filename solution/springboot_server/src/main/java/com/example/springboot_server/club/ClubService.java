package com.example.springboot_server.club;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

/**
 * ClubService class for managing operations related to Club.
 * This class uses ClubRepository for data access.
 */
@Service
public class ClubService {
    private final ClubRepository clubRepository;

    /**
     * Constructs a new ClubService with the given ClubRepository.
     *
     * @param clubRepository the ClubRepository to use for data access
     */
    public ClubService(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    /**
     * Retrieves the top clubs.
     *
     * @return a list of ClubDTO objects representing the top clubs
     */
    public List<ClubDTO> getTopClubs() {
        return clubRepository.findTopClubs().stream()
                .map(record -> new ClubDTO(
                        (Integer) record[0],
                        (String) record[1],
                        (String) record[2],
                        (String) record[3],
                        (Integer) record[4],
                        (BigDecimal) record[5],
                        (Integer) record[6],
                        (BigDecimal) record[7],
                        (Integer) record[8],
                        (String) record[9],
                        (Integer) record[10],
                        (String) record[11],
                        (Integer) record[12])
                )
                .collect(Collectors.toList());
    }

    /**
     * Retrieves clubs based on the given filters.
     *
     * @param clubName the name of the club to filter by
     * @param competition the competition of the club to filter by
     * @param country the country of the club to filter by
     * @param pageable the pagination information
     * @return a list of ClubDTO objects representing the filtered clubs
     */
    public List<ClubDTO> getFilteredClubs(String clubName, String competition, String country, Pageable pageable){

       Page<Object[]> results = null;

       if(!clubName.equals("") && competition.equals("") && country.equals("")){
           results = clubRepository.findClubsByClubName(clubName, pageable);
       } else if(clubName.equals("") && !competition.equals("") && country.equals("")) {
           results = clubRepository.findClubsByCompetition(competition, pageable);
       } else if(clubName.equals("") && competition.equals("") && !country.equals("")) {
           results = clubRepository.findClubsByCountry(country, pageable);
       } else if(!clubName.equals("") && !competition.equals("") && country.equals("")) {
           results = clubRepository.findClubsByClubNameAndCompetition(clubName, competition, pageable);
       }else if(!clubName.equals("") && competition.equals("") && !country.equals("")) {
           results = clubRepository.findClubsByClubNameAndCountry(clubName, country, pageable);
       }else if(clubName.equals("") && !competition.equals("") && !country.equals("")) {
              results = clubRepository.findClubsByCompetitionAndCountry(competition, country, pageable);
       }else if(!clubName.equals("") && !competition.equals("") && !country.equals("")) {
           results = clubRepository.findClubsByClubNameAndCompetitionAndCountry(clubName, competition, country, pageable);
       }

       return results.stream()
                .map(record -> new ClubDTO(
                        (Integer) record[0],
                        (String) record[1],
                        (String) record[2],
                        (String) record[3],
                        (Integer) record[4],
                        (BigDecimal) record[5],
                        (Integer) record[6],
                        (BigDecimal) record[7],
                        (Integer) record[8],
                        (String) record[9],
                        (Integer) record[10],
                        (String) record[11],
                        (Integer) record[12])
                )
                .collect(Collectors.toList());
    }

    /**
     * Retrieves club names for a list of club IDs.
     *
     * @param club_ids the IDs of the clubs to retrieve names for
     * @return a list of ClubController.ClubInfo objects representing the clubs' names
     */
    public List<ClubController.ClubInfo> getClubNamesByIds(List<Integer> club_ids) {
            List<Object[]> clubNames = clubRepository.findClubsByIds(club_ids);
            return clubNames.stream()
                    .map(record -> new ClubController.ClubInfo(
                            (Integer) record[0],
                            (String) record[1])
                    )
                    .collect(Collectors.toList());
        }
}
