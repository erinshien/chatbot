"use client";

import { useState } from "react";

import styles from "./page.module.css";

import Image from "next/image";

import { useChat } from "ai/react";

import { BsChatHeart } from "react-icons/bs";

export default function Chat() {
  const [userName, setUserName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleNameInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setUserName(userName.trim());
    setNameSubmitted(true);
  };

  return (
    <>
      <div className={styles.imageContainer}>
        <Image
          src="/robot.png"
          width={500}
          height={500}
          alt="Illustration of a robot reading a book, sat on a pile of books"
        />
      </div>

      <div className={`${styles.chatbot} chatbot`}>
        {!nameSubmitted && (
          <form onSubmit={handleNameSubmit}>
            <input
              className="inputField"
              value={userName}
              placeholder="Enter your name here!"
              onChange={handleNameInputChange}
            />
            <button type="submit">
              <BsChatHeart />
            </button>
          </form>
        )}

        {nameSubmitted && (
          <form onSubmit={handleSubmit}>
            <input
              className="inputField"
              value={input}
              placeholder="Ask me anything!"
              onChange={handleInputChange}
            />
            <button type="submit">
              <BsChatHeart />
            </button>
          </form>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`${styles.chatHistory} chatHistory`}>
            {m.role === "user" ? `${userName}: ` : "ChatterBot: "}
            {m.content}
          </div>
        ))}
      </div>
    </>
  );
}
