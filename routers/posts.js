const express = require("express");
const router = express.Router();

//Connessione central alla DB
const connection = require("../data/db");
const { Connection } = require("mysql2");

// MILESTONE 2:
// 1. INDEX: Lettura de la collezione completa del post
// Endpoint: GET /posts
router.get("/", (req, res, next) => {
  // res.send("Lista dei post");

  //A. Prepariamo la SQL pura
  const sql = "SELECT * FROM posts;";
  //B. Inizio nel motore di DB
  connection.query(sql, (err, results) => {
    //Si la DB da errore, iniziamo il errore al middleware global errorsHandler
    if (err) return next(err);

    //Consegna la collezione completa in formato JSON
    return res.json(results);
  });
});

// MILESTON 4 + BONUS
// 2. SHOW: Lettura di un post specifico tramite ID
// Endpoint: GET /posts/:id
router.get("/:id", (req, res, next) => {
  // res.send(`Mostro il post ${req.params.id}`);

  // A. Ricuperiamo l'ID de la URL
  const { id } = req.params;
  //B Prepared Statement (?) per evitare SQL Injections
  const postSQL = "SELECT * FROM posts WHERE id = ?;";

  connection.query(postSQL, [id], (err, postResults) => {
    if (err) return next(err);

    // Se il array è vuoto, l'post no essiste nella DB
    if (postResults.length === 0) {
      return res.status(404).json({
        status: 404,
        error: "Not Found",
        message: `Il post con ID ${id} non esiste.`,
      });
    }

    // Strazione del post
    const post = postResults[0];

    // BONUS: Query Many-to-Many per ottenere i tags del post
    // Uniamo la tabela 'tags' con la tabela pivot 'post_tags'
    const tagsSQL = `
  SELECT tags.*
  FROM tags
  JOIN post_tags ON tags.id = post_tag.tag_id
  WHERE post_tag.post_id = ?;
  `;

    connection.query(tagsSQL, [id], (tagsErr, tagsResults) => {
      if (tagsErr) return next(tagsErr);

      // Uniamo l'array di etichete all'oggetto del post
      // In questo modo
      post.tags = tagsResults;

      // Consegna del post cliente
      return res.json(post);
    });
  });
});

//3. STORE: Creazione di un nuovo post
// Endpoint: POST /posts
router.post("/", (req, res) => {
  res.send("Creazione nuovo post");
});

// 4. UPDATE: Modifica completa di un post esistente
// Endpoint: PUT /posts/:id
router.put("/:id", (req, res) => {
  const postID = req.params.id;
  res.send(`Modifica integrale del post ${postID}`);
});

//5. MODIFY: Modifica parziale del post
//Endpoint: PATCH /posts/:id
router.patch("/:id", (req, res) => {
  const postID = req.params.id;
  res.send(`Modifica parziale del post ${postID}`);
});

// 6. DESTROY: Eliminazione di un post
// Endpoint: DELETE /posts/:id
router.delete("/:id", (req, res) => {
  const postID = req.params.id;
  res.send(`Eliminazione del post ${postID}`);
});

module.exports = router;
