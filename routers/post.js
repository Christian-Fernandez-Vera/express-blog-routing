const express = require('express');
const router = express.Router();

// INDEX: Lettura de la collezione completa del post
// Endpoint: GET /posts
router.get('/', (req, res) => {
  res.send('Lista dei post')
})
























module.exports = router;