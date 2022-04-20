// connecting Data Abstraction Layer (DAL)

const MongoClient = require("mongodb").MongoClient;
const { initializeApp } = require('firebase-admin/app');
const url = "mongodb://localhost:27017";
let db = null;

// connect to mongo
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  console.log("Connected successfully to db server");

  // connect to myproject database
  db = client.db("myproject");
});

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, email, password, balance: 0};
    collection.insertOne(doc, {w: 1}, function(err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// create login
function login(email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {email, password};
        collection.insertOne(doc, {w: 1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

// create deposit
function deposit(email, deposit) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {email, deposit};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

// create withdraw
function withdraw(email, withdraw) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {email, withdraw};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

// create balance
function balance(email) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {email};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

// all users
function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function(err, docs) {
        err ? reject(err) : resolve(docs);
      });
  });
}

module.exports = {create, login, deposit, withdraw, balance, all};
