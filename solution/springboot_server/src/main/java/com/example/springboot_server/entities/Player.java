package com.example.springboot_server.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

/**
 * Represents a Player entity in the application.
 * This class is a JPA entity class and it is mapped to the "players" table in the database.
 */
@Entity
@Table(name = "players")
public class Player {

    @Id
    @Column(name = "player_id")
    private int player_id;

    @Column(name = "name")
    private String name;

    @Column(name = "current_club_id")
    private int current_club_id;

    @Column(name = "country_of_citizenship")
    private String citizenship;

    @Column(name = "date_of_birth")
    private LocalDate date_of_birth;

    @Column(name = "sub_position")
    private String sub_position;

    @Column(name = "position")
    private String position;

    @Column(name = "foot")
    private String foot;

    @Column(name = "height_in_cm")
    private int height;

    @Column(name = "image_url")
    private String image_url;

    /**
     * Constructs a new Player with the given parameters.
     *
     * @param player_id the ID of the player
     * @param name the name of the player
     * @param current_club_id the ID of the current club
     * @param citizenship the citizenship of the player
     * @param date_of_birth the date of birth of the player
     * @param sub_position the sub position of the player
     * @param position the position of the player
     * @param foot the foot of the player
     * @param height the height of the player
     * @param image_url the image URL of the player
     */
    public Player(int player_id, String name, int current_club_id, String citizenship, LocalDate date_of_birth, String sub_position, String position, String foot, int height, String image_url) {
        this.player_id = player_id;
        this.name = name;
        this.current_club_id = current_club_id;
        this.citizenship = citizenship;
        this.date_of_birth = date_of_birth;
        this.sub_position = sub_position;
        this.position = position;
        this.foot = foot;
        this.height = height;
        this.image_url = image_url;
    }

    /**
     * Constructs a new Player with no parameters.
     */
    public Player() {
    }

    @Override
    public String toString() {
        return "Player{" +
                "player_id=" + player_id +
                ", name='" + name + '\'' +
                ", current_club_id=" + current_club_id +
                ", citizenship='" + citizenship + '\'' +
                ", date_of_birth=" + date_of_birth +
                ", sub_position='" + sub_position + '\'' +
                ", position='" + position + '\'' +
                ", foot='" + foot + '\'' +
                ", height=" + height +
                ", image_url='" + image_url + '\'' +
                '}';
    }
}