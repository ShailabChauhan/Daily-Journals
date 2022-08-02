//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Find here the most relevant, verified and impartial news updates from around the world which have a direct impact on your life. From economics to geopolitics get all your news here.";
const homeStartingContent1 = "In the era of globalisation, being informed means being empowered."
const aboutContent = "This is an initiative by SHAILAB to help people access information which is relevant to them, information which is impartial and information which is verified. We firmly believe access to impartial news is an universal human right as news plays an important role in empowering citizens.";
const contactContent = "For any query: write your mails at “shailabchauhan1@gmail.com”.";
const contactContent1 = "Follow our twitter handle “shailabchauhan” for latest updates."
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,startingContent1: homeStartingContent1,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent,contactContent1: contactContent1});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
