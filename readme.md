# deduce-client-algorithmic

This project is an algorithmic client implementation of the deduce-server game API. The intent is to find efficient 
solutions to the problems posed by the game rules. It is not intended as an interactive client for the game, but instead an automated puzzle solver.

You can specify the game server host and port using command line arguments --host and --port. If either of these arguments is omitted, the client will assume localhost and 8080 respectively.

To install the client dependencies, run the following command from the project root (where package.json is located):

>npm install

Once this is done, you may execute the client. The client requires an instance of deduce-server to run against. You may download the deduce-server and run it locally, from the [github repository](https://github.com/illingtonFlex/deduce-server).

## Example:

>$ node index.js --host myserver --port 1234

This will execute the client using http://myserver:1234 as a base url for the game server.