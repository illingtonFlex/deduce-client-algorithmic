const client = require("./serviceClients.js");
const async = require("async");

let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


let createdCallback = function(matchId) {
    console.log(matchId);
    let subset = new Array(21);

    async.eachOfSeries(subset, function(letter, index, callback){

        client.letterAtIndex(matchId, index, function (data) {
            subset[index] = data.entity;
            callback();
        });
    }, function() {

       let diff = alphabet.filter(x => subset.indexOf(x) < 0);
       console.log(diff);
    });
};

client.createMatch(createdCallback);