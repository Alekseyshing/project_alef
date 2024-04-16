-- Создание таблицы пользователей
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  full_name varchar(255) NOT NULL,
  age integer NOT NULL
);

-- Создание таблицы детей
CREATE TABLE children(
  child_id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(user_id) ON DELETE CASCADE,
  full_name varchar(255) NOT NULL,
  age integer
);

-- Пример запроса на добавление пользователя
INSERT INTO users (full_name, age) VALUES ('Иван Иванов', 30);

-- Пример запроса на добавление ребенка
INSERT INTO children (user_id, full_name, age) VALUES (1, 'Мария Иванова', 5);

-- Пример запроса на обновление ФИО пользователя
UPDATE users SET full_name = 'Петр Петров' WHERE user_id = 1;

-- Пример запроса на удаление ребенка
DELETE FROM children WHERE child_id = 1;

-- Пример запроса на получение информации о пользователе и его детях
SELECT users.full_name, users.age, children.full_name AS child_name, children.age AS child_age
FROM users
LEFT JOIN children ON users.user_id = children.user_id
WHERE users.user_id = 1;
