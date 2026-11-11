/**
 * Handzeichen-Mitmach-Umfrage je Beruf. Die Decks erzeugt scripts/handzeichen-decks.mjs aus data/berufe.ts,
 * der Handzeichen-Server legt sie unter dem festen Link an. Eigene Links bei Handzeichen haben höchstens
 * 40 Zeichen, deshalb sind zwei Berufe gekürzt.
 */
const KURZ: Record<string, string> = {
  "elektroniker-energie-gebaeudetechnik": "elektroniker-gebaeudetechnik",
  "fachinformatiker-anwendungsentwicklung": "fachinformatiker-anwendung",
};

export const handzeichenLink = (slug: string) => `beruf-${KURZ[slug] ?? slug}`;

/** Mitmach-Ansicht: abstimmen und sehen, wie andere abgestimmt haben. */
export const handzeichenUrl = (slug: string) => `https://handzeichen.com/m/${handzeichenLink(slug)}`;
