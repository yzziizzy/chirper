



create table if not exists emails (
	id bigint auto_increment primary key,
	email varchar(128) not null,
	user_id bigint default null,
	
	is_spammer bool not null default false,
	is_banned bool not null default false,
	
	banned_at datetime default NULL,
	ban_reason varchar(2048) default NULL,
	
	unique(email)
);



create table if not exists users (
	id bigint auto_increment primary key,
	user_hash varchar(128) not null,
	display_name varchar(32) not null,
	chirp_count int not null default 0,
	primary_email varchar(128) not null,
	joined_at datetime not null default now(),
	
	permissions varchar(1024) not null default '',
	
	pwd_hash varchar(256) not null,
	pwd_salt varchar(256) not null,
	
	is_banned bool not null default false,
	reset_token varchar(32) default NULL,
	
	unique (display_name)
);



create table if not exists ignores (
	ignoror bigint not null,
	ignoree bigint not null,
	primary key (ignoror, ignoree)
);




create table if not exists chirps (
	id bigint auto_increment primary key,
	created_by bigint not null,
	created_at datetime not null default now(),
	content varchar(256) not null,
	reply_of bigint default null
);


