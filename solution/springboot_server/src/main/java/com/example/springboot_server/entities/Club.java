package com.example.springboot_server.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

/**
 * Represents a Club entity in the application.
 * This class is a JPA entity class and it is mapped to the "clubs" table in the database.
 */
@Entity
@Table(name = "clubs")
public class Club {

    @Id
    private int club_id;

    @Column(name = "club_code")
    private String club_code;

    @Column(name = "name")
    private String name;

    @Column(name = "domestic_competition_id")
    private String domestic_competition_id;

    @Column(name = "total_market_value")
    private int total_market_value;

    @Column(name = "squad_size")
    private int squad_size;

    @Column(name = "average_age")
    private BigDecimal average_age;

    @Column(name = "foreigners_number")
    private int foreigners_number;

    @Column(name = "foreigners_percentage")
    private BigDecimal foreigners_percentage;

    @Column(name = "national_team_players")
    private int national_team_players;

    @Column(name = "stadium_name")
    private String stadium_name;

    @Column(name = "stadium_seats")
    private int stadium_seats;

    @Column(name = "net_transfer_record")
    private String net_transfer_record;

    @Column(name = "coach_name")
    private String coach_name;

    @Column(name = "last_season")
    private int last_season;

    @Column(name = "url")
    private String url;

    /**
     * Constructs a new Club with the given parameters.
     *
     * @param club_id the ID of the club
     * @param club_code the code of the club
     * @param name the name of the club
     * @param domestic_competition_id the ID of the domestic competition
     * @param total_market_value the total market value of the club
     * @param squad_size the size of the squad
     * @param average_age the average age of the players
     * @param foreigners_number the number of foreign players
     * @param foreigners_percentage the percentage of foreign players
     * @param national_team_players the number of players in the national team
     * @param stadium_name the name of the stadium
     * @param stadium_seats the number of seats in the stadium
     * @param net_transfer_record the net transfer record of the club
     * @param coach_name the name of the coach
     * @param last_season the last season of the club
     * @param url the URL of the club
     */
    public Club(int club_id, String club_code, String name, String domestic_competition_id, int total_market_value, int squad_size, BigDecimal average_age, int foreigners_number, BigDecimal foreigners_percentage, int national_team_players, String stadium_name, int stadium_seats, String net_transfer_record, String coach_name, int last_season, String url) {
        this.club_id = club_id;
        this.club_code = club_code;
        this.name = name;
        this.domestic_competition_id = domestic_competition_id;
        this.total_market_value = total_market_value;
        this.squad_size = squad_size;
        this.average_age = average_age;
        this.foreigners_number = foreigners_number;
        this.foreigners_percentage = foreigners_percentage;
        this.national_team_players = national_team_players;
        this.stadium_name = stadium_name;
        this.stadium_seats = stadium_seats;
        this.net_transfer_record = net_transfer_record;
        this.coach_name = coach_name;
        this.last_season = last_season;
        this.url = url;
    }

    /**
     * Constructs a new Club with no parameters.
     */
    public Club() {
    }
}