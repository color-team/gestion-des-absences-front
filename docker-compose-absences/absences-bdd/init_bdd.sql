-- public.collegue definition

-- Drop table

-- DROP TABLE public.collegue;

CREATE TABLE public.collegue (
	id bigserial NOT NULL,
	email varchar(255) NULL,
	mot_de_passe varchar(255) NULL,
	nom varchar(255) NULL,
	prenom varchar(255) NULL,
	CONSTRAINT collegue_pkey null
);

INSERT INTO public.collegue
(id, email, mot_de_passe, nom, prenom)
VALUES(1, 'admin@dev.fr', '$2a$10$p87tMJ8Xm96c03asruV2oOzze/N9sgRIHDSw3kvYpUnUkHQvZ6ASS', 'Admin', 'DEV');
INSERT INTO public.collegue
(id, email, mot_de_passe, nom, prenom)
VALUES(2, 'user@dev.fr', '$2a$10$wgBtI6cYi6JJdtkY8YCh.eaElYXo8WuB8W8.motz3oGImFyRy2zN.', 'User', 'DEV');

-- public.role_collegue definition

-- Drop table

-- DROP TABLE public.role_collegue;

CREATE TABLE public.role_collegue (
	id bigserial NOT NULL,
	"role" varchar(255) NULL,
	collegue_id int8 NULL,
	CONSTRAINT role_collegue_pkey null,
	CONSTRAINT fkf88v41ucmixm011x6bustd7hm NULL
	
INSERT INTO public.role_collegue
(id, "role", collegue_id)
VALUES(1, 'ROLE_ADMINISTRATEUR', 1);
INSERT INTO public.role_collegue
(id, "role", collegue_id)
VALUES(2, 'ROLE_UTILISATEUR', 1);
INSERT INTO public.role_collegue
(id, "role", collegue_id)
VALUES(3, 'ROLE_UTILISATEUR', 2);

);