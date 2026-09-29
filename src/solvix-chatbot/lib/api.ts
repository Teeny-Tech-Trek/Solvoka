import { parseSSEStream } from "./sse";
import type { HandoffResponse, SessionStartResponse } from "../types";

// The widget's integration point with the backend.
// Configurable via VITE_SOLVIX_API_URL or defaults to localhost:8000
export const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_SOLVIX_API_URL) ||
  "http://127.0.0.1:8000";

export async function startSession(
  pageUrl: string,
  visitorToken: string | null,
  sessionId?: string | null
): Promise<SessionStartResponse> {
  const res = await fetch(`${API_BASE_URL}/api/session/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visitor_token: visitorToken,
      page_url: pageUrl,
      session_id: sessionId ?? undefined,
    }),
  });
  if (!res.ok) throw new Error(`session/start failed: ${res.status}`);
  return res.json();
}

export interface ChatEventHandlers {
  onToken: (text: string) => void;
  onSources: (chunks: { source: string; id: string }[]) => void;
  onDone: (guardrailFlags: string[], latencyMs: { first_token: number; total: number }) => void;
  onError: (code: string, fallbackMessage: string) => void;
}

export async function streamChat(
  params: { sessionId: string; message: string; visitorToken: string | null; consentMemory: boolean },
  handlers: ChatEventHandlers,
  signal?: AbortSignal
): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      session_id: params.sessionId,
      message: params.message,
      visitor_token: params.visitorToken,
      consent_memory: params.consentMemory,
    }),
    signal,
  });

  if (!res.ok) {
    handlers.onError("llm_unavailable", "Sorry — I'm having trouble right now. Please try again.");
    return;
  }

  for await (const evt of parseSSEStream(res)) {
    switch (evt.event) {
      case "token": {
        const data = evt.data as { text?: string };
        if (typeof data.text === "string") handlers.onToken(data.text);
        break;
      }
      case "sources": {
        const data = evt.data as { chunks?: { source: string; id: string }[] };
        handlers.onSources(data.chunks ?? []);
        break;
      }
      case "done": {
        const data = evt.data as {
          guardrail_flags?: string[];
          latency_ms?: { first_token: number; total: number };
        };
        handlers.onDone(data.guardrail_flags ?? [], data.latency_ms ?? { first_token: 0, total: 0 });
        break;
      }
      case "error": {
        const data = evt.data as { code?: string; fallback_message?: string };
        handlers.onError(data.code ?? "unknown", data.fallback_message ?? "Something went wrong.");
        break;
      }
      default:
        break;
    }
  }
}

export async function requestHandoff(
  sessionId: string,
  channelPreference: "whatsapp" | "email" | "either"
): Promise<HandoffResponse> {
  const res = await fetch(`${API_BASE_URL}/api/handoff`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, channel_preference: channelPreference }),
  });
  if (!res.ok) throw new Error(`handoff failed: ${res.status}`);
  return res.json();
}
