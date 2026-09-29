// Mirrors backend/app/models/schemas.py — see docs/API-CONTRACTS.md.

export interface ChatSource {
  source: string;
  id: string;
}

export interface LatencyMs {
  first_token: number;
  total: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: ChatSource[];
  guardrailFlags?: string[];
  isStreaming: boolean;
  isError?: boolean;
}

export interface SessionStartResponse {
  session_id: string;
  visitor_token: string;
  returning_visitor: boolean;
  show_consent_prompt: boolean;
  greeting: string;
  returning_session?: boolean;
  messages?: { role: "user" | "assistant"; content: string }[];
}

export interface HandoffResponse {
  within_hours: boolean;
  hours_note: string;
  whatsapp_link: string;
  email: string;
  expected_response: string;
}
