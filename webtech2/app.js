var express = require('express');
var app = express();
var user = {userName: "", name: "", age: "", type: "user"};
var requests = { request: [] };
var lends = { lends: [] };
var books = { books: [{ name: "Das gesunde PLUS", genre: "medical", author: "dm", status: 49 }, { name: "SUPERLIFE", genre: "electronics", author: "VARTA", status: 4 }] };
var authors = ["dm", "VARTA"];
var listby = { books: [] };
var page="";

app.use(express.static(__dirname + '/public'));

/********************************************************************
Librarian only
**********************************************************************/

app.get('/addAuthor', function (req, res) {
    if (user.type == "Librarian") {
        authors.push(req.query.author);
        res.sendFile(__dirname + "/public/Librarian.html");
        page = "manageBooks";
    }
})
app.get('/addBook', function (req, res) {
    if (user.type == "Librarian") {
        books['books'].push({ "name": req.query.book, "genre": req.query.genre, "author": req.query.author, "status": 0 });
        res.sendFile(__dirname + "/public/Librarian.html");
        page = "manageBooks";
    }
})

app.get('/addBookInstance', function (req, res) {
    if (user.type == "Librarian") {
        for (var i = 0; i < books['books'].length; i++) {
            if (books['books'][i].name == req.query.name) {
                books['books'][i].status = req.query.status;
            }
        }
        res.sendFile(__dirname + "/public/Librarian.html");
        page = "manageInventory";
    }
})

app.get('/requests', function (req, res) {
    if (user.type == 'Librarian') {
        res.send(requests);
    }
})
app.get('/lend', function (req, res) {
    if (user.type == 'Librarian') {
        lends['lends'].push({ "name": req.query.name, "book": req.query.book });
        for (var i = 0; i < requests['request'].length; i++) {
            if (requests['request'][i].user == req.query.name && requests['request'][i].book == req.query.book) {
                requests['request'][i] = "";
            }
        }
        for (var i = 0; i < books['books'].length; i++) {
            if (books['books'][i].name == req.query.book) {
                books['books'][i].status--;
            }
        }
        res.sendFile(__dirname + "/public/librarian.html");
        page = "requests";
    }
})
app.get('/lends', function (req, res) {
    if (user.type == 'Librarian') {
        res.send(lends);
    }
})
/**********************************************************************
End of Librarian Only
**********************************************************************/

/*********************************************************************
Getters
**********************************************************************/
app.get('/page', function (req, res) {
    res.send(page);
})
app.get('/user', function (req, res) {
    res.send(user);
})
app.get('/books', function (req, res) {
    res.send(books);
})
app.get('/authors', function (req, res) {
    res.send(authors);
})
app.get('/books', function (req, res) {
    res.send(books);
})
app.get('/genres', function (req, res) {
    var genres = [];
    for (var i = 0; i < books['books'].length; i++) {
        genres.push(books['books'][i].genre);
    }
    res.send(genres);
})
app.get('/myLends', function (req, res) {
    var tmp2JSON = { a: [] };
    for (var i = 0; i < lends['lends'].length; i++) {
        if (lends['lends'][i].name == user.userName) {
            tmp2JSON['a'].push(lends['lends'][i]);
        }
    }
    res.send(tmp2JSON);
})
app.get('/listByGenre', function (req, res) {
    listby['books'] = [];
    for (var i = 0; i < books['books'].length; i++) {
        if (books['books'][i].genre == req.query.genre) {
            listby['books'].push(books['books'][i]);
        }
    }
    res.sendFile(__dirname + "/public/index.html");
    page = "bookListBy";
})
app.get('/listByAuthor', function (req, res) {
    listby['books'] = [];
    for (var i = 0; i < books['books'].length; i++) {
        if (books['books'][i].author == req.query.author) {
            listby['books'].push(books['books'][i]);
        }
    }
    res.sendFile(__dirname + "/public/index.html");
    page = "bookListBy";
})
app.get('/listByStatus', function (req, res) {
    listby['books'] = [];
    for (var i = 0; i < books['books'].length; i++) {
        if (books['books'][i].status == req.query.status) {
            listby['books'].push(books['books'][i]);
        }
    }
    res.sendFile(__dirname + "/public/index.html");
    page = "bookListBy";
})
app.get('/listBy', function(req, res) {
    res.send(listby);
})
app.get('/status', function (req, res) {
    var status = [];
    for (var i = 0; i < books['books'].length; i++) {
        status.push(books['books'][i].status);
    }
    res.send(status);
})
/*********************************************************************
End of getters
**********************************************************************/

/*********************************************************************
Setters
**********************************************************************/
app.get('/editResponse', function (req, res) {
    user.userName = req.query.userName;
    user.age = req.query.age;
    user.name = req.query.name;
    res.sendFile(__dirname + "/public/" + "index.html");
    page = "edit";
})
app.get('/requestBook', function (req, res) {
    requests['request'].push({ "user": user.userName, "book": req.query.name });
    res.sendFile(__dirname + "/public/" + "index.html");
    page = "bookList";
})
app.get('/requestBook2', function (req, res) {
    requests['request'].push({ "user": user.userName, "book": req.query.name });
    res.sendFile(__dirname + "/public/" + "index.html");
    page = "bookListBy";
})
/*********************************************************************
End of Setters
**********************************************************************/

/*********************************************************************
Pages
**********************************************************************/
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
app.get('/edit', function (req, res) {
    res.sendFile(__dirname + "/public/" + "edit.html");
})
app.get('/listBooksBy', function (req, res) {
    res.sendFile(__dirname + "/public/listBooksBy.html");
})
/*********************************************************************
End of Pages
**********************************************************************/

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})