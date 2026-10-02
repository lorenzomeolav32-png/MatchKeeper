"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Message = {
  id: string;
  sender_id: string;
  body: string;
  created_at: string;
};

export default function ChatPanel({
  matchId,
  currentUserId,
  initialMessages,
}: {
  matchId: string;
  currentUserId: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`messages:${matchId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `match_id=eq.${matchId}`,
        },
        (payload) => {
          const incoming = payload.new as Message;
          setMessages((prev) =>
            prev.some((m) => m.id === incoming.id) ? prev : [...prev, incoming],
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;

    setSending(true);
    setError(null);

    const { data: inserted, error: insertError } = await supabase
      .from("messages")
      .insert({ match_id: matchId, sender_id: currentUserId, body: text })
      .select("id, sender_id, body, created_at")
      .single();

    setSending(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    if (inserted) {
      setMessages((prev) =>
        prev.some((m) => m.id === inserted.id) ? prev : [...prev, inserted],
      );
    }
    setBody("");
  }

  return (
    <section className="mt-8">
      <h2 className="font-display text-lg font-bold text-fg">Chat</h2>

      <div className="card-surface mt-3 flex max-h-80 flex-col gap-2 overflow-y-auto rounded-2xl p-4">
        {messages.length === 0 && (
          <p className="text-sm text-muted">No messages yet.</p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.sender_id === currentUserId
                ? "self-end rounded-lg bg-accent px-3 py-2 text-sm text-accent-ink"
                : "self-start rounded-lg bg-surface-2 px-3 py-2 text-sm"
            }
          >
            {m.body}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-lg border border-line bg-bg-2 px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-ink disabled:opacity-60"
        >
          Send
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </section>
  );
}
