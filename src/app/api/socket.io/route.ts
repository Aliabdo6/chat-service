import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next"; // "@/types/next"
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket
      .server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket.io",
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;

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
  }
  res.end();
}
