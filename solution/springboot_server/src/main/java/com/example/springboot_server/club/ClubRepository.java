package com.example.springboot_server.club;

import com.example.springboot_server.entities.Club;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/*
 * This class uses JpaRepository for data access.
 * It provides methods for retrieve information from the player clubs.
 */
@Repository
public interface ClubRepository extends JpaRepository<Club, Integer>{

    /**
     * Query to find top clubs.
     *
     * @return a list of Object arrays representing the top clubs
     */
    @Query(value="SELECT c.club_id, c.name, c.domestic_competition_id, comp.name, c.squad_size, c.average_age, c.foreigners_number, c.foreigners_percentage, c.national_team_players, c.stadium_name, c.stadium_seats, c.net_transfer_record, c.last_season FROM clubs c " +
            "JOIN competitions comp ON c.domestic_competition_id = comp.competition_id " +
            "WHERE c.club_id IN (281, 418, 27, 46, 583, 131, 11, 506, 31)", nativeQuery = true)
    List<Object[]> findTopClubs();

    /**
     * Query to find clubs by club name.
     *
     * @param clubName the name of the club to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered clubs
     */
    @Query(value="SELECT c.club_id, c.name, c.domestic_competition_id, comp.name, c.squad_size, c.average_age, c.foreigners_number, c.foreigners_percentage, c.national_team_players, c.stadium_name, c.stadium_seats, c.net_transfer_record, c.last_season FROM clubs c " +
            "JOIN competitions comp ON c.domestic_competition_id = comp.competition_id " +
            "WHERE LOWER(c.name) LIKE CONCAT('%', LOWER(:clubName), '%')", nativeQuery = true)
    Page<Object[]> findClubsByClubName(@Param("clubName") String clubName, Pageable pageable);

    /**
     * Query to find clubs by competition.
     *
     * @param competition the competition to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered clubs
     */
    @Query(value="SELECT c.club_id, c.name, c.domestic_competition_id, comp.name, c.squad_size, c.average_age, c.foreigners_number, c.foreigners_percentage, c.national_team_players, c.stadium_name, c.stadium_seats, c.net_transfer_record, c.last_season FROM clubs c " +
            "JOIN competitions comp ON c.domestic_competition_id = comp.competition_id " +
            "WHERE c.domestic_competition_id LIKE CONCAT('%', :competition, '%') AND c.last_season = '2023'", nativeQuery = true)
    Page<Object[]> findClubsByCompetition(@Param("competition") String competition, Pageable pageable);

    /**
     * Query to find clubs by country.
     *
     * @param country the country to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered clubs
     */
    @Query(value="SELECT c.club_id, c.name, c.domestic_competition_id, comp.name, c.squad_size, c.average_age, c.foreigners_number, c.foreigners_percentage, c.national_team_players, c.stadium_name, c.stadium_seats, c.net_transfer_record, c.last_season FROM clubs c " +
            "JOIN competitions comp ON c.domestic_competition_id = comp.competition_id " +
            "WHERE c.domestic_competition_id LIKE CONCAT('%', :country, '%')", nativeQuery = true)
    Page<Object[]> findClubsByCountry(@Param("country") String country, Pageable pageable);

    /**
     * Query to find clubs by club name and competition.
     *
     * @param clubName the name of the club to filter by
     * @param competition the competition to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered clubs
     */
    @Query(value="SELECT c.club_id, c.name, c.domestic_competition_id, comp.name, c.squad_size, c.average_age, c.foreigners_number, c.foreigners_percentage, c.national_team_players, c.stadium_name, c.stadium_seats, c.net_transfer_record, c.last_season FROM clubs c " +
            "JOIN competitions comp ON c.domestic_competition_id = comp.competition_id " +
            "WHERE LOWER(c.name) LIKE CONCAT('%', LOWER(:clubName), '%') AND c.domestic_competition_id LIKE CONCAT('%', :competition, '%') AND c.last_season = '2023'", nativeQuery = true)
    Page<Object[]> findClubsByClubNameAndCompetition(@Param("clubName") String clubName, @Param("competition") String competition, Pageable pageable);

    /**
     * Query to find clubs by club name and country.
     *
     * @param clubName the name of the club to filter by
     * @param country the country to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered clubs
     */
    @Query(value="SELECT c.club_id, c.name, c.domestic_competition_id, comp.name, c.squad_size, c.average_age, c.foreigners_number, c.foreigners_percentage, c.national_team_players, c.stadium_name, c.stadium_seats, c.net_transfer_record, c.last_season FROM clubs c " +
            "JOIN competitions comp ON c.domestic_competition_id = comp.competition_id " +
            "WHERE LOWER(c.name) LIKE CONCAT('%', LOWER(:clubName), '%') AND c.domestic_competition_id LIKE CONCAT('%', :country, '%')", nativeQuery = true)
    Page<Object[]> findClubsByClubNameAndCountry(@Param("clubName") String clubName, @Param("country") String country, Pageable pageable);

    /**
     * Query to find clubs by competition and country.
     *
     * @param competition the competition to filter by
     * @param country the country to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered clubs
     */
    @Query(value="SELECT c.club_id, c.name, c.domestic_competition_id, comp.name, c.squad_size, c.average_age, c.foreigners_number, c.foreigners_percentage, c.national_team_players, c.stadium_name, c.stadium_seats, c.net_transfer_record, c.last_season FROM clubs c " +
            "JOIN competitions comp ON c.domestic_competition_id = comp.competition_id " +
            "WHERE c.domestic_competition_id LIKE CONCAT('%', :competition, '%') AND c.last_season = '2023' AND c.domestic_competition_id LIKE CONCAT('%', :country, '%')", nativeQuery = true)
    Page<Object[]> findClubsByCompetitionAndCountry(@Param("competition") String competition, @Param("country") String country, Pageable pageable);

    /**
     * Query to find clubs by club name, competition, and country.
     *
     * @param clubName the name of the club to filter by
     * @param competition the competition to filter by
     * @param country the country to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered clubs
     */
    @Query(value="SELECT c.club_id, c.name, c.domestic_competition_id, comp.name, c.squad_size, c.average_age, c.foreigners_number, c.foreigners_percentage, c.national_team_players, c.stadium_name, c.stadium_seats, c.net_transfer_record, c.last_season FROM clubs c " +
            "JOIN competitions comp ON c.domestic_competition_id = comp.competition_id " +
            "WHERE LOWER(c.name) LIKE CONCAT('%', LOWER(:clubName), '%') AND c.domestic_competition_id LIKE CONCAT('%', :competition, '%') AND c.last_season = '2023' AND c.domestic_competition_id LIKE CONCAT('%', :country, '%')", nativeQuery = true)
    Page<Object[]> findClubsByClubNameAndCompetitionAndCountry(@Param("clubName") String clubName, @Param("competition") String competition, @Param("country") String country, Pageable pageable);

    /** Query to find club names by club IDs.
     *
     * @param club_ids the IDs of the clubs to retrieve names for
     * @return a list of Object arrays representing the clubs' names
     */
    @Query(value = "SELECT club_id, name FROM clubs WHERE club_id IN :club_ids", nativeQuery = true)
    List<Object[]> findClubsByIds(List<Integer> club_ids);
}
