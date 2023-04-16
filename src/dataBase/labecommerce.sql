-- Active: 1681672585275@@127.0.0.1@3306

CREATE TABLE users (     
id TEXT PRIMARY KEY UNIQUE NOT NULL,
name TEXT UNIQUE NOT NULL,
 email TEXT UNIQUE NOT NULL,   
 password TEXT NOT NULL,
 created_at TEXT DEFAULT (DATETIME()) NOT NULL
 );


 INSERT INTO users(id,name, email, password)
VALUES ("001", "bruno","bruno@email.com", "01C02"),
("002","joao", "joao@email.com", "0jk00"),
("003","roberto", "roberto@email.com", "asd142");

INSERT INTO users (id,name, email, password)
VALUES ("004","pedro", "pedro@email.com", "01478");

SELECT * FROM users;

--Get All Users
 SELECT * FROM users
 ORDER BY email ASC;


--Get User by id
SELECT * FROM users
WHERE id = "001";

-- Delete User by id
DELETE FROM users
WHERE id = "001";

-- Edit User by id
UPDATE users
SET id = "novoUser"
WHERE id = "002";


-- Criação da tabela de pedidos
CREATE TABLE purchases (
  id TEXT PRIMARY KEY UNIQUE NOT NULL ,
  total_price REAL NOT NULL,
  paid INTEGER NOT NULL DEFAULT 0, -- A coluna paid será utilizada para guardar uma lógica booleana. O SQLite recomenda o uso do número 0 para false e 1 para true. Os pedidos começam com paid valendo 0.
  delivered_at TEXT DEFAULT (DATETIME()) NOT NULL, -- A coluna delivered_at será utilizada para gerenciar a data de entrega do pedido. Ela é opcional, porque sempre começará sem valor ao criar um pedido, ou seja, null.
  buyer_id TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL,
  FOREIGN KEY (buyer_id) REFERENCES users (id)  
);

INSERT INTO purchases (id, total_price,buyer_id)
VALUES ("P01", 299,  "003" ),
("P02", 10,  "001"),
("P03", 20,  "002"),
("P04", 19, "003"),
("P05", 125, "001");

SELECT * FROM purchases;

SELECT * FROM purchases
WHERE buyer_id = "003";

SELECT * FROM purchases;

SELECT * FROM purchases
INNER JOIN users
ON buyer_id = users.id
WHERE users.id = "003";

SELECT * FROM users
INNER JOIN purchases 
ON purchases.buyer_id = users.id;

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "P01";

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "P02";

CREATE TABLE products ( 
id TEXT PRIMARY KEY UNIQUE NOT NULL,
 name TEXT  NOT NULL,   
 price REAL NOT NULL,
 description TEXT NOT NULL,
 category TEXT NOT NULL,
 imageUrl TEXT NOT NULL
 );

INSERT INTO products(id, name, price, description, category, imageUrl)
VALUES ("001", "Vestido Midi Estampado", 149.90, "Descrição do produto aqui", "Clothes", "imagem"),
("002", "Blusa Cropped de Tricô", 79.90, "Descrição do produto aqui", "Clothes", "imagem"),
("003", "Saia Plissada Metalizada", 129.90, "Descrição do produto aqui", "Clothes", "imagem"),
("004", "Tênis Nike Air Max 270", 599.90, "Descrição do produto aqui", "Shoes", "imagem"),
("005", "Bota Coturno de Couro", 399.90, "Descrição do produto aqui", "Shoes", "imagem"),
("006", "Sandália Anabela de Juta", 149.90, "Descrição do produto aqui", "Shoes", "imagem"),
("007", "Brinco de Argola Grande", 59.90, "Descrição do produto aqui", "Accessories", "imagem"),
("008", "Colar de Pérolas", 89.90, "Descrição do produto aqui", "Accessories", "imagem"),
("009", "Óculos de Sol Redondo", 129.90, "Descrição do produto aqui", "Accessories", "imagem");


SELECT * FROM products;

--Get All Products VERSÃO 1
 SELECT * FROM products
 ORDER BY price ASC
 LIMIT 20
 OFFSET 1;

 --Get All Products VERSÃO 2
 SELECT * FROM products
 WHERE price > 90 AND price < 200 
 ORDER BY price ASC;

--Search Product by name
SELECT * FROM products
WHERE name = "Blusa Cropped de Tricô";

--Get Products by id
SELECT * FROM products
WHERE id = "004";

SELECT * FROM products;

-- Delete Product by id
DELETE  FROM products
WHERE id = "001";

-- Edit Product by id
UPDATE products
SET id = "novoProduto"
WHERE id = "002";

CREATE TABLE purchases_products (
  purchase_id  TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (purchase_id) REFERENCES purchases (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);



INSERT INTO purchases_products (purchase_id, product_id, quantity )
VALUES 
("P01", "003", "10"),
("P02", "003", "5"),
("P03", "004", "3"),
("P04", "003", "6"),
("P05", "007", "8"),
("P05", "009", "7");

SELECT * FROM purchases_products;

SELECT * FROM purchases_products
INNER JOIN products ON purchases_products.product_id = products.id
INNER JOIN purchases ON purchases_products.purchase_id = purchases.id;



DROP TABLE purchases_products;

DROP TABLE products;

 DROP TABLE users;
DROP TABLE purchases;
