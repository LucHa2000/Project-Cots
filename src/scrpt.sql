use webchat;
#create tables
CREATE TABLE account_types (
	acc_type_id int auto_increment,
	acc_type_desc varchar(15000) character set utf8mb4,
	primary key (acc_type_id)
);
create table accounts (
	username varchar(50) not null,
	acc_password varchar(50) not null,
	email varchar(255),
	first_name varchar(3000) character set utf8mb4,
	last_name varchar(3000) character set utf8mb4,
	birthday date,
	gender int,
	bio varchar(3000) character set utf8mb4,
	job varchar(3000) character set utf8mb4,
	acc_status int,
	acc_type_id int,
	primary key (username),
	foreign key (acc_type_id) references account_types(acc_type_id)	
);

create table notification_types (
	noti_type_id int not null auto_increment,
	noti_type_desc varchar(3000) character set utf8mb4,
	primary key (noti_type_id)
);

create table notifications (
	noti_id int not null auto_increment,
	username varchar(50) not null,
	noti_content varchar(3000) character set utf8mb4,
	noti_date datetime, 
	noti_status int not null,
	noti_type_id int not null,
	primary key (noti_id),
	foreign key (username) references accounts (username),
	foreign key (noti_type_id) references notification_types (noti_type_id)
);


create table posts (
	post_id int not null auto_increment,
	username varchar(50) not null,
	post_date datetime,
	post_content varchar(3000)  character set utf8mb4,
	post_status int not null,
	primary key (post_id),
	foreign key (username) references accounts (username)
);

create table post_comments (
	comment_id int not null auto_increment,
	post_id int not null,
	username varchar(50) not null,
	comment_content varchar(3000) character set utf8mb4,
	comment_date datetime,
	comment_status int not null,
	primary key (comment_id),
	foreign key (post_id) references posts(post_id),
	foreign key (username) references accounts(username)
);

create table post_comment_replies (
	reply_id int not null auto_increment,
	comment_id int not null,
	username varchar(50) not null,
	reply_content varchar(3000) character set utf8mb4,
	reply_date datetime,
	reply_status int,
	primary key (reply_id),
	foreign key (comment_id) references post_comments(comment_id),
	foreign key (username) references accounts(username)
);

create table react_icons (
	icon_id int not null auto_increment,
	icon_desc varchar(3000) character set utf8mb4,
	icon_img varchar(3000) character set utf8mb4,
	icon_status int not null,
	primary key (icon_id)
);

create table post_reacts (
	post_id int not null,
	username varchar(50) not null,
	icon_id int not null,
	constraint PK_post_reacts primary key (post_id, username),
	foreign key (post_id) references posts(post_id),
	foreign key (username) references accounts(username),
	foreign key (icon_id) references react_icons(icon_id)
);
create table followers (
	username varchar(50) not null,
	follower_username varchar(50) not null,
	follow_date datetime,
	foreign key (follower_username) references accounts(username),
	constraint PK_followers primary key (username, follower_username)
);
#insert values into tables
#account_types table
insert into account_types values (1, 'administrator');
insert into account_types values (2, 'user');
select * from accounts
#accounts table
select * from account_types
alter table 
ALTER TABLE accounts
ADD avatar varchar(200);
