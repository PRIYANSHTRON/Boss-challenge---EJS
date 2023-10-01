const express = require('express')
const app = express()
const ejs = require('ejs')
const lodash = require('lodash')
app.set("view engine", "ejs")


const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
const posts = []


const home = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima similique velit quia laboriosam eos illo perferendis rerum iure, praesentium, consectetur obcaecati sapiente quo ducimus alias recusandae aliquam! Doloremque amet reiciendis saepe nulla quisquam maxime iste sit nihil, aliquid id autem fuga error officia provident, consequuntur rem laborum excepturi facilis consectetur!"

const homeContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima similique velit quia laboriosam eos illo perferendis rerum iure, praesentium, consectetur obcaecati sapiente quo ducimus alias recusandae aliquam! Doloremque amet reiciendis saepe nulla quisquam maxime iste sit nihil, aliquid id autem fuga error officia provident, consequuntur rem laborum excepturi facilis consectetur!"

const aboutContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima similique velit quia laboriosam eos illo perferendis rerum iure, praesentium, consectetur obcaecati sapiente quo ducimus alias recusandae aliquam! Doloremque amet reiciendis saepe nulla quisquam maxime iste sit nihil, aliquid id autem fuga error officia provident, consequuntur rem laborum excepturi facilis consectetur!"

const contactContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima similique velit quia laboriosam eos illo perferendis rerum iure, praesentium, consectetur obcaecati sapiente quo ducimus alias recusandae aliquam! Doloremque amet reiciendis saepe nulla quisquam maxime iste sit nihil, aliquid id autem fuga error officia provident, consequuntur rem laborum excepturi facilis consectetur!"



app.get("/", (req, res) => {
    const PageTitle = "Home"
    res.render("home", { title: PageTitle, postCollection: posts})
})

app.get("/about", (req, res) => {
    const PageTitle = "About"
    res.render("about", { content: aboutContent, title: PageTitle })
})

app.get("/contact", (req, res) => {
    const PageTitle = "Contact"
    res.render("contact", { content: contactContent, title: PageTitle })
})

app.get("/compose", (req, res) => {
    const PageTitle = "Compose"
    res.render("compose", { title: PageTitle })
})

app.post("/compose", (req, res) => {

    const post = {
        newTitle: req.body.postTitle,
        newContent: req.body.postContent
    }

    posts.push(post)
    console.log(posts.length);
    console.log(post.newTitle)
    res.redirect("/")
})


app.get("/post/:param", (req, res) => {

    const search_param = lodash.lowerCase(req.params.param)
    console.log("SEARCH PARA : "+search_param)

    posts.forEach(function (post) {
        const storedTitle = lodash.lowerCase(post.newTitle)
        if (storedTitle === search_param) {
            // console.log("STORED TITLE : "+storedTitle)
            // console.log("Match Found !")
            res.render("post",{post : post,param:search_param})  
        }
        })

})







app.listen(3000)