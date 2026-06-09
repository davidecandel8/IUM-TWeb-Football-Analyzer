-- Table: public.players

-- DROP TABLE IF EXISTS public.players;

CREATE TABLE IF NOT EXISTS public.players
(
    player_id integer NOT NULL,
    first_name text COLLATE pg_catalog."default",
    last_name text COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default",
    last_season integer,
    current_club_id integer,
    player_code text COLLATE pg_catalog."default",
    country_of_birth text COLLATE pg_catalog."default",
    city_of_birth text COLLATE pg_catalog."default",
    country_of_citizenship text COLLATE pg_catalog."default",
    date_of_birth date,
    sub_position text COLLATE pg_catalog."default",
    "position" text COLLATE pg_catalog."default",
    foot text COLLATE pg_catalog."default",
    height_in_cm integer,
    market_value_in_eur integer,
    highest_market_value_in_eur integer,
    contract_expiration_date date,
    agent_name text COLLATE pg_catalog."default",
    image_url text COLLATE pg_catalog."default",
    url text COLLATE pg_catalog."default",
    current_club_domestic_competition_id text COLLATE pg_catalog."default",
    current_club_name text COLLATE pg_catalog."default",
    CONSTRAINT players_pkey PRIMARY KEY (player_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.players
    OWNER to postgres;