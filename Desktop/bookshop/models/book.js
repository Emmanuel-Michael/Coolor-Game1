// Require and use the mogoose 
const mongoose = require('mongoose');

// Creating the car schema
const bookSchema = new mongoose.Schema({
title: String,
author: String,
description: String,
purchaseCount: Number,
category: String,
tags: Array,
image: String
})
const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
