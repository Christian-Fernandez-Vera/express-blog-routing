const mysql = require("mysql2");

//Configurazione credenziali di accesso al db
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_NAME || "blog_db",
});

//Iniziamo il processo di connessione al DB
connection.connect((err) => {
  if (err) {
    console.error(
      "[DATABASE ERROR]: Errore al connetersi al mysql:",
      err.message,
    );
    throw err;
  }
  console.log("-> Connessione riuscita alla Database di MySQL!");
});

module.exports = connection;
