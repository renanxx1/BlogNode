const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UserController");
const session = require("express-session");

const User = require("./users/User");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

//view engine
app.set('view engine', 'ejs');

//Sessions
app.use(session({
    secret: "sessionsecret",
    cookie: { maxAge: 3000000 }
}))

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

app.get("/session", (req, res) => {

})

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get('/', (req, res) => {
    Article.findAll({
        order: [['id', 'DESC']],
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', { articles: articles, categories: categories })
        })
    });
});

app.get('/:slug', (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render('article', { article: article, categories: categories })
            })
        } else {
            res.redirect("/")
        }
    }).catch(erro => {
        res.redirect('/')
    })
})


app.get('/category/:slug', (req, res) => {
    var slug = req.params.slug;

    Category.findOne({
        where: { slug: slug },
        include: { model: Article },
        order: [[Article, 'id', 'DESC']]

    }).then(category => {
        if (category != undefined) {

            Category.findAll({
            }).then(categories => {
                res.render("index", { articles: category.articles, categories: categories })
            });
        } else {
            res.redirect("/")
        }
    }).catch(erro => {
        res.redirect("/")
    })
})








app.listen(3000, () => {
    console.log("Servidor rodando!");
})