
const express = require("express");
const app = express();
const PORT = 3000;

// global Middleware

// per gestire il body JSON
app.use(express.json());

// immagini statiche
app.use(express.static("public"));


// Importa il router da posts.js
const postsRouter = require("./router/posts.js");

// Importa da middlewares
const checkTime = require("./middlewares/checkTime.js");

// Importa da middlewares
const errorsHandler = require("./middlewares/errorsHandler.js");

// Rotte api
app.use("/posts", postsRouter);

//rotta fallback
// app.all("*", (req, res) => {
//   res.status(404).json({ error: "404", message: "Not Found !" });
// });



// gestione degli errori (deve essere sempre la penultima)
app.use(errorsHandler);

// In ascolto sulla porta 3000
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});