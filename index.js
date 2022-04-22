require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;
const book = require("./models/book")
const bookController = require("./controllers/controller");
const res = require("express/lib/response");
const methodOverride = require("method-override");
const express = require("express"),
    app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(
    express.urlencoded({
        extended: false,
    })
);
 
app.use(express.json())
mongoose.connect(
	uri,
	{ useUnifiedTopology: true }
);

const db = mongoose.connection;

db.once("open", () => {
	console.log("Successfuly connected!!")
});

app.use(
    methodOverride("_method",{
        methods: ["POST", "GET"]
    })
);

app.get(
    "/home", 
    bookController.getAllBooks,
    (req, res, next) => {
    console.log(req.data);
    res.render("books", {books: req.data});
    }
);



app.get("/books/:number", bookController.getSingleBooks,
(req, res, next) => {
    console.log(req.data);
    res.render("listing",{books: req.data});
}
);

app.get("/books/:_id", bookController.getSingleBookswithid,
(req,res,next) => {
    res.render("listing",{books: req.data});
});


app.get("/addnewbook", bookController.showform);
app.post("/addnewbook", function(req, res, next){
    var newBook = new book({
        name: (req.body.bookName),
        author: (req.body.authorName),
        link: (req.body.amazonLink)
    });
    newBook.save((error, savedDocument) => {
        if (error) console.log(error);
        console.log(savedDocument);
    });
    res.redirect('/home');
})

app.get(
    "/deleteabook", 
    bookController.getAllBooks,
    (req, res, next) => {
    console.log(req.data);
    res.render("deletebooks", {books: req.data});
    }
);

app.delete("/books/:id/delete", bookController.delete, function(req,res,next){
    res.redirect('/home');
})




app.listen(app.get("port"), () => {
    console.log("Server running")
})

