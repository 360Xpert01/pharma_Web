"use client";
import { BaseForm } from "@/components/form/base-form";
import React, { useState } from "react";
import ChatRoom from "./components/chat-room";

const Chat = () => {
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState("");
  const [secondName, setSecondName] = useState("");

  const chatSchema = {
    fields: [
      {
        id: "room",
        name: "room",
        type: "text",
        label: "Room",
        placeholder: "room-name",
        rules: { required: true },
      },
      {
        id: "secondName",
        name: "secondName",
        type: "text",
        label: "Your display name",
        placeholder: "e.g. Alice",
        rules: { required: true },
      },
    ],
    defaultValues: {
      room: "",
      secondName: "",
    },
    onSubmit: (data: any) => {
      const r = (data.room || "").trim();
      const s = (data.secondName || "").trim() || "Guest";
      if (!r) return;
      setRoom(r);
      setSecondName(s);
      setJoined(true);
    },
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {!joined ? (
        <BaseForm schema={chatSchema} submitText="Join" />
      ) : (
        <ChatRoom
          room={room}
          secondName={secondName}
          onLeave={() => {
            setJoined(false);
            setRoom("");
            setSecondName("");
          }}
        />
      )}
    </div>
  );
};

export default Chat;
