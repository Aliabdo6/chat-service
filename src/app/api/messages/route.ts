import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Message from "@/models/Message";
import { initSocket } from "@/lib/socket";

let io: any;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const groupId = searchParams.get("groupId");

  await connectToDatabase();

  const messages = await Message.find({
    groupId,
  }).sort({ timestamp: 1 });

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const { sender, content, groupId } =
    await request.json();

  await connectToDatabase();

  const newMessage = new Message({
    sender,
    content,
    groupId,
  });
  await newMessage.save();

  // Initialize Socket.IO if not already initialized
  if (!io) {
    const res = NextResponse.next();
    const httpServer = (res as any).socket.server;
    io = initSocket(httpServer);
  }

  // Emit the new message to all clients in the group
  io.to(groupId).emit("message", newMessage);

  return NextResponse.json(newMessage);
}
