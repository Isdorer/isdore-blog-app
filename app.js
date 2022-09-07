const express = require("express")
const mongoose = require("mongoose")
const articleRouter = require("./routes/articles")
const Article = require ("./models/article")
const methodOverride = require("method-override")
const app = express()

mongoose.connect("mongodb://localhost:/blog")

app.use(
  require("express-session")({
    secret: "this is the best blog page ever",
    resave: false,
    saveUninitialized: false,
  })
);


app.set("view engine", "ejs")


app.use(express.urlencoded({ extended: false}))
app.use(methodOverride("_method"))

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({
      createdAt: "desc"
    })
    res.render("articles/index", {articles: articles})
})


app.use("/articles",  articleRouter )

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () => {
 console.log("server has started")
})
