'use strict';

const Client = require('node-rest-client').Client;

let client = new Client();

let args = {
    path: {
        "match_id": "",
        "index": "",
        "solution": ""
    }
};

client.registerMethod("listValidWords", "http://localhost:8080/listValidWords", "GET");
client.registerMethod("createMatch",    "http://localhost:8080/deduceMatch/createMatch", "POST");
client.registerMethod("matchDetails",   "http://localhost:8080/deduceMatch/${match_id}/details", "GET");
client.registerMethod("letterAtIndex",  "http://localhost:8080/deduceMatch/${match_id}/letterAtIndex/${index}", "GET");
client.registerMethod("solve",          "http://localhost:8080/deduceMatch/${match_id}/solve/${solution}", "PUT");

module.exports = {

    listValidWords: function(callback) {

        client.methods.listValidWords(function(data, response) {
            callback(data.entity.words);
        });
    },
    
    createMatch: function(callback) {

        client.methods.createMatch(function(data, response) {
            callback(data.entity.id);
        });
    },

    matchDetails: function(matchId, callback){

        args.path.match_id = matchId;

        client.methods.matchDetails(args, function(data, response){
            callback(data);
        })
    },

    letterAtIndex(matchId, index, callback) {

        args.path.match_id = matchId;
        args.path.index = index;

        client.methods.letterAtIndex(args, function(data, response){
            callback(data);
        })
    },

    solve(matchId, solution, callback) {

        args.path.match_id = matchId;
        args.path.solution = solution;

        client.methods.solve(args, function(data, response){
            callback(data);
        })
    }
};