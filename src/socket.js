import io from 'socket.io-client';
// const sockets = io('https://kserver.okelamedia.com', { autoConnect: true, forceNew: true });
const sockets = io('https://kserver.okelamedia.com');
export default sockets;
