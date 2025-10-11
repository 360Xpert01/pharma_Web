"use client";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Message = {
  id: string;
  sender: string;
  text: string;
  time: number;
};

type Props = {
  room: string;
  secondName: string;
  onLeave: () => void;
};

export default function ChatRoom({ room, secondName, onLeave }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // welcome message
    setMessages([
      {
        id: uuidv4(),
        sender: "System",
        text: `Joined room "${room}". Say hi to ${secondName}!`,
        time: Date.now(),
      },
    ]);
  }, [room, secondName]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    const mine: Message = { id: uuidv4(), sender: "You", text: trimmed, time: Date.now() };
    setMessages((m) => [...m, mine]);
    setText("");

    // simple simulated reply from secondName after a short delay
    setTimeout(() => {
      const reply: Message = {
        id: uuidv4(),
        sender: secondName || "Friend",
        text: `Echo: ${trimmed}`,
        time: Date.now(),
      };
      setMessages((m) => [...m, reply]);
    }, 700);
  };

  return (
    <div className="flex flex-col h-[70vh] bg-white rounded shadow">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <div className="font-semibold">Room: {room}</div>
          <div className="text-sm text-gray-500">Chatting with: {secondName}</div>
        </div>
        <button onClick={onLeave} className="text-sm text-red-500">
          Leave
        </button>
      </div>

      <div ref={listRef} className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[80%] ${m.sender === "You" ? "ml-auto text-right" : ""}`}
          >
            <div className="text-xs text-gray-500">
              {m.sender} • {new Date(m.time).toLocaleTimeString()}
            </div>
            <div className="mt-1 inline-block bg-gray-100 px-3 py-2 rounded">{m.text}</div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="px-4 py-3 border-t flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
