package com.example.springboot_server.competition;

/**
 * CompetitionDTO class for transferring Competition data.
 * This class contains fields for Competition data.
 */
public class CompetitionDTO {

    private String competition_id;

    private String competition_name;

    private String sub_type;

    private String type;

    private int country_id;

    private String country_name;

    private String confederation;

    /**
     * Constructs a new CompetitionDTO with the given parameters.
     *
     * @param competition_id the ID of the competition
     * @param competition_name the name of the competition
     * @param sub_type the sub type of the competition
     * @param type the type of the competition
     * @param country_id the ID of the country
     * @param country_name the name of the country
     * @param confederation the confederation of the competition
     */
    public CompetitionDTO(String competition_id, String competition_name, String sub_type, String type, int country_id, String country_name, String confederation) {
        this.competition_id = competition_id;
        this.competition_name = competition_name;
        this.sub_type = sub_type;
        this.type = type;
        this.country_id = country_id;
        this.country_name = country_name;
        this.confederation = confederation;
    }

    /**
     * Constructs a new CompetitionDTO with no parameters.
     */
    public CompetitionDTO() {
    }

    // Getters and Setters
    public String getCompetition_id() {
        return competition_id;
    }

    public void setCompetition_id(String competition_id) {
        this.competition_id = competition_id;
    }

    public String getCompetition_name() {
        return competition_name;
    }

    public void setCompetition_name(String competition_name) {
        this.competition_name = competition_name;
    }

    public String getSub_type() {
        return sub_type;
    }

    public void setSub_type(String sub_type) {
        this.sub_type = sub_type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCountry_id() {
        return country_id;
    }

    public void setCountry_id(int country_id) {
        this.country_id = country_id;
    }

    public String getCountry_name() {
        return country_name;
    }

    public void setCountry_name(String country_name) {
        this.country_name = country_name;
    }

    public String getConfederation() {
        return confederation;
    }

    public void setConfederation(String confederation) {
        this.confederation = confederation;
    }
}
