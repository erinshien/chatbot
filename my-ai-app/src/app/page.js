"use client";

import { useState } from "react";

import styles from "./page.module.css";

import Image from "next/image";

import { useChat } from "ai/react";

import { BsArrowReturnLeft } from "react-icons/bs";

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
            priority={true}
          />
        </div>

        <div className={`${styles.chatbot} chatbot`}>
          {!nameSubmitted && (
            <>
              <div className={styles.greeting}>
                <p className={styles.greetingText}>
                  Hello, friend! My name is ChatterBot. What is your name?
                </p>
              </div>
              <form
                id="input"
                name="input"
                className={styles.form}
                onSubmit={handleNameSubmit}
              >
                <input
                  id="input"
                  name="input"
                  className={`${styles.inputField} inputField`}
                  value={userName}
                  placeholder="Enter your name here!"
                  onChange={handleNameInputChange}
                />
                <button className={styles.submitButton} type="submit">
                  <BsArrowReturnLeft className={styles.chatHeartIcon} />
                </button>
              </form>
            </>
          )}

          {nameSubmitted && (
            <>
              <div className={styles.greeting}>
                <p className={styles.greetingText}>
                  Hi, {userName}! What would you like to know?
                </p>
              </div>
              <form
                id="input"
                name="input"
                className={styles.form}
                onSubmit={handleSubmit}
              >
                <input
                  id="input"
                  name="input"
                  className={`${styles.inputField} inputField`}
                  value={input}
                  placeholder="Ask me anything!"
                  onChange={handleInputChange}
                />
                <button className={styles.submitButton} type="submit">
                  <BsArrowReturnLeft className={styles.chatHeartIcon} />
                </button>
              </form>
            </>
          )}
          <div className={styles.messagesContainer}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.chatHistory} ${
                  m.role === "user" ? styles.userMessage : styles.botMessage
                }`}
              >
                <div className={styles.messageContent}>{m.content}</div>
                <div className={styles.messageAuthor}>
                  {m.role === "user" ? `${userName} ` : "ChatterBot "}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
