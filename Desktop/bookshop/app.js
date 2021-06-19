// Require and use express
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const multer = require('multer')

// Require nd use mongoose
const mongoose = require("mongoose");
let Books = require("./models/book");
mongoose.connect("mongodb://localhost:27017/bookStore", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(results => console.log("Connected to database"))
    .catch(err => console.log("Error on connection route", err));

    // Require and use ejs templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


// view all books in the data base 
app.get("/books", async (req, res) => {
    const books = await Books.find({})
    res.render("books/index", { books })
});
// view details of a single books
app.get("/books/:id", async (req, res) => {
    const { id } = req.params;
    const book = await Books.findById(id)
    res.render("books/show", { book })
});

// add car route 
app.get("/addBook", (req, res) => {
    res.render("books/addBook")
});

//  image path
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/images')
    },
    filename: function (re, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: { fieldSize: 1024 * 1024 * 3 }
})

app.post("/addBook", upload.single('image'),  async (req, res) => {
    const book = new Books({
        title: req.body.title,
        author: req.body.author,
        description : req.body.description,
        category: req.body.category,
        tags: req.body.tags,
        image: req.file.filename
    });

    book.save()
    .then(results => res.redirect("/books"))
});

// get edit route route 
app.get("/books/:id/edit", (req, res) => {
    const { id } = req.params;
    Books.findById(id)
    .then(results => res.render("books/edit", { book: results }))
})

app.put("/books/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const {tags, purchaseCount } = req.body;
    const book = await Books.findByIdAndUpdate(id, { 
        
        "tags": tags,
         "purchaseCount": purchaseCount,
         image: req.file.filename
        })
        .then(results => res.redirect("/books"))
});

// delete car route 
app.delete("/books/:id", (req, res) => {
    const { id } = req.params;
    Books.findByIdAndDelete(id)
        .then(results => res.redirect("/books", {results}))
})




app.get('*', (req,res)=>{
    res.send('This is invalid page!')
})

app.listen(8000, ( )=> {
console.log('Listening to port 8000')
})