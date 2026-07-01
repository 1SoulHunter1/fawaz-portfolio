"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { motion, AnimatePresence } from "motion/react";

function BotIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-3 -2 56 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left antenna — shorter, splayed left */}
      <line x1="16" y1="14" x2="13" y2="4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="13" cy="4" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      {/* Right antenna — taller, splayed right */}
      <line x1="34" y1="14" x2="37" y2="2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="37" cy="2" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      {/* Head — rounded square with speech-bubble tail at bottom-left */}
      <path
        d="M14 14 H36 A8 8 0 0 1 44 22 V34 A8 8 0 0 1 36 42 H16 L10 49 L6 38 V22 A8 8 0 0 1 14 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Left ear nub */}
      <rect x="0" y="25" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Right ear nub */}
      <rect x="44" y="25" width="6" height="9" rx="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Left eye — circuit-trace style */}
      <circle cx="19" cy="27" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="15.8" y1="27" x2="13.5" y2="25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="19" y1="23.8" x2="17.2" y2="21.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="22.2" y1="27" x2="24.2" y2="25.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      {/* Right eye — circuit-trace style */}
      <circle cx="31" cy="27" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <line x1="34.2" y1="27" x2="36.5" y2="25" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="31" y1="23.8" x2="32.8" y2="21.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <line x1="27.8" y1="27" x2="25.8" y2="25.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      {/* Smile */}
      <path
        d="M21 36 Q25 39.5 29 36"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full bg-[#d0ff71]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

const WELCOME_MESSAGE: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hey! I'm Fawaz's AI assistant. Ask me about his projects, skills, or background — I'm happy to help!",
    },
  ],
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const blockHoverRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    messages: [WELCOME_MESSAGE],
  });

  const isStreaming = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) handleClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isStreaming) return;
    setInputValue("");
    sendMessage({ text });
  }

  return (
    <div className="fixed bottom-6 right-6 z-[8000] md:bottom-8 md:right-8">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute bottom-16 right-0 flex w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-[#333] bg-[#1a1a1b]/90 shadow-2xl backdrop-blur-xl md:w-[380px]"
            style={{ maxHeight: "min(600px, calc(100vh - 8rem))" }}
            role="dialog"
            aria-label="Chat with AI assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#333] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d0ff71]/15">
                  <BotIcon className="h-5 w-5 text-[#d0ff71]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    AI Assistant
                  </p>
                  <p className="text-[11px] text-[#b5b5b5]">
                    Ask about Fawaz&apos;s work
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[#b5b5b5] transition-colors hover:bg-[#333] hover:text-white"
                aria-label="Close chat"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-3"
              data-lenis-prevent
              style={{ minHeight: 200, maxHeight: "calc(600px - 130px)" }}
            >
              {messages.map((m) => {
                const text = getMessageText(m);
                if (!text) return null;
                return (
                  <div
                    key={m.id}
                    className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-[#d0ff71] text-[#1a1a1b]"
                          : "bg-[#2a2a2b] text-white"
                      }`}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}
              {isStreaming &&
                !messages.some(
                  (m) =>
                    m.role === "assistant" &&
                    m.parts.some(
                      (p) => p.type === "text" && "state" in p && p.state === "streaming",
                    ),
                ) && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl bg-[#2a2a2b]">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              {error && (
                <div className="mb-3 flex justify-start">
                  <div className="max-w-[85%] rounded-2xl bg-red-500/10 px-3.5 py-2.5 text-sm text-red-400">
                    {error.message.includes("429")
                      ? "Rate limit reached — please try again in a few minutes."
                      : "Something went wrong. Please try again."}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleFormSubmit}
              className="border-t border-[#333] px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  maxLength={500}
                  className="flex-1 rounded-xl border border-[#333] bg-[#2a2a2b] px-3.5 py-2.5 text-sm text-white placeholder-[#777] outline-none transition-colors focus:border-[#d0ff71]/50"
                  data-lenis-prevent
                />
                <button
                  type="submit"
                  disabled={isStreaming || !inputValue.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#d0ff71] text-[#1a1a1b] transition-opacity disabled:opacity-40"
                  aria-label="Send message"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M14.5 1.5L7 9M14.5 1.5L10 14.5L7 9M14.5 1.5L1.5 6L7 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-[#666]">
                AI assistant — may not always be accurate
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => {
          blockHoverRef.current = true;
          setIsHovered(false);
          setIsOpen((prev) => !prev);
        }}
        onHoverStart={() => {
          if (!isOpen && !blockHoverRef.current) {
            setIsHovered(true);
          }
        }}
        onHoverEnd={() => {
          setIsHovered(false);
          blockHoverRef.current = false;
        }}
        className="group relative flex items-center overflow-hidden rounded-full border-2 border-[#b6ff3c]/50 bg-[#1B1B1B]"
        animate={{
          width: !isOpen && isHovered ? 200 : 62,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        style={{
          height: 62,
          boxShadow:
            "0 0 8px rgba(182,255,60,0.4), 0 0 20px rgba(182,255,60,0.22), 0 0 44px rgba(182,255,60,0.12)",
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        aria-label={isOpen ? "Close chat" : "Open AI chat assistant"}
      >
        {isOpen ? (
          <div className="flex shrink-0 items-center justify-center" style={{ width: 62, height: 62 }}>
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              width="22"
              height="22"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              style={{
                filter:
                  "drop-shadow(0 0 3px rgba(182,255,60,0.7)) drop-shadow(0 0 8px rgba(182,255,60,0.35))",
              }}
            >
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="#b6ff3c"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>
        ) : (
          <div className="flex items-center">
            <span
              className="ml-[12px] flex h-[38px] w-[38px] shrink-0 items-center justify-center"
              style={{
                filter:
                  "drop-shadow(0 0 3px rgba(182,255,60,0.7)) drop-shadow(0 0 8px rgba(182,255,60,0.35))",
              }}
            >
              <BotIcon className="h-[34px] w-[34px] text-[#b6ff3c]" />
            </span>
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  key="fab-text"
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                  className="ml-[5px] mr-[8px] flex flex-col items-start whitespace-nowrap leading-none"
                >
                  <span
                    className="font-heading text-[13px] font-bold uppercase tracking-normal text-[#b6ff3c]"
                    style={{
                      textShadow:
                        "0 0 6px rgba(182,255,60,0.55), 0 0 14px rgba(182,255,60,0.3)",
                    }}
                  >
                    Virtual Colleague
                  </span>
                  <span className="mt-0.5 text-[10px] font-normal text-[#9ca3af]">
                    Ask me anything…
                  </span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.button>
    </div>
  );
}
