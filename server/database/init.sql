#user
create table if not exists players
(
    id varchar(36) unicode,
    created_at timestamp null,
    name varchar(64) null unique,
    state varchar(64) not null,
    user_id varchar(64) not null,
    primary key (id),
    foreign key (user_id) references users (id)
);