insert into users (id, email, login, password) values (223, 'test.test@gmail.com', 'Gladias', '$2a$10$RYQkrXX3.oko.DMls.mQzux9Bzf9sZHWirFWqMSCTy5JZh/xBR9X.');

insert into programming_language (id, name, version) values (223, 'python', '3.10.0');
insert into programming_language (id, name, version) values (224, 'java', '15.0.2');
insert into programming_language (id, name, version) values (225, 'c++', '10.2.0');

--insert into test (id, input, output) values (5542, 'ABC', 'DEF');
--insert into test (id, input, output) values (5543, 'ZXC', 'ZXC');
--insert into test (id, input, output) values (5544, '[1, 2, 3]', '[1, 2, 3]');

insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (1, 'Actophilornis africanus', 2, 2, 'Steel', 223);
insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (2, 'Naja haje', 1, 0, 'Brass', 223);
insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (3, 'Varanus sp.', 0, 1, 'Steel', 223);
insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (4, 'Uraeginthus bengalus', 1, 2, 'Wood', 223);
insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (5, 'Phascogale calura', 1, 2, 'Wood', 223);
insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (6, 'Francolinus coqui', 0, 0, 'Plexiglass', 223);
insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (7, 'Phascogale calura', 2, 2, 'Plexiglass', 223);
insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (8, 'Panthera leo', 2, 0, 'Brass', 223);
insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (9, 'Bubalus arnee', 3, 1, 'Vinyl', 223);
insert into challenge (id, description, difficulty_level, solution_status, title, author_id) values (10, 'Proteles cristatus', 3, 0, 'Steel', 223);

insert into tag (id, value) values (1, 'Lists');
insert into tag (id, value) values (2, 'Sorting');
insert into tag (id, value) values (3, 'Arrays');