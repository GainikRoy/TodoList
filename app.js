const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/TodolistDB");

const itemsSheama = {
    "name": String
}
const Item = mongoose.model('item', itemsSheama);

const item1 = new Item({
    name: 'test of the db'
});

let itemsArray = [item1];

// Item.insertMany(itemsArray, (error)=>{
//     if(error) console.log(error);
//     else console.log('insertion sucessful');
// });

let list = [];

Item.find((err, res) => {
    if (err) console.log(err);
    else {
        res.forEach((i) => {
            list.push(i.name);
        });
        console.log(list);
    }
});


// web stuff beond
app.get("/", (req, res) => {
    res.render('list', { id: "Todo", date: date.getdate(), newListItem: list });
});


app.get("/work", (req, res) => {
    res.render('list', { id: "Work", date: date.getdate(), newListItem: work });
});

app.post("/", (req, res) => {
    if (req.body.newItem != "") {
        list.push(req.body.newItem);
        Item.insertMany([{name: req.body.newItem}], (error) => {
            if (error) console.log(error);
            else console.log('insertion sucessful');
        });
        res.redirect("/");
    }
    else if( req.body.hasOwnProperty("button") && req.body.newItem == "") res.redirect('/');
    if(req.body.hasOwnProperty("reset")){
        list = [];
        Item.deleteMany({}, (err)=>{
            if(err) console.log(err);
            else console.log("all removed");
        });
        res.redirect("/");
    }

});



app.listen("3000", () => {
    console.log("from 3000");
});