-- Active: 1680533489062@@127.0.0.1@3306



CREATE Table users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT
  );


DROP TABLE users;


INSERT INTO users(
  id, email, password)
   VALUES
   ("01", "pedro.souza@gmail.com", "mlkajd24!"),
   ("02", "joao.souza@gmail.com", "fdgfgf!"),
   ("03", "italo.souza@gmail.com", "fdhjgb!"),
   ("04", "ronaldo.souza@gmail.com", "kjujkuk!");


  

CREATE Table products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  category TEXT NOT NULL
  );


INSERT INTO products(
  id, name, price, category)
   VALUES("a001", "calça", 10.90, "Chothes"),
   ("a002", "bermuda", 19.90, "Chothes"),
   ("a003", "tenis", 30.90, "Shoes"),
  ("a004", "havainas", 8.90, "Shoes"),
    ("a005", "meias", 5.90, "Chothes");


   SELECT * FROM products;

   SELECT * FROM users;

--crie um termo de busca, por exemplo "monitor"
--retorna o resultado baseado no termo de busca


SELECT name FROM products
WHERE name LIKE "%tenis";


--crie um novo usuário
--insere o item mockado na tabela users

INSERT INTO users 
   VALUES("05", "rafa.souza@gmail.com", "criririci!");

--crie um novo produto
--insere o item mockado na tabela products
INSERT INTO products
   VALUES("a006", "calça-curta", 10.90, "Chothes");


--busca de produtos por id
SELECT id FROM products;

--busca de produtos por id
SELECT * FROM products
WHERE id LIKE "%002";

--deletar de user por id
DELETE FROM users  
WHERE ID = ("05");

--deleção de produto por id

DELETE FROM products  
WHERE ID = ("a005");

--edição de user por id



SELECT * FROM users;

SELECT * FROM products;


DROP Table users;

--editar produto por id
UPDATE products 
   SET name = 'gravata'
 WHERE id IN ("a003");

 --retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;


--retorna o resultado ordenado pela coluna price em ordem crescente
--limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY price ASC
LIMIT 20 OFFSET 2;


--seleção de um intervalo de preços, por exemplo entre 100.00 e 300.00
--retorna os produtos com preços dentro do intervalo definido em ordem crescente
SELECT * FROM products
WHERE "price" > 10 AND  "price" <20
ORDER BY price ASC
