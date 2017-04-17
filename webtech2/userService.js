module.exports = {
    login: login,
    edit: edit,
    findByIdInUsers: findByIdInUsers,
    findById: findById,
    findAll: findAll
};

var _ = require('lodash');
var fs = require('fs');

function login(credentials) {
    var user = null;
    var users = findAll();

    for (var currentUser of users) {
        if (currentUser.username === credentials.username && currentUser.password === credentials.password) {
            user = currentUser;
            break;
        }
    }

    return user;
};

function edit(newUser) {
    var users = findAll();

    var user = findByIdInUsers(users, newUser.id);

    if(user.username !== newUser.username && _.find(users, {username: newUser.username})) {
        throw new Error("The username already exists!");
    }

    user.name = newUser.name;
    user.username = newUser.username;
    user.password = newUser.password;
    user.age = newUser.age;
    user.gender = newUser.gender;

    fs.writeFileSync("./server/users.json", JSON.stringify(users), 'utf8');

    return user;
}

function findAll() {
    return JSON.parse(fs.readFileSync('./server/users.json', 'utf8'));
}

function findByIdInUsers(users, id) {
    for (var user of users) {
        if (user.id == id) {
            return user;
        }
    }
}

function findById(id) {
    var users = findAll();
    return findByIdInUsers(users, id);
}