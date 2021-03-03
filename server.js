const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true   
}).then(() => {
    console.log("Connected to the database");
}).catch(err => {
    console.log("Could not connect to the database.", err);
    process.exit();
})

app.get('/', (req, res) => {
    res.json({"message": "Welcome to REST API - information about players."});
});

require('./app/routes/player.routes.js')(app);

app.listen(3000, () => {
    console.log("Server port - 3000");
})