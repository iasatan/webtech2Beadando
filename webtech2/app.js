var express = require('express');
var app = express();
var user = {
    userName: "",
    name: "",
    age: "",
    type: "user"
};
var requests = { request: [] };
var lends = { lends: [] };
var books = { books: [{ name: "Das gesunde PLUS", genre: "medical", author: "dm", status: 49 }] };
var authorts = ["Shrek"];
var genres = ["medical"];

app.use(express.static(__dirname + '/public'));

app.get('/index', function (req, res) {
    if (user.userName == "") {
        res.sendFile(__dirname + "/public/" + "login.html");
    }
    else if (user.type == "Librarian") {
        res.sendFile(__dirname + "/public/" + "Librarian.html");
    }

    else {
        res.sendFile(__dirname + "/public/" + "index.html");
    }
})

app.get('/manageBooks', function (req, res) {
    if (user.type == "Librarian") {
        res.sendFile(__dirname + "/public/manageBooks.html");
    }
})
app.get('/addAuthor', function (req, res) {
    if (user.type == "Librarian") {
        authorts.push(req.query.author);
        res.sendFile(__dirname + "/public/manageBooks.html");
    }
})
app.get('/addBook', function (req, res) {
    if (user.type == "Librarian") {
        books['books'].push({ "name": req.query.book, "genre": req.query.genre, "author": req.query.author, "status": 0 });
        res.sendFile(__dirname + "/public/manageBooks.html");
    }
})
app.get('/manageInventory', function (req, res) {
    if (user.type == "Librarian") {
        res.sendFile(__dirname + "/public/manageInventory.html");
    }
})
app.get('/addBookInstance', function (req, res) {
    if (user.type == "Librarian") {
        var tmpJSON;
        var tmp2JSON = { a: [] };
        for (var i = 0; i < books['books'].length; i++) {
            tmpJSON = (books['books'].pop());
            if (tmpJSON.name == req.query.name) {
                tmpJSON.status = req.query.status;
            }
            tmp2JSON['a'].push(tmpJSON);
        }
        books['books'].push(tmp2JSON['a'].pop());
        res.sendFile(__dirname + "/public/manageInventory.html");
    }
})

app.get('/listRequests', function (req, res) {
    if (user.type == 'Librarian') {
        res.sendFile(__dirname + "/public/manageRequests.html");
    }
})
app.get('/requests', function (req, res) {
    if (user.type == 'Librarian') {
        res.send(requests);
    }
})
//**********************************************
app.get('/user', function (req, res) {
    res.send(user);
})
app.get('/books', function (req, res) {
    res.send(books);
})
app.get('/authors', function (req, res) {
    res.send(authorts);
})

app.get('/login', function (req, res) {
    user.userName = req.query.userName;
    if (user.userName == "Satan") {
        user.type = "Librarian";
        res.sendFile(__dirname + "/public/" + "Librarian.html");
    }
    else {
        res.sendFile(__dirname + "/public/" + "index.html");
    }
})

app.get('/logOut', function (req, res) {
    res.sendFile(__dirname + "/public/" + "login.html");
    user.age = "";
    user.name = "";
    user.userName = "";
    user.type = "user";
})
app.get('/user', function (req, res) {
    res.send(user);
})
app.get('/books', function (req, res) {
    res.send(books);
})
app.get('/authors', function (req, res) {
    res.send(authorts);
})
app.get('/genres', function (req, res) {
    res.send(genres);
})


app.get('/login', function (req, res) {
    user.userName = req.query.userName;
    res.sendFile(__dirname + "/public/" + "index.html");
})

app.get('/logOut', function (req, res) {
    console.log("logout");
    res.sendFile(__dirname + "/public/" + "logout.html");
    user.age = "";
    user.name = "";
    user.userName = "";
})

app.get('/edit', function (req, res) {
    res.sendFile(__dirname + "/public/" + "edit.html");
})
app.get('/editResponse', function (req, res) {
    user.userName = req.query.userName;
    user.age = req.query.age;
    user.name = req.query.name;
    res.sendFile(__dirname + "/public/" + "index.html");
})


//**************************************************

app.get('/lend', function (req, res) {
    if (user.type == 'Librarian') {
        lends['lends'].push({ "name": req.query.name, "book": req.query.book });

        var tmpJSON;
        var tmp2JSON = { a: [] };
        for (var i = 0; i < requests['request'].length; i++) {
            tmpJSON = (requests['request'].pop());
            if (tmpJSON.user == req.query.name && tmpJSON.book == req.query.book) {
                tmpJSON = "";
            }
            else {
                tmp2JSON['a'].push(tmpJSON);
            }
        }
        requests['request'].push(tmp2JSON['a'].pop());

        tmp2JSON = { a: [] };
        for (var i = 0; i < books['books'].length; i++) {
            tmpJSON = books['books'].pop();
            if (tmpJSON.name == req.query.book) {
                tmpJSON.status--;
            }
            tmp2JSON['a'].push(tmpJSON);
        }
        books['books'].push(tmp2JSON['a'].pop());

        res.sendFile(__dirname + "/public/manageRequests.html");
    }
})
app.get('/lends', function (req, res) {
    if (user.type == 'Librarian') {
        res.send(lends);
    }
})

app.get('/myLends', function (req, res) {
    var tmpJSON;
    var tmp2JSON = { a: [] };
    for (var i = 0; i < lends['lends'].length; i++) {
        tmpJSON = (lends['lends'].pop());
        if (tmpJSON.name == user.userName) {
            tmp2JSON['a'].push(tmpJSON);
        }
    }
    res.send(tmp2JSON);
})

app.get('/requestBook', function (req, res) {
    requests['request'].push({ "user": user.userName, "book": req.query.name });
    console.log(requests);
})
app.get('/listByGenre', function (req, res) {
    //var response = "<table border=1>";
    var tmpJSON;
    var tmp2JSON = { a: [] };
    for (var i = 0; i < books['books'].length; i++) {
        tmpJSON = (books['books'].pop());
        if (tmpJSON.genre == req.query.genre) {
            //response += "<tr><td>Name</td><td>" + tmpJSON.name + "</td></tr><tr><td>Genre</td><td>" + tmpJSON.genre + "</td></tr><tr><td>author</td><td>" + tmpJSON.author + "</td></tr><tr><td>status</td><td>" + tmpJSON.status + "</td></tr>";
            tmp2JSON['a'].push(tmpJSON);
        }
    }
    //response += "</table>";
    //res.send(response);
    res.send(tmp2JSON);
})
app.get('/listBooksBy', function (req, res) {
    res.sendFile(__dirname + "/public/listBooksBy.html");
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})