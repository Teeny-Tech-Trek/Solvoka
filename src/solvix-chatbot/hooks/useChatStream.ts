import { useCallback, useEffect, useRef, useState } from "react";
import { startSession, streamChat } from "../lib/api";
import type { ChatMessage } from "../types";

const SESSION_ID_KEY = "solvix_session_id";
const VISITOR_TOKEN_KEY = "solvix_visitor_token";
const CONSENT_KEY = "solvix_consent_memory";

function readSessionId(): string | null {
  try {
    return localStorage.getItem(SESSION_ID_KEY);
  } catch {
    return null;
  }
}

function persistSessionId(id: string) {
  try {
    localStorage.setItem(SESSION_ID_KEY, id);
  } catch {
    /* ignore — private browsing or storage quota exceeded */
  }
}

function readVisitorToken(): string | null {
  try {
    return localStorage.getItem(VISITOR_TOKEN_KEY);
  } catch {
    return null;
  }
}

function persistVisitorToken(token: string) {
  try {
    localStorage.setItem(VISITOR_TOKEN_KEY, token);
  } catch {
    /* ignore */
  }
}

export function useChatStream(pageUrl: string) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [visitorToken, setVisitorToken] = useState<string | null>(readVisitorToken());
  const [greeting, setGreeting] = useState<string>("");
  const [showConsentPrompt, setShowConsentPrompt] = useState(false);
  const [consentMemory, setConsentMemory] = useState<boolean>(() => {
    try {
      return localStorage.getItem(CONSENT_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let cancelled = false;
    const storedVisitorToken = readVisitorToken();
    const storedSessionId = readSessionId();

    startSession(pageUrl, storedVisitorToken, storedSessionId)
      .then((res) => {
        if (cancelled) return;
        setSessionId(res.session_id);
        persistSessionId(res.session_id);
        setVisitorToken(res.visitor_token);
        persistVisitorToken(res.visitor_token);
        setGreeting(res.greeting);
        setShowConsentPrompt(res.show_consent_prompt);

        if (res.returning_session && res.messages && res.messages.length > 0) {
          setMessages(
            res.messages.map((m, idx) => ({
              id: `restored_${idx}_${Date.now()}`,
              role: m.role as "user" | "assistant",
              text: m.content,
              isStreaming: false,
            }))
          );
        }
      })
      .catch(() => {
        if (!cancelled) setGreeting("Hi, I'm SOLVIX. (Having trouble connecting right now.)");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setConsent = useCallback((value: boolean) => {
    setConsentMemory(value);
    setShowConsentPrompt(false);
    try {
      localStorage.setItem(CONSENT_KEY, String(value));
    } catch {
      /* ignore */
    }
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!sessionId || !text.trim() || isSending) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        text,
        isStreaming: false,
      };
      const assistantId = crypto.randomUUID();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        text: "",
        isStreaming: true,
      };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsSending(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const updateAssistant = (patch: Partial<ChatMessage>) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, ...patch } : m))
        );
      };

      try {
        await streamChat(
          { sessionId, message: text, visitorToken, consentMemory },
          {
            onToken: (delta) => {
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, text: m.text + delta } : m))
              );
            },
            onSources: (chunks) => updateAssistant({ sources: chunks }),
            onDone: (guardrailFlags) => updateAssistant({ isStreaming: false, guardrailFlags }),
            onError: (_code, fallbackMessage) =>
              updateAssistant({ isStreaming: false, isError: true, text: fallbackMessage }),
          },
          controller.signal
        );
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          updateAssistant({
            isStreaming: false,
            isError: true,
            text: "Sorry — I'm having trouble right now. Please try again.",
          });
        }
      } finally {
        setIsSending(false);
      }
    },
    [sessionId, visitorToken, consentMemory, isSending]
  );

  const retryLastMessage = useCallback(() => {
    const lastUserIdx = messages.map((m) => m.role).lastIndexOf("user");
    if (lastUserIdx === -1 || isSending) return;
    const textToRetry = messages[lastUserIdx].text;
    setMessages((prev) => prev.slice(0, lastUserIdx));
    void sendMessage(textToRetry);
  }, [messages, isSending, sendMessage]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  return {
    sessionId,
    greeting,
    showConsentPrompt,
    consentMemory,
    setConsent,
    messages,
    isSending,
    sendMessage,
    retryLastMessage,
  };
}
