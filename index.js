#!/usr/bin/env node

'use strict';

var Client = require('node-rest-client').Client;

var client = new Client();

var OK_STATUS = 200;
var CREATED_STATUS = 201;

var args = {
    path: { "match_id": "",
            "index": "",
            "solution": "" }
};

client.registerMethod("listValidWords", "http://localhost:8080/listValidWords", "GET");
client.registerMethod("createMatch", "http://localhost:8080/deduceMatch/createMatch", "POST");
client.registerMethod("matchDetails", "http://localhost:8080/deduceMatch/${match_id}/details", "GET");
client.registerMethod("letterAtIndex", "http://localhost:8080/deduceMatch/${match_id}/letterAtIndex/{index}", "GET");
client.registerMethod("solve", "http://localhost:8080/deduceMatch/${match_id}/solve/${solution}", "PUT");

client.methods.createMatch(function(data, response) {
    if(response.statusCode == CREATED_STATUS) {

        args.path.match_id = data.entity.id;

        client.methods.matchDetails(args, function(data, response){
            if(response.statusCode == OK_STATUS) {
                console.log(response.statusCode);
            }
        })
    }
});