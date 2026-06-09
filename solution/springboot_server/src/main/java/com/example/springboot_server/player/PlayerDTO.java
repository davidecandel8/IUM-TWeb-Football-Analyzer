package com.example.springboot_server.player;

import java.time.LocalDate;
import java.time.Period;

/**
 * PlayerDTO class for transferring player information.
 * This class contains fields for player information.
 */
public class PlayerDTO {

    private int player_id;
    private String name;

    private int last_season;
    private String club;
    private String position;
    private String img_url;
    private String sub_position;
    private int age;
    private int height;
    private String foot;
    private String citizenship;
    private String value_date;
    private int highest_market_value;


    /**
     * Constructs a new PlayerDTO with the given parameters.
     *
     * @param player_id the ID of the player
     * @param name the name of the player
     * @param last_season the last season of the player
     * @param club the club of the player
     * @param position the position of the player
     * @param img_url the image URL of the player
     * @param sub_position the sub position of the player
     * @param date_of_birth the date of birth of the player
     * @param height the height of the player
     * @param foot the foot of the player
     * @param citizenship the citizenship of the player
     * @param value_date the date of the value
     * @param highest_market_value the highest market value of the player
     */
    public PlayerDTO(int player_id, String name, int last_season, String club, String position, String img_url, String sub_position, LocalDate date_of_birth, int height, String foot, String citizenship, String value_date, int highest_market_value) {
        this.player_id = player_id;
        this.name = name;
        this.last_season = last_season;
        this.club = club;
        this.position = position;
        this.img_url = img_url;
        this.sub_position = sub_position;
        this.age = Period.between(date_of_birth, LocalDate.now()).getYears();;
        this.height = height;
        this.foot = !foot.isEmpty() ? foot.substring(0, 1).toUpperCase() + foot.substring(1).toLowerCase() : "";
        this.citizenship = citizenship;
        this.value_date = value_date.substring(0, 4);
        this.highest_market_value = highest_market_value;
    }

    // Getters and Setters
    public int getPlayer_id() {
        return player_id;
    }

    public void setPlayer_id(int player_id) {
        this.player_id = player_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getLast_season() {
        return last_season;
    }

    public void setLast_season(int last_season) {
        this.last_season = last_season;
    }

    public String getClub() {
        return club;
    }

    public void setClub(String club) {
        this.club = club;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getValue_date() {
        return value_date;
    }

    public void setValue_date(String value_date) {
        this.value_date = value_date;
    }

    public int getHighest_market_value() {
        return highest_market_value;
    }

    public void setHighest_market_value(int highest_market_value) {
        this.highest_market_value = highest_market_value;
    }

    public String getImg_url() {
        return img_url;
    }

    public void setImg_url(String img_url) {
        this.img_url = img_url;
    }

    public String getSub_position() {
        return sub_position;
    }

    public void setSub_position(String sub_position) {
        this.sub_position = sub_position;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public String getFoot() {
        return foot;
    }

    public void setFoot(String foot) {
        this.foot = foot;
    }

    public String getCitizenship() {
        return citizenship;
    }

    public void setCitizenship(String citizenship) {
        this.citizenship = citizenship;
    }

    /**
     * Returns a string representation of the PlayerDTO.
     *
     * @return a string representation of the PlayerDTO
     */
    @Override
    public String toString() {
        return "PlayerDTO{" +
                "player_id=" + player_id +
                ", name='" + name + '\'' +
                ", club='" + club + '\'' +
                ", position='" + position + '\'' +
                ", img_url='" + img_url + '\'' +
                ", sub_position='" + sub_position + '\'' +
                ", age=" + age +
                ", height=" + height +
                ", foot='" + foot + '\'' +
                ", citizenship='" + citizenship + '\'' +
                ", market_value=" + highest_market_value +
                '}';
    }
}