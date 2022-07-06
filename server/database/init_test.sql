create table test_simple_query
(
    id int unsigned not null,
    text varchar(32) null,
    primary key (id)
);

insert into test_simple_query (id, text) value (100, 'Hello, World!');