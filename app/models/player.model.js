const moongose = require('mongoose');

const PlayerSchema = moongose.Schema({
    name: String,
    age: Number,
    club: String,
    nation: String,
    position: String
});
module.exports = moongose.model("Player", PlayerSchema);