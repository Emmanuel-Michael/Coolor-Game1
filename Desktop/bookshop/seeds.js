// Require and use mongoose 
const mongoose = require("mongoose");

// Require and use car module
const Car = require("./models/car");
//  Require and use mongoose
mongoose.connect("mongodb://localhost:27017/carShop", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(results => console.log("Connected to database"))
    .catch(err => console.log("Error on connection route", err));

const p = new Car({
    name: "Prado",
    price: 12000000,
    category: "suv"
});
p.save().then(data => console.log(data)).catch(err => console.log(err))