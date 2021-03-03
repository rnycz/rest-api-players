const Player = require('../models/player.model.js');

exports.create = (req, res) => {
    if(!req.body.name){
        return res.status(400).send({
            message: "Player name can not be empty"
        });
    }
    const player = new Player({
        name: req.body.name,
        age: req.body.age,
        club: req.body.club,
        nation: req.body.nation,
        position: req.body.position
    });
    player.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};
exports.findAll = (req, res) => {
    Player.find()
    .then(players => {
        res.send(players);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};
exports.findOne = (req, res) => {
    Player.findById(req.params.playerId)
    .then(player => {
        if(!player){
            return res.status(404).send({
                message: "Player not found with id "+req.params.playerId
            });
        }
        res.send(player);
    }).catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Player not found with id "+req.params.playerId
            });
        }
        return res.status(500).send({
            message: "Error retrieving player with id " + req.params.playerId
        })
    })
};
exports.update = (req, res) => {
    if(!req.body.name){
        return res.status(400).send({
            message: "Player name can not be empty"
        });
    }
    Player.findByIdAndUpdate(req.params.playerId, {
        name: req.body.name,
        age: req.body.age,
        club: req.body.club,
        nation: req.body.nation,
        position: req.body.position
    }, {new: true})
    .then(player => {
        if(!player){
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            })
        }
        res.send(player);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });                
        }
        return res.status(500).send({
            message: "Error updating player with id " + req.params.playerId
        });
    })
};
exports.delete = (req, res) => {
    Player.findByIdAndRemove(req.params.playerId)
    .then(player => {
        if(!player){
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            })
        }
        res.send({message: "Player deleted!"});
    }).catch(err => {
        if(err.kind === "ObjectId" || err.name === "NotFound"){
            return res.status(404).send({
                message: "Player not found with id " + req.params.playerId
            });
        }
        return res.status(500).send({
            message: "Could not delete player with id " + req.params.playerId
        })
    })
};