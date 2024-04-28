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
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <Image
            src="/robot.png"
            width={200}
            height={160}
            alt="Illustration of a robot sat on a pile of books, reading a book"
            sizes="(max-width: 768px) 50vw,
                (max-width: 1200px) 50vw,
                50vw"
            style={{ height: "100%", width: "100%" }}
          />
        </div>

        <div className={`${styles.chatbot} chatbot`}>
          {!nameSubmitted && (
            <>
              <div className={styles.greeting}>
                <p>Hello, friend! My name is ChatterBot, what's your name?</p>
              </div>
              <form className={styles.form} onSubmit={handleNameSubmit}>
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
            </>
          )}

          {nameSubmitted && (
            <>
              <div className={styles.greeting}>
                <p>Hi, ${userName}! What would you like to know?</p>
              </div>
              <form className={styles.form} onSubmit={handleSubmit}>
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
            </>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`${styles.chatHistory} chatHistory`}>
              {m.role === "user" ? `${userName}: ` : "ChatterBot: "}
              {m.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
