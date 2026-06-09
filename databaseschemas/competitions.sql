-- Table: public.competitions

-- DROP TABLE IF EXISTS public.competitions;

CREATE TABLE IF NOT EXISTS public.competitions
(
    competition_id text COLLATE pg_catalog."default" NOT NULL,
    competition_code text COLLATE pg_catalog."default",
    name text COLLATE pg_catalog."default",
    sub_type text COLLATE pg_catalog."default",
    type text COLLATE pg_catalog."default",
    country_id integer,
    country_name text COLLATE pg_catalog."default",
    domestic_league_code text COLLATE pg_catalog."default",
    confederation text COLLATE pg_catalog."default",
    url text COLLATE pg_catalog."default",
    CONSTRAINT competitions_pkey PRIMARY KEY (competition_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.competitions
    OWNER to postgres;