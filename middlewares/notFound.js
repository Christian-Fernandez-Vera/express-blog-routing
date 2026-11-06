function notFound(req, res, next) {
  res.status(404).json({
    status: 404,
    error: "Not Found",
    message: `La rutta ${req.method} non esiste in questo server`,
  });
}

module.exports = notFound;
