import {
  users,
  products,
  purchase,
  createUser,
  getProductById,
  getAllUsers,
  getAllProducts,
  queryProductsByName,
  createPurchase,
  getAllPurchasesFromUserId,
} from "./database";
import { TUser, TProduct, TPurchase, SHOP } from "./types";

import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.listen(3004, () => {
  console.log("servidor rodando na porta 3004");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/user", (req: Request, res: Response) => {
  res.status(200).send(users);
});
app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products);
});

app.get("/purchase", (req: Request, res: Response) => {
  res.status(200).send(purchase);
});

app.get("/products/search", (req: Request, res: Response) => {
  const q = req.query.q as string;
  const result = products.filter((produtos) => {
    return produtos.name.toLowerCase().includes(q.toString().toLowerCase());
  });

  res.status(200).send(result);
});

app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id;
  const email = req.body.email;
  const password = req.body.password;
  const newUser: TUser = { id, email, password };
  users.push(newUser);
  res.status(201).send("Usuário cadastrado com sucesso.");
});

app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const newProduct: TProduct = { id, name, price, category };
  products.push(newProduct);
  res.status(201).send("Produto cadastrado com sucesso.");
});

app.post("/purchase", (req: Request, res: Response) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  const quantity = req.body.quantity;
  const totalPrice = req.body.totalPrice;
  const newPurchase: TPurchase = { userId, productId, quantity, totalPrice };
  purchase.push(newPurchase);
  res.status(201).send("Compra realitada com sucesso.");
});

//Get Products by id
app.get("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const result = products.find((product) => {
    return product.id === id;
  });
  res.status(200).send(result);
});

//Get Pruchases by id
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  const id = req.params.id;
  const result = purchase.find((usersPurchase) => {
    return usersPurchase.userId === id;
  });
  res.status(200).send(result);
});

//Delete users by id

app.delete("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  //procurar o elemento e tira-lo do array
  const indexAccountToDelete = users.findIndex((user) => user.id === id);
  users.splice(indexAccountToDelete, 1);
  res.status(200).send("User apagado com sucesso");
});

//Delete products by id

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  //procurar o elemento e tira-lo do array
  const indexAccountToDelete = products.findIndex(
    (product) => product.id === id
  );
  products.splice(indexAccountToDelete, 1);
  res.status(200).send("Produto apagado com sucesso");
});

//PUT EditarUser by id
app.put("/users/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  //edicao de um elemento do array de accounts
  const newEmail = req.body.email as string | undefined;
  const newPassword = req.body.password as number | undefined;

  const accountToEdit = users.find((user) => user.id === id);

  if (accountToEdit) {
    accountToEdit.email = newEmail || accountToEdit.email;
    accountToEdit.password = newPassword || accountToEdit.password;
  }

  res.status(200).send("Cadastro atualizado com sucesso");
});

//PUT EditarProducts by id
app.put("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  //edicao de um elemento do array de accounts
  const newName = req.body.name as string | undefined;
  const newPrice = req.body.price as number | undefined;
  const newCategory = req.body.category as SHOP | undefined;

  const accountToEdit = products.find((product) => product.id === id);

  if (accountToEdit) {
    accountToEdit.name = newName || accountToEdit.name;
    accountToEdit.price = newPrice || accountToEdit.price;
    accountToEdit.category = newCategory || accountToEdit.category;
  }

  res.status(200).send("Cadastro atualizado com sucesso");
});

// console.log("Usuários");
// console.log(users);
// console.log("Produtos");
// console.log(products);
// console.log("Purchase");
// console.log(purchase);
// createUser("u003", "beltrano@email.com", 12345);
// createUser("uiuiu", "uiuu@email.com", 12345);
// createUser("novouser", "ciclano@email.com", 99)
// console.log("users");
// getAllUsers();
// console.log("products");
// getAllProducts();
// getProductById(10);
// queryProductsByName("scarpin");
// createPurchase("mizinha", 10, 2, 100);
// getAllPurchasesFromUserId("mizinha");
