const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const users = require("./users.js");
app.use("/api/", users);

app.get('/', (req, res) => res.send("Hello world!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));