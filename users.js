// Using https://www.youtube.com/watch?v=-NsHWrrUgdk as guide

const express = require("express");
const router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("./networking-bangkok-js-firebase-adminsdk-d3d5j-1b2eb3ffbf.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://networking-bangkok-js.firebaseio.com"
});

database = admin.firestore();
collection = database.collection("users");
console.log(collection);

router.get("/users", (req, res, next) => {
    let allUsers = [];
    collection.get().then(
        snapshot => {
            snapshot.forEach(doc => {
                allUsers.push({
                    "id": "000",
                    "networks": {
                        0: "0",
                        1: "2",
                        2: "4",
                    }
                })
            })
        }
    )
});

module.exports = router;