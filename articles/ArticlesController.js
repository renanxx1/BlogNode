const express = require("express");
const router = express.Router();


router.get("/articles", (req, res) => {
    res.send("<h1> Pagina de Artigos </h1>");
});

module.exports = router;
