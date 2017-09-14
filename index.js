const client = require("./serviceClients.js");
const async = require("async");

let createdCallback = function(matchId) {

    console.log(matchId);
    let subset = new Array(21);

    async.eachOfSeries(subset, function(letter, index, callback){

        client.letterAtIndex(matchId, index, function (data) {

            subset[index] = data.entity;
            callback();
        });

    },
    function() {

        let diff = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
                    "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
                    "W", "X", "Y", "Z"].filter(x => subset.indexOf(x) < 0);

        client.listValidWords(function(data){

            for(let i = 0; i<data.length; i++) {

                let match = true;

                for(let j = 0; j<diff.length; j++) {

                    match = match&data[i].includes(diff[j])
                }
                if(match) {
                    console.log(data[i]);
                }
            }
        });
        console.log(diff);
    });
};

client.createMatch(createdCallback);