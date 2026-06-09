package com.example.springboot_server.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * Represents a Competition entity in the application.
 * This class is a JPA entity class and it is mapped to the "competitions" table in the database.
 */
@Entity
@Table(name = "competitions")
public class Competition {

    @Id
    private String competition_id;

    @Column(name = "competition_code")
    private String competition_code;

    @Column(name = "name")
    private String name;

    @Column(name = "sub_type")
    private String sub_type;

    @Column(name = "type")
    private String type;

    @Column(name = "country_id")
    private int country_id;

    @Column(name = "country_name")
    private String country_name;

    @Column(name = "domestic_league_code")
    private String domestic_league_code;

    @Column(name = "confederation")
    private String confederation;

    @Column(name = "url")
    private String url;

    /**
     * Constructs a new Competition with the given parameters.
     *
     * @param competition_id the ID of the competition
     * @param competition_code the code of the competition
     * @param name the name of the competition
     * @param sub_type the subtype of the competition
     * @param type the type of the competition
     * @param country_id the ID of the country
     * @param country_name the name of the country
     * @param domestic_league_code the code of the domestic league
     * @param confederation the confederation of the competition
     * @param url the URL of the competition
     */
    public Competition(String competition_id, String competition_code, String name, String sub_type, String type, int country_id, String country_name, String domestic_league_code, String confederation, String url) {
        this.competition_id = competition_id;
        this.competition_code = competition_code;
        this.name = name;
        this.sub_type = sub_type;
        this.type = type;
        this.country_id = country_id;
        this.country_name = country_name;
        this.domestic_league_code = domestic_league_code;
        this.confederation = confederation;
        this.url = url;
    }

    /**
     * Constructs a new Competition with no parameters.
     */
    public Competition() {

    }
}