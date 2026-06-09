package com.example.springboot_server.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents a Player_Valuation entity in the application.
 * This class is a JPA entity class and it is mapped to the "player_valuations" table in the database.
 */
@Entity
@Table(name = "player_valuations")
public class Player_Valuation {

    @Id
    @Column(name = "player_id")
    private int player_id;

    @Column(name = "last_season")
    private int last_season;

    @Column(name = "datetime")
    private String datetime;

    @Column(name = "date")
    private String date;

    @Column(name = "dateweek")
    private String dateweek;

    @Column(name = "market_value_in_eur")
    private int market_value_in_eur;

    @Column(name = "n")
    private int n;

    @Column(name = "current_club_id")
    private int current_club_id;

    @Column(name = "player_club_domestic_competition_id")
    private String player_club_domestic_competition_id;

    /**
     * Constructs a new Player_Valuation with the given parameters.
     *
     * @param player_id the ID of the player
     * @param last_season the last season of the player
     * @param datetime the datetime of the valuation
     * @param date the date of the valuation
     * @param dateweek the week of the valuation
     * @param market_value_in_eur the market value of the player in EUR
     * @param n the number of valuations
     * @param current_club_id the ID of the current club of the player
     * @param player_club_domestic_competition_id the ID of the domestic competition of the player's club
     */
    public Player_Valuation(int player_id, int last_season, String datetime, String date, String dateweek, int market_value_in_eur, int n, int current_club_id, String player_club_domestic_competition_id) {
        this.player_id = player_id;
        this.last_season = last_season;
        this.datetime = datetime;
        this.date = date;
        this.dateweek = dateweek;
        this.market_value_in_eur = market_value_in_eur;
        this.n = n;
        this.current_club_id = current_club_id;
        this.player_club_domestic_competition_id = player_club_domestic_competition_id;
    }

    /**
     * Constructs a new Player_Valuation with no parameters.
     */
    public Player_Valuation() {
    }
}