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

        let solved = false;

        let possibleSolutions = [];

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
                    console.log("Found possible solution: " + data[i]);
                    possibleSolutions.push(data[i]);
                }
            }

            async.eachOfSeries(possibleSolutions, function(aSolution, index, callback) {

                if(!solved) {
                    client.solve(matchId, aSolution, function(solveAttemptResponse) {
                               
                        if(!solveAttemptResponse.entity.isSolved) {
                            client.letterAtIndex(matchId, 0, function (ignore) {
                                console.log("Failed solution attempt: " +aSolution);
                                callback();
                            });    
                        }
                        else {
                            console.log("Solution found: " + aSolution);
                            console.log("Number of steps for solution: " + solveAttemptResponse.entity.events.length);
                            solved = true;
                            callback();
                        }
                    });
                }
            });
        });
        console.log(diff);
    });
};

client.createMatch(createdCallback);