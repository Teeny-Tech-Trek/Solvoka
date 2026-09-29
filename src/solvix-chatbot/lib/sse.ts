// Minimal SSE-over-fetch parser. We can't use the native EventSource API
// because it only supports GET — /api/chat needs a POST body (session_id,
// message, consent_memory) per docs/API-CONTRACTS.md Section 1.
//
// Tolerant by design (AGENT-INSTRUCTIONS.md Section 3 — "streaming
// rendering should tolerate partial/out-of-order SSE events gracefully"):
// a chunk boundary can split a frame mid-line, so frames are only
// yielded once a full blank-line-terminated block has arrived; a
// malformed `data:` payload is skipped (logged, not thrown) rather than
// aborting the whole stream; an unrecognized `event:` name is passed
// through as-is so the caller decides whether to ignore it.

export interface SSEEvent {
  event: string;
  data: unknown;
}

export async function* parseSSEStream(response: Response): AsyncGenerator<SSEEvent> {
  if (!response.body) {
    throw new Error("Response has no readable body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let boundary = buffer.indexOf("\n\n");
      while (boundary !== -1) {
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);

        const parsed = parseFrame(frame);
        if (parsed) yield parsed;

        boundary = buffer.indexOf("\n\n");
      }
    }

    // Flush a trailing frame that never got a closing blank line.
    if (buffer.trim()) {
      const parsed = parseFrame(buffer);
      if (parsed) yield parsed;
    }
  } finally {
    reader.releaseLock();
  }
}

function parseFrame(frame: string): SSEEvent | null {
  let eventName = "message";
  const dataLines: string[] = [];

  for (const line of frame.split("\n")) {
    if (line.startsWith("event:")) {
      eventName = line.slice("event:".length).trim();
    } else if (line.startsWith("data:")) {
      dataLines.push(line.slice("data:".length).trim());
    }
  }

  if (dataLines.length === 0) return null;

  const rawData = dataLines.join("\n");
  try {
    return { event: eventName, data: JSON.parse(rawData) };
  } catch {
    console.warn("[solvix] skipping malformed SSE frame", rawData);
    return null;
  }
}
