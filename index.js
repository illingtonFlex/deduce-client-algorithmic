const client = require("./serviceClients.js");
const async = require("async");

client.createMatch(function beginNewMatch(matchId) {

    console.log(matchId);
    let subset = new Array(21);

    async.eachOfSeries(subset, function iterateOverSubset(letter, index, callback){

        client.letterAtIndex(matchId, index, function populateSubset(letterAtIndexResponse) {

            subset[index] = letterAtIndexResponse.entity;
            callback();
        });
    },
    function solveThePuzzleAfterAllLettersAreKnown() {

        let solved = false;

        let possibleSolutions = [];

        let knownLettersInWord = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
                    "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
                    "W", "X", "Y", "Z"].filter(x => subset.indexOf(x) < 0);

        client.listValidWords(function findAnagrams(allPossibleWordsResponse){

            for(let i = 0; i<allPossibleWordsResponse.length; i++) {

                let match = true;

                for(let j = 0; j<knownLettersInWord.length; j++) {
                        match = match&allPossibleWordsResponse[i].includes(knownLettersInWord[j])
                }
                    
                if(match) {
                    console.log("Found possible solution: " + allPossibleWordsResponse[i]);
                    possibleSolutions.push(allPossibleWordsResponse[i]);
                }
            }

            async.eachOfSeries(possibleSolutions, function attemptSolutionWithAnagram(solutionCandidate, index, callback) {

                if(!solved) {
                    client.solve(matchId, solutionCandidate, function attemptSolutionWithAnagram(solveAttemptResponse) {
                               
                        if(!solveAttemptResponse.entity.isSolved) {
                            client.letterAtIndex(matchId, 0, function logFailedSolutionAttempt(ignore) {
                                console.log("Failed solution attempt: " + solutionCandidate);
                                callback();
                            });    
                        }
                        else {
                            console.log("Solution found: " + solutionCandidate);
                            console.log("Number of steps for solution: " + solveAttemptResponse.entity.events.length);
                            solved = true;
                            callback();
                        }
                    });
                }
            });
        });
        console.log(knownLettersInWord);
    });
});