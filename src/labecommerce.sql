-- Active: 1680533489062@@127.0.0.1@3306



CREATE Table users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
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
ORDER BY price ASC;



drop TABLE purchases;
--cria tabela purchases
CREATE Table purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  total_price REAL NOT NULL,
  paid  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT DEFAULT (DATETIME()) NOT NULL,
  buyer_id TEXT NOT NULL,
  FOREIGN KEY (buyer_id) REFERENCES users(id)
  );


INSERT INTO purchases(id, total_price, buyer_id)
VALUES
("p001", 215, "01"),
("p002", 101, "03"),
("p003", 87,  "01"),
("p004", 41,  "03"),
("p005", 125, "04"),
("p006", 75,  "02"),
("p007", 65,  "04"),
("p008", 33,  "02");



--Simule que o pedido foi entregue no exato momento da sua edição (ou seja, data atual).
UPDATE purchases 
   SET created_at = (DATETIME("now"))
 WHERE id IN ("p001");

--mostra os dados das duas tabelas
SELECT * FROM users
INNER JOIN purchases
ON purchases.buyer_id = users.id
WHERE buyer_id ="01";


--Criação da tabela de relações
CREATE TABLE purchases_products (
  purchase_id  TEXT NOT NULL,
  product_id  TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id)
  FOREIGN KEY (product_id) REFERENCES products(id)
);


--Popule sua tabela purchases_products simulando 3 compras de clientes.
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
("p001","a003", 2),
("p002","a001", 5),
("p003","a004", 4);

--Mostre em uma query todas as colunas das tabelas relacionadas (purchases_products, purchases e products).
SELECT * FROM purchases_products
INNER JOIN products ON purchases_products.product_id = products.id
INNER JOIN purchases ON purchases_products.purchase_id=purchases.id;


DROP TABLE purchases_products;

SELECT * FROM purchases
