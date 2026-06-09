-- Table: public.player_valuations

-- DROP TABLE IF EXISTS public.player_valuations;

CREATE TABLE IF NOT EXISTS public.player_valuations
(
    player_id integer,
    last_season integer,
    datetime text COLLATE pg_catalog."default",
    date text COLLATE pg_catalog."default",
    dateweek text COLLATE pg_catalog."default",
    market_value_in_eur integer,
    n integer,
    current_club_id integer,
    player_club_domestic_competition_id text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.player_valuations
    OWNER to postgres;