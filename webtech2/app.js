var express = require('express');
var app = express();
var userName = "";
var age = 1;

app.use(express.static(__dirname + '/public'));

//**********************************************
app.get('/', function (req, res) {
    if (userName == "") {
        res.sendFile(__dirname + "/public/html/" + "login.html");
    }
    else {
        res.sendFile(__dirname + "/public/html/" + "index.html");
        console.log("index");
    }
    
})
app.get('/user', function (req, res) {
    res.send(userName);
})
app.get('/age', function (req, res) {
    res.send(age.toString());
})

app.get('/login', function (req, res) {
    userName = req.query.userName;
    res.sendFile(__dirname + "/public/html/" + "index.html");
})

app.get('/logOut', function (req, res) {
    console.log("logout");
    res.sendFile(__dirname + "/public/html/" + "logout.html");
    userName = "";
})

app.get('/edit', function (req, res) {
    res.sendFile(__dirname + "/public/html/" + "edit.html");
})
app.get('/editResponse', function (req, res) {
    userName = req.query.userName;
    age = req.query.age;
    res.sendFile(__dirname + "/public/html/" + "index.html");
})
//**************************************************

app.get('/manageBooks', function (req, res) {
    console.log("manageBooks");
})
app.get('/manageBooks/addAuthor', function (req, res) {
    console.log("addAuthor");
})
app.get('/manageBooks/addBook', function (req, res) {
    console.log("addBook");
})
app.get('/manageInventory', function (req, res) {
    console.log("manageInventory");
})
app.get('/manageInventory/addBook', function (req, res) {
    console.log("addBook2");
})

app.get('/manageRentals', function (req, res) {
    console.log("manageRentals");
})
app.get('/manageRentals/list', function (req, res) {
    console.log("list");
})
app.get('/manageRentals/lend', function (req, res) {
    console.log("lend");
})
app.get('/list', function (req, res) {
    console.log("list2");
})
app.get('/request', function (req, res) {
    console.log("request");
})




var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})