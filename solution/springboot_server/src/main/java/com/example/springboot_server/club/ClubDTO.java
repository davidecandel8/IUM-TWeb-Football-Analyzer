package com.example.springboot_server.club;

import java.math.BigDecimal;

/**
 * ClubDTO class for transferring Club data.
 * It includes all the properties of a Club.
 */
    public class ClubDTO {

        private int club_id;

        private String name;

        private String domestic_competition_id;

        private String domestic_competition_name;

        private int squad_size;

        private BigDecimal average_age;

        private int foreigners_number;

        private BigDecimal foreigners_percentage;

        private int national_team_players;

        private String stadium_name;

        private int stadium_seats;

        private String net_transfer_record;

        private int last_season;

    /**
     * Constructs a new ClubDTO with the given parameters.
     *
     * @param club_id the ID of the club
     * @param name the name of the club
     * @param domestic_competition_id the ID of the domestic competition of the club
     * @param domestic_competition_name the name of the domestic competition of the club
     * @param squad_size the size of the squad of the club
     * @param average_age the average age of the players in the club
     * @param foreigners_number the number of foreign players in the club
     * @param foreigners_percentage the percentage of foreign players in the club
     * @param national_team_players the number of national team players in the club
     * @param stadium_name the name of the stadium of the club
     * @param stadium_seats the number of seats in the stadium of the club
     * @param net_transfer_record the net transfer record of the club
     * @param last_season the last season of the club
     */
        public ClubDTO(int club_id, String name, String domestic_competition_id, String domestic_competition_name, int squad_size, BigDecimal average_age, int foreigners_number, BigDecimal foreigners_percentage, int national_team_players, String stadium_name, int stadium_seats, String net_transfer_record, int last_season) {
            this.club_id = club_id;
            this.name = name;
            this.domestic_competition_id = domestic_competition_id;
            this.domestic_competition_name = domestic_competition_name;
            this.squad_size = squad_size;
            this.average_age = average_age;
            this.foreigners_number = foreigners_number;
            this.foreigners_percentage = foreigners_percentage;
            this.national_team_players = national_team_players;
            this.stadium_name = stadium_name;
            this.stadium_seats = stadium_seats;
            this.net_transfer_record = net_transfer_record;
            this.last_season = last_season;
        }

    /**
     * Constructs a new ClubDTO with no parameters.
     */
        public ClubDTO() {
        }

     // Getters and Setters
        public int getClub_id() {
            return club_id;
        }

        public void setClub_id(int club_id) {
            this.club_id = club_id;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDomestic_competition_id() {
            return domestic_competition_id;
        }

        public void setDomestic_competition_id(String domestic_competition_id) {
            this.domestic_competition_id = domestic_competition_id;
        }

        public String getDomestic_competition_name() {
            return domestic_competition_name;
        }

        public void setDomestic_competition_name(String domestic_competition_name) {
            this.domestic_competition_name = domestic_competition_name;
        }

        public int getSquad_size() {
            return squad_size;
        }

        public void setSquad_size(int squad_size) {
            this.squad_size = squad_size;
        }

        public BigDecimal getAverage_age() {
            return average_age;
        }

        public void setAverage_age(BigDecimal average_age) {
            this.average_age = average_age;
        }

        public int getForeigners_number() {
            return foreigners_number;
        }

        public void setForeigners_number(int foreigners_number) {
            this.foreigners_number = foreigners_number;
        }

        public BigDecimal getForeigners_percentage() {
            return foreigners_percentage;
        }

        public void setForeigners_percentage(BigDecimal foreigners_percentage) {
            this.foreigners_percentage = foreigners_percentage;
        }

        public int getNational_team_players() {
            return national_team_players;
        }

        public void setNational_team_players(int national_team_players) {
            this.national_team_players = national_team_players;
        }

        public String getStadium_name() {
            return stadium_name;
        }

        public void setStadium_name(String stadium_name) {
            this.stadium_name = stadium_name;
        }

        public int getStadium_seats() {
            return stadium_seats;
        }

        public void setStadium_seats(int stadium_seats) {
            this.stadium_seats = stadium_seats;
        }

        public String getNet_transfer_record() {
            return net_transfer_record;
        }

        public void setNet_transfer_record(String net_transfer_record) {
            this.net_transfer_record = net_transfer_record;
        }

        public int getLast_season() {
            return last_season;
        }

        public void setLast_season(int last_season) {
            this.last_season = last_season;
        }

    /**
     * Returns a string representation of the ClubDTO.
     *
     * @return a string representation of the ClubDTO
     */
        @Override
        public String toString() {
            return "ClubDTO{" +
                    "club_id=" + club_id +
                    ", name='" + name + '\'' +
                    ", domestic_competition_id='" + domestic_competition_id + '\'' +
                    ", domestic_competition_name='" + domestic_competition_name + '\'' +
                    ", squad_size=" + squad_size +
                    ", average_age=" + average_age +
                    ", foreigners_number=" + foreigners_number +
                    ", foreigners_percentage=" + foreigners_percentage +
                    ", national_team_players=" + national_team_players +
                    ", stadium_name='" + stadium_name + '\'' +
                    ", stadium_seats=" + stadium_seats +
                    ", net_transfer_record='" + net_transfer_record + '\'' +
                    ", last_season=" + last_season +
                    '}';
        }
    }
