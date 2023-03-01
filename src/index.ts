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

//GetAllUsers
app.get("/user", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//GetAllProducts
app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//GetAllPurchase
app.get("/purchase", (req: Request, res: Response) => {
  try {
    res.status(200).send(purchase);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//GetProductsByName
app.get("/products/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    const result = products.filter((produtos) => {
      return produtos.name.toLowerCase().includes(q.toString().toLowerCase());
    });

    if (q.length === 0) {
      res.status(404);
      //muda o status do erro
      throw new Error("Produto não encontrado. Digite pelo menos 1 caracter");
    }

    res.status(200).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Create newUser
app.post("/users", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const newUser: TUser = { id, email, password };
    const resultId = users.find((user) => user.id === id);
    const resultEmail = users.find((user) => user.email === email);

    if (resultId) {
      res.status(404);
      //muda o status do erro
      throw new Error("Id já cadastrado. Digite outro 'id'");
    }
    if (resultEmail) {
      res.status(404);
      //muda o status do erro
      throw new Error("Email já cadastrado. Digite outro Email");
    }
    users.push(newUser);

    res.status(201).send("Usuário cadastrado com sucesso.");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//CreateProduct
app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const newProduct: TProduct = { id, name, price, category };
    const resultId = products.find((product) => product.id === id);
    products.push(newProduct);

    if (resultId) {
      res.status(404);
      //muda o status do erro
      throw new Error("Id já cadastrado. Digite outro 'id'");
    }

    res.status(201).send("Produto cadastrado com sucesso.");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/purchase", (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const totalPrice = req.body.totalPrice;
    const newPurchase: TPurchase = { userId, productId, quantity, totalPrice };
    const findUser = users.find((user) => user.id === userId);
    const findProduct = products.find((product) => product.id === productId);

    if (!findUser) {
      res.status(404);
      //muda o status do erro
      throw new Error(
        "Usuário não cadastrado. Digite um usuário cadastrado ou crie um novo"
      );
    }

    if (!findProduct) {
      res.status(404);
      //muda o status do erro
      throw new Error(
        "Produto não cadastrado. Digite o id de um produto cadastrado"
      );
    }

    purchase.push(newPurchase);
    res.status(201).send("Compra realitada com sucesso.");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Get Products by id
app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = products.find((product) => product.id === id);

    if (id.length === 3) {
      res.status(404);
      throw new Error("o usuário tem no mímino 1 caracter");
    }
    console.log(result);
    // if (typeof id !== "string" || typeof id === undefined) {
    //   res.status(404);
    //   throw new Error("'Nome' deve ser do tipo string");
    // }
    if (!result) {
      res.status(400);
      throw new Error("'usuario não encontrado'");
    }
    if (id[0] !== "a") {
      res.status(400);
      throw new Error("'id' inválido. Deve iniciar com a letra 'a'");
    }

    res.status(200).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Get Pruchases by id
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = purchase.find(
      (usersPurchase) => usersPurchase.userId === id
    );

    if (!result) {
      res.status(400);
      throw new Error("'Nenhuma compra não encontrado'");
    }

    res.status(200).send(result);
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Delete users by id

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    //procurar o elemento e tira-lo do array
    const indexAccountToDelete = users.findIndex((user) => user.id === id);
    if (indexAccountToDelete) {
      res.status(400);
      throw new Error("'Nenhum usuario encontrado'");
    }
    users.splice(indexAccountToDelete, 1);
    console.log(indexAccountToDelete);

    res.status(200).send("User apagado com sucesso");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Delete products by id

app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    //procurar o elemento e tira-lo do array
    const indexProductsToDelete = products.findIndex(
      (product) => product.id === id
    );
    if (indexProductsToDelete) {
      res.status(400);
      throw new Error("'Nenhum produto encontrado'");
    }
    products.splice(indexProductsToDelete, 1);
    res.status(200).send("Produto apagado com sucesso");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//PUT EditarUser by id
app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as number | undefined;

    const accountToEdit = users.find((user) => user.id === id);
    if (!accountToEdit) {
      res.status(400);
      throw new Error("'Nenhum usuario encontrado para editar'");
    }
    if (accountToEdit) {
      accountToEdit.email = newEmail || accountToEdit.email;
      accountToEdit.password = newPassword || accountToEdit.password;
    }
    if (newEmail !== undefined) {
      if (typeof newEmail !== "string") {
        res.status(400);
        throw new Error("Email invalido, deve ser em formato de string.");
      }
    }
    if (newPassword !== undefined) {
      if (typeof newPassword !== "number") {
        res.status(400);
        throw new Error("Passwond invalido, deve ser em formato de number.");
      }
    }
    res.status(200).send("Cadastro atualizado com sucesso");
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//PUT EditarProducts by id
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    //edicao de um elemento do array de accounts
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as SHOP;
    const productsToEdit = products.find((product) => product.id === id);

    if (newCategory !== undefined) {
      if (!Object.values(SHOP).includes(newCategory)) {
        res.status(400);
        res.send("Categoria do produto incorreto. Deve ser uma string-SHOP");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("nome invalido, deve ser em formato de string.");
      }

      if (newPrice !== undefined) {
        if (typeof newPrice !== "number") {
          res.status(400);
          throw new Error("preço invalido, deve ser em formato de number.");
        }

        if (!productsToEdit) {
          res.status(400);
          throw new Error("'Nenhum produto encontrado para editar'");
        }

        if (productsToEdit) {
          productsToEdit.name = newName || productsToEdit.name;
          productsToEdit.price = newPrice || productsToEdit.price;
          productsToEdit.category = newCategory || productsToEdit.category;
        }

        res.status(200).send("Cadastro atualizado com sucesso");
      }
    }
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
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
