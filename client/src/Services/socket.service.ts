import { io } from "socket.io-client";

const socket = io("ws://localhost:12345/sockets");

type SocketService = {
  connect: () => void;
  onMessage: (event: MessageEvent<any>) => void;
};

const socketService: SocketService = {
  connect: () => {},
  onMessage: (m) => {},
};

socket.on("connect", socketService.connect);
socket.on("error", (e) => console.log(e));

socket.on("myevent", (m) => {
  socketService.onMessage(m);
});

export { socketService };
