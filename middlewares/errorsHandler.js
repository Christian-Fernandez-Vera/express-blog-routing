function errorsHandler(err, req, res, next) {
  console.error("[SERVER ERROR]:", err.stack);

  res.status(500).json({
    status: 500,
    error: "Internal Server Error",
    message: err.message || "Errore inaspetato dal server",
  });
}

module.exports = errorHandler;
