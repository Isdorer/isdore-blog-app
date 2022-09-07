const express = require("express")
const http = require("http");
const mongoose = require("mongoose")
const articleRouter = require("./routes/articles")
const Article = require ("./models/article")
const methodOverride = require("method-override")
const app = express()

const DotEnv = require("dotenv").config();


const url = process.env.DATABASEURL || "mongodb://localhost:/blog"
mongoose.connect(url)



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
