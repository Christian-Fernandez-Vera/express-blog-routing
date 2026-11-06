// importazioni del Framework Express
const express = require("express");
const postRouter = require("./routers/posts");

// importazioni del middleware
const errorsHandler = require("./middlewares/errorsHandler");
const notFound = require("./middlewares/notFound");

const app = express();
const port = 3000;

//1. Configurazione di activ static public
app.use(express.static("public"));
app.use(express.json()); // Middleware per permettere il parsing di JSON

//2. Rutta radice basic per comprovare il server
app.get("/", (req, res) => {
  res.send("Server del mio Blog");
});

//3. Rutta per testare la cattura dell'errore 500
app.get("/test-error", (req, res, next) => {
  loremIpsumVariableIsUndefined();
});

//4. Registro delle rutte sotto il prefisso '/post'
app.use("/posts", postRouter);

// -------------------------------------------------------------
// Middlewares a valle (post-processing e controllo de errori)
// -------------------------------------------------------------

//5. Middleware 404: Se attiva se nessuna rotta ha risposto prima
app.use(notFound);

//6. Middleware 500: Se attiva se qualunque rutta ha fatto un errore sincrono o chiama a next(err)
app.use(errorsHandler);

// 7. Avvio del server
app.listen(port, () => {
  console.log(
    `Il server è attivo e ascolta sulla porta http://localhost:${port}`,
  );
});
