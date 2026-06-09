package com.example.springboot_server.competition;

import com.example.springboot_server.entities.Competition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/*
 * This class uses JpaRepository for data access.
 * It provides methods for retrieve information from the player competitions.
 */
@Repository
public interface CompetitionRepository extends JpaRepository<Competition, String> {

    /**
     * Query to find top competitions.
     *
     * @return a list of Object arrays representing the top competitions
     */
    @Query(value="SELECT competition_id, name, sub_type, type, country_id, country_name, confederation FROM competitions " +
            "WHERE competition_id IN ('IT1', 'ES1', 'GB1', 'CL', 'L1', 'EL', 'FR1', 'PO1', 'FAC')", nativeQuery = true)
    List<Object[]> findTopCompetition();

    /** Query to find competitions by competition name.
     *
     * @param competitionName the name of the competition to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered competitions
     */
    @Query(value="SELECT competition_id, name, sub_type, type, country_id, country_name, confederation FROM competitions " +
            "WHERE LOWER(name) LIKE CONCAT('%', LOWER(:competitionName), '%')", nativeQuery = true)
    Page<Object[]> findCompetitionsByCompetitionName(@Param("competitionName") String competitionName, Pageable pageable);

    /**
     * Query to find competitions by country.
     *
     * @param country the country to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered competitions
     */
    @Query(value="SELECT competition_id, name, sub_type, type, country_id, country_name, confederation FROM competitions " +
            "WHERE LOWER(country_name) LIKE CONCAT('%', LOWER(:country), '%')", nativeQuery = true)
    Page<Object[]> findCompetitionsByCountry(@Param("country") String country, Pageable pageable);

    /**
     * Query to find competitions by type.
     *
     * @param type the type of the competition to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered competitions
     */
    @Query(value="SELECT competition_id, name, sub_type, type, country_id, country_name, confederation FROM competitions " +
            "WHERE LOWER(sub_type) LIKE CONCAT('%', LOWER(:type), '%')", nativeQuery = true)
    Page<Object[]> findCompetitionsByType(@Param("type") String type, Pageable pageable);

    /**
     * Query to find competitions by competition name and country.
     *
     * @param competitionName the name of the competition to filter by
     * @param country the country to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered competitions
     */
    @Query(value="SELECT competition_id, name, sub_type, type, country_id, country_name, confederation FROM competitions " +
            "WHERE LOWER(name) LIKE CONCAT('%', LOWER(:competitionName), '%') AND LOWER(country_name) LIKE CONCAT('%', LOWER(:country), '%')", nativeQuery = true)
    Page<Object[]> findCompetitionsByCompetitionNameAndCountry(@Param("competitionName") String competitionName, @Param("country") String country, Pageable pageable);

    /**
     * Query to find competitions by competition name and type.
     *
     * @param competitionName the name of the competition to filter by
     * @param type the type of the competition to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered competitions
     */
    @Query(value="SELECT competition_id, name, sub_type, type, country_id, country_name, confederation FROM competitions " +
            "WHERE LOWER(name) LIKE CONCAT('%', LOWER(:competitionName), '%') AND LOWER(sub_type) LIKE CONCAT('%', LOWER(:type), '%')", nativeQuery = true)
    Page<Object[]> findCompetitionsByCompetitionNameAndType(@Param("competitionName") String competitionName, @Param("type") String type, Pageable pageable);

    /**
     * Query to find competitions by country and type.
     *
     * @param country the country to filter by
     * @param type the type of the competition to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered competitions
     */
    @Query(value="SELECT competition_id, name, sub_type, type, country_id, country_name, confederation FROM competitions " +
            "WHERE LOWER(country_name) LIKE CONCAT('%', LOWER(:country), '%') AND LOWER(sub_type) LIKE CONCAT('%', LOWER(:type), '%')", nativeQuery = true)
    Page<Object[]> findCompetitionsByCountryAndType(@Param("country") String country, @Param("type") String type, Pageable pageable);

    /**
     * Query to find competitions by competition name, country, and type.
     *
     * @param competitionName the name of the competition to filter by
     * @param country the country to filter by
     * @param type the type of the competition to filter by
     * @param pageable the pagination information
     * @return a Page of Object arrays representing the filtered competitions
     */
    @Query(value="SELECT competition_id, name, sub_type, type, country_id, country_name, confederation FROM competitions " +
            "WHERE LOWER(name) LIKE CONCAT('%', LOWER(:competitionName), '%') AND LOWER(country_name) LIKE CONCAT('%', LOWER(:country), '%') AND LOWER(sub_type) LIKE CONCAT('%', LOWER(:type), '%')", nativeQuery = true)
    Page<Object[]> findCompetitionsByCompetitionNameAndCountryAndType(@Param("competitionName") String competitionName, @Param("country") String country, @Param("type") String type, Pageable pageable);
}
