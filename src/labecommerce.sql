-- Active: 1680533489062@@127.0.0.1@3306



CREATE Table users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT
  );


DROP TABLE users;


INSERT INTO users(
  id, email, password)
   VALUES("01", "pedro.souza@gmail.com", "mlkajd24!");


INSERT INTO users(
  id, email, password)
   VALUES("02", "joao.souza@gmail.com", "fdgfgf!");
   
INSERT INTO users(
  id, email, password)
   VALUES("03", "italo.souza@gmail.com", "fdhjgb!");

   INSERT INTO users(
  id, email, password)
   VALUES("04", "ronaldo.souza@gmail.com", "kjujkuk!");

SELECT * FROM users;


CREATE Table products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL
  );


INSERT INTO products(
  id, name, price, category)
   VALUES("a001", "calça", 10.90, "Chothes");

   
INSERT INTO products(
  id, name, price, category)
   VALUES("a002", "bermuda", 19.90, "Chothes");

   
INSERT INTO products(
  id, name, price, category)
   VALUES("a003", "tenis", 30.90, "Shoes");

   
INSERT INTO products(
  id, name, price, category)
   VALUES("a004", "havainas", 8.90, "Shoes");

   
INSERT INTO products(
  id, name, price, category)
   VALUES("a005", "meias", 5.90, "Chothes");

   SELECT * FROM products;

   SELECT * FROM users;

--crie um termo de busca, por exemplo "monitor"
--retorna o resultado baseado no termo de busca


SELECT name FROM products
WHERE name LIKE "%tenis";


INSERT INTO users
   VALUES("05", "rafael.souza@gmail.com", "fdfdfh55!");


INSERT INTO products
   VALUES("a006", "calça-curta", 10.90, "Chothes");


--busca de produtos por id
SELECT id FROM products
