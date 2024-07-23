"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function Home() {
  const [messages, setMessages] = useState<any[]>(
    []
  );
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [groupId, setGroupId] =
    useState("general");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Initialize socket connection
    if (!socket) {
      socket = io({
        path: "/api/socket.io",
      });
    }

    // Join group and set up message listener
    socket.emit("join", groupId);
    socket.on("message", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        message,
      ]);
    });

    fetchMessages();

    // Clean up on unmount
    return () => {
      socket.off("message");
    };
  }, [groupId]);

  const fetchMessages = async () => {
    const response = await fetch(
      `/api/messages?groupId=${groupId}`
    );
    const data = await response.json();
    setMessages(data);
  };

  const sendMessage = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (input.trim() && username.trim()) {
      const message = {
        sender: username,
        content: input,
        groupId,
      };

      // Send message to the server
      const response = await fetch(
        "/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        }
      );

      if (response.ok) {
        setInput("");
      } else {
        console.error("Failed to send message");
      }
    }
  };

  const filteredMessages = messages.filter(
    (message) =>
      message.content
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Chat App
      </h1>
      <div className="mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          placeholder="Enter your username"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <select
          value={groupId}
          onChange={(e) =>
            setGroupId(e.target.value)
          }
          className="w-full p-2 border rounded"
        >
          <option value="general">General</option>
          <option value="random">Random</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search messages..."
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="h-80 overflow-y-auto mb-4">
          {filteredMessages.map(
            (message, index) => (
              <div key={index} className="mb-2">
                <span className="font-bold">
                  {message.sender}:{" "}
                </span>
                {message.content}
              </div>
            )
          )}
        </div>
        <form
          onSubmit={sendMessage}
          className="flex"
        >
          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-l"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
