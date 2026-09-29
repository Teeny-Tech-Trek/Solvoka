import { useEffect, useRef, useState } from "react";
import type { FormEvent, UIEvent } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import styles from "./ChatWidget.module.css";
import { useChatStream } from "../hooks/useChatStream";
// import { requestHandoff } from "../lib/api";
// import type { HandoffResponse } from "../types";

// Self-contained widget component — drop
// <ChatWidget pageUrl={...} /> into any page; it renders its own floating
// launcher and manages its own open/closed state.

const PRIVACY_NOTE_DRAFT =
  "SOLVIX may use this conversation to help answer your questions. " +
  "Chat logs are kept for 90 days. We only remember you across visits if you say yes below.";

const SOURCE_DISPLAY_NAMES: Record<string, string> = {
  "solvoka_company_knowledge_base.md": "Solvoka Company Knowledge",
  "general_manufacturing_knowledge_base.md": "Manufacturing Capabilities & Guides",
};

function formatSourceName(source: string): string {
  if (SOURCE_DISPLAY_NAMES[source]) {
    return SOURCE_DISPLAY_NAMES[source];
  }
  return source
    .replace(/\.md$/i, "")
    .replace(/^[0-9]+[_-]/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function ChatWidget({ pageUrl }: { pageUrl: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  // const [handoff, setHandoff] = useState<HandoffResponse | null>(null);
  // const [handoffLoading, setHandoffLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const userScrolledUpRef = useRef(false);

  const {
    sessionId,
    greeting,
    showConsentPrompt,
    setConsent,
    messages,
    isSending,
    sendMessage,
    retryLastMessage,
  } = useChatStream(pageUrl);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const threshold = 60; // pixels from bottom to consider "at bottom"
    const isAtBottom = el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
    userScrolledUpRef.current = !isAtBottom;
  };

  useEffect(() => {
    // Only auto-scroll if the user has not manually scrolled up
    if (!userScrolledUpRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    userScrolledUpRef.current = false;
    setDraft("");
    void sendMessage(text);
  };

  const handleRetry = () => {
    userScrolledUpRef.current = false;
    retryLastMessage();
  };

  // const handleHandoffClick = async () => {
  //   if (!sessionId || handoffLoading) return;
  //   setHandoffLoading(true);
  //   try {
  //     const result = await requestHandoff(sessionId, "either");
  //     setHandoff(result);
  //   } catch {
  //     setHandoff(null);
  //   } finally {
  //     setHandoffLoading(false);
  //   }
  // };

  if (!isOpen) {
    return (
      <button
        className={styles.launcher}
        onClick={() => setIsOpen(true)}
        aria-label="Open Solvoka chat"
        type="button"
      >
        <video
          className={styles.launcherVideo}
          src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Chatbot-Icon-Video.webm"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <div className={styles.panel} role="dialog" aria-label="Solvoka chat">
      <div className={styles.header}>
        {/* 3D CAD mechanical part watermark in top-right */}
        <div className={styles.cadWatermark} aria-hidden="true">
          <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 40 L105 18 L142 36 L88 58 Z" fill="#38bdf8" fillOpacity="0.18" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.4" />
            <path d="M50 40 L88 58 L88 94 L50 76 Z" fill="#1e40af" fillOpacity="0.25" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.4" />
            <path d="M88 58 L142 36 L142 72 L88 94 Z" fill="#2563eb" fillOpacity="0.2" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.4" />
            <ellipse cx="98" cy="42" rx="9" ry="4.5" stroke="#60a5fa" strokeWidth="1.2" strokeOpacity="0.5" fill="#0f172a" fillOpacity="0.35" />
            <ellipse cx="68" cy="62" rx="7" ry="3.5" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.4" fill="#0f172a" fillOpacity="0.35" />
          </svg>
        </div>

        <div className={styles.headerLeft}>
          <div className={styles.headerAvatarWrap}>
            <video
              className={styles.headerVideo}
              src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Chatbot-Icon-Video.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
            />
          </div>
          <div className={styles.headerTitleGroup}>
            <span className={styles.headerTitle}>Solvoka Assistant</span>
            <div className={styles.subtitleRow}>
              <span className={styles.onlineDot} />
              <span className={styles.headerSubtitle}>Your manufacturing AI partner</span>
            </div>
          </div>
        </div>

        <div className={styles.headerActions}>
          {/* <button
            className={styles.headerActionBtn}
            onClick={handleHandoffClick}
            aria-label="Connect with human representative"
            title="Connect with human representative"
            type="button"
            disabled={handoffLoading}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button> */}
          <button
            className={styles.headerActionBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            type="button"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M1 1L11 11M11 1L1 11" />
            </svg>
          </button>
        </div>
      </div>

      {showConsentPrompt && (
        <div className={styles.consentBanner}>
          <span>Remember me for next time? (You can change this anytime.)</span>
          <div className={styles.consentButtons}>
            <button className="primary" onClick={() => setConsent(true)}>
              Yes, remember me
            </button>
            <button onClick={() => setConsent(false)}>No thanks</button>
          </div>
        </div>
      )}

      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className={styles.messages}
        aria-live="polite"
        aria-atomic="false"
      >
        {greeting && messages.length === 0 && (
          <div className={`${styles.row} ${styles.rowAssistant}`}>
            <div className={styles.messageAvatar}>
              <video
                className={styles.messageAvatarVideo}
                src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Chatbot-Icon-Video.webm"
                autoPlay
                loop
                muted
                playsInline
                aria-hidden="true"
              />
            </div>
            <div>
              <div className={`${styles.bubble} ${styles.bubbleAssistant}`}>
                {greeting}
              </div>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`${styles.row} ${m.role === "user" ? styles.rowUser : styles.rowAssistant}`}
          >
            {m.role === "assistant" && (
              <div className={styles.messageAvatar}>
                <video
                  className={styles.messageAvatarVideo}
                  src="https://y7vyxj1m0fxk40gw.public.blob.vercel-storage.com/Chatbot-Icon-Video.webm"
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                />
              </div>
            )}
            <div>
              <div
                className={`${styles.bubble} ${m.role === "user" ? styles.bubbleUser : styles.bubbleAssistant
                  } ${m.isError ? styles.bubbleError : ""}`}
              >
                {m.role === "assistant" && !m.isError ? (
                  m.text ? (
                    <div className={styles.markdownContent}>
                      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>
                        {m.text}
                      </ReactMarkdown>
                    </div>
                  ) : m.isStreaming ? (
                    <div className={styles.typingDots} aria-label="SOLVIX is typing">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  ) : null
                ) : (
                  <div>{m.text || (m.isStreaming ? "…" : "")}</div>
                )}
                {m.isError && (
                  <button
                    type="button"
                    className={styles.retryButton}
                    onClick={handleRetry}
                    aria-label="Retry sending message"
                  >
                    ↻ Retry
                  </button>
                )}
              </div>
              {m.sources && m.sources.length > 0 && (
                <div className={styles.sources}>
                  <span>Sources: </span>
                  {Array.from(new Set(m.sources.map((s) => s.source))).map((sourceName) => (
                    <span key={sourceName} className={styles.sourceTag}>
                      {formatSourceName(sourceName)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Handoff panel — re-enable when live agent integration is ready
      {handoff && (
        <div className={styles.handoffPanel}>
          <span>{handoff.hours_note}</span>
          <span>Expected response: {handoff.expected_response}.</span>
          {handoff.whatsapp_link ? (
            <a href={handoff.whatsapp_link} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          ) : (
            <span>(WhatsApp number not yet configured)</span>
          )}
          {handoff.email ? (
            <a href={`mailto:${handoff.email}`}>Email us at {handoff.email}</a>
          ) : (
            <span>(Sales inbox not yet configured)</span>
          )}
        </div>
      )}
      */}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputPill}>
          <input
            className={styles.input}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your message..."
            disabled={!sessionId}
          />
        </div>
        <button
          className={styles.sendButton}
          type="submit"
          disabled={!sessionId || isSending || !draft.trim()}
          aria-label="Send message"
        >
          <svg className={styles.sendIcon} viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </form>
      <div className={styles.footerNote}>
        Powered by Solvoka &nbsp;|&nbsp; Secure &amp; Confidential
      </div>
      <span className={styles.srOnly}>{PRIVACY_NOTE_DRAFT}</span>
    </div>
  );
}

export default ChatWidget;
