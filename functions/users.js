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

router.get("/users", (req, res) => {
    let allUsers = [];
    collection.get().then(snapshot => {

        //process data
        snapshot.forEach(doc => {
            allUsers.push(doc.data());
        });

        //then respond as response
        res.json({
            "message": "Retrieved all user data",
            "data": allUsers,
        });

    }).catch(err => {
        console.log("Error retrieving users", err);
    });
});
 
router.get("/user/:id", (req, res) => {
    let oneUser = []
    collection.doc(req.params.id).get().then(doc => {

        if (!doc.exists) {
            throw "Data does not exist";
        } else {
            res.json({
                "message": "Retrieved one user data",
                "data": doc.data(),
            });
        }

    }).catch(err => {
        console.log("Error retrieving user:", err);
    });
});

router.post("/adduser/:id", (req, res) => {
    collection.doc(req.params.id).set(req.body).then( () => {
        res.json({
            "message": "Added new user",
            "data": req.body,
        })
    }).catch(err => {
        console.log("Error adding user:", err);
    });
});

router.post("/addusernetwork/:id/:network", (req, res) => {
    collection.doc(req.params.id).get().then( doc => {
        if (!doc.exists) {
            throw "Data does not exist";
        }
        //append network
        let newData = doc.data();
        newData["networks"].push(req.params.network);
        //update network
        collection.doc(req.params.id).set(newData);
        //respond as response
        res.json({
            "message": "Added one user network",
            "data": newData,
        });
        
    }).catch(err => {
        console.log("Error adding user network:", err);
    })
}); 

module.exports = router;