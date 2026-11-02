const express = require("express");
const router = express.Router();

// 1. INDEX: Lettura de la collezione completa del post
// Endpoint: GET /posts
router.get("/", (req, res) => {
  res.send("Lista dei post");
});

// 2. SHOW: Lettura di un post specifico tramite ID
// Endpoint: GET /posts/:id
router.get("/:id", (req, res) => {
  res.send(`Mostro il post ${req.params.id}`);
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

module.exports = router;
