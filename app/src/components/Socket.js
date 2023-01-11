import socketIO from "socket.io-client";
var   socket = socketIO.connect('http://3.124.193.139:4000');
export default socket;