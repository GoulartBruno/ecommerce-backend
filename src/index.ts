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
import { TUser, TProduct, TPurchase } from "./types";

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
