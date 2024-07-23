import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";

export const initSocket = (server: NetServer) => {
  const io = new SocketIOServer(server, {
    path: "/api/socket.io",
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("join", (groupId) => {
      socket.join(groupId);
    });

    socket.on("message", (message) => {
      io.to(message.groupId).emit(
        "message",
        message
      );
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
};
