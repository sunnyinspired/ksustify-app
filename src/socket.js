import io from 'socket.io-client';
// const sockets = io('https://kserver.okelamedia.com', { autoConnect: true, forceNew: true });
const sockets = io('https://ksustify.netlify.app');
export default sockets;
