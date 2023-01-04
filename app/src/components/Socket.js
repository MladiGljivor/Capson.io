import socketIO from "socket.io-client";
var   socket = socketIO.connect('http://localhost:4000');
export default socket;