-- Table: public.clubs

-- DROP TABLE IF EXISTS public.clubs;

CREATE TABLE IF NOT EXISTS public.clubs
(
    club_id integer NOT NULL,
    club_code text COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default",
    domestic_competition_id text COLLATE pg_catalog."default",
    total_market_value integer,
    squad_size integer,
    average_age numeric(5,1),
    foreigners_number integer,
    foreigners_percentage numeric(5,1),
    national_team_players integer,
    stadium_name text COLLATE pg_catalog."default",
    stadium_seats integer,
    net_transfer_record text COLLATE pg_catalog."default",
    coach_name text COLLATE pg_catalog."default",
    last_season integer,
    url text COLLATE pg_catalog."default",
    CONSTRAINT clubs_pkey PRIMARY KEY (club_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.clubs
    OWNER to postgres;