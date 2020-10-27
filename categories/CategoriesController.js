const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
    res.send("<h1>Rota de categoria</h1>");
});

module.exports = router;