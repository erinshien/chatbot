"use client";

import styles from "./page.module.css";

import Image from "next/image";

import { useChat } from "ai/react";

import { BsChatHeart } from "react-icons/bs";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <>
      <Image
        src="/robot.png"
        width={500}
        height={500}
        alt="Illustration of a robot reading a book, sat on a pile of books"
      />

      <div className={`${styles.chatbot} chatbot`}>
        <form onSubmit={handleSubmit}>
          <input
            className="inputField"
            value={input}
            placeholder="Ask me anything!"
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>
            <BsChatHeart />
          </button>
        </form>

        {messages.map((m) => (
          <div key={m.id} className={`${styles.chatHistory} chatHistory`}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
      </div>
    </>
  );
}
