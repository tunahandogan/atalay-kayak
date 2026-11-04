const PLACEHOLDER = /\[DOLDURULACAK[^\]]*\]/;

/** İçerikteki "[DOLDURULACAK: …]" yer tutucusu mu? */
export function isOpen(text: string): boolean {
  return PLACEHOLDER.test(text);
}

/** Yer tutucunun öncesindeki doğrulanmış kısım: "08:00 – [DOLDURULACAK: kapanış]" -> "08:00" */
export function knownPart(text: string): string {
  return text.split(PLACEHOLDER)[0].replace(/[\s–-]+$/, "");
}

/** Bir soru için hazır WhatsApp mesajı */
export function askMessage(question: string): string {
  return `Merhaba, web sitenizden yazıyorum. ${question}`;
}
