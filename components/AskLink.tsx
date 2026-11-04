import type { ReactNode } from "react";
import { askMessage } from "@/lib/placeholders";
import { waLink } from "@/lib/whatsapp";

/** Bilinmeyen bilgi için uydurma yerine doğal yönlendirme: soru hazır gelir. */
export function AskLink({ question, children = "WhatsApp'tan sorun" }: { question: string; children?: ReactNode }) {
  return (
    <a
      href={waLink(askMessage(question))}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
    >
      {children}
      <span className="sr-only"> (yeni sekmede açılır)</span>
    </a>
  );
}
