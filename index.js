const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const articleModel = require("./articles/Article");
const categoryModel = require("./categories/CategoriesController");


//view engine
app.set('view engine', 'ejs');

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
connection.authenticate().then(() => {
    console.log("conexao com banco com sucesso.");
}).catch((error) => {
    console.log(error)
});

app.use("/", categoriesController);
app.use("/", articlesController);

app.get('/', (req, res)=>{
    res.send("<h1>ROTA PRINCIPAL</h1>")
})

app.listen(8081, () => {
    console.log("Servidor rodando!");
})