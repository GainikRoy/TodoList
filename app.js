const express = require("express");
const bodyparser = require("body-parser");
const date = require(__dirname + "/date.js")
const mongoose = require("mongoose");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongoose://localhost: 27017/todolistDB");

const itemsSheama = {
    names: String
}
const Item  = mongoose.model('item', itemsSheama);

const item1 = new Item({
    name: 'test of the db'
});

let itemsArray = [item1];
Item.insertMany(itemsArray, ()=>{
    console.log('insertion error');
});

// web stuff beond
app.get("/", (req, res) => {
    res.render('list', { id: "Todo", date: date.getdate(), newListItem: item });
});


app.get("/work", (req, res) => {
    res.render('list', { id: "Work", date: date.getdate(), newListItem: work });
});

app.post("/", (req, res) => {
    if (req.body.newItem != "" && req.body.button == "Todo") {
        item.push(req.body.newItem);
        res.redirect("/");
    }
    else if (req.body.newItem != "" && req.body.button == "Work") {
        work.push(req.body.newItem);
        res.redirect("/work");
    }
});



app.listen("3000", () => {
    console.log("from 3000");
});