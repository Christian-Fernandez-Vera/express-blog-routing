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






module.exports = router;
