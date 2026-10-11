export interface PraxisBeispiel {
  id: string;
  titel: string;
  berufSlug?: string;
  berufTitel: string;
  ort: string;
  zeitpunkt: string;
  medium: string;
  url: string;
  teaser: string;
  wasMachtDieKI: string;
  wasBleibtMenschlich: string;
  diskussionsFrage: string;
  video?: { id: string; titel: string; quelle: string; hinweis?: string };
}

export const praxisBeispiele: PraxisBeispiel[] = [
  {
    id: "rewe-supermarkt-roboter-ahlen",
    titel: "Roboter „Rob“ hilft Kund:innen im Supermarkt",
    berufSlug: "einzelhandelskaufmann",
    berufTitel: "Kaufmann/-frau im Einzelhandel",
    ort: "Ahlen, NRW",
    zeitpunkt: "Aktuell",
    medium: "Westfälische Nachrichten",
    url: "https://www.wn.de/muensterland/kreis-warendorf/ahlen/roboter-supermarkt-rewe-gilke-hilfe-attraktion-2912353?pid=true&ueg=default",
    teaser:
      "Im REWE-Markt Gilke in Ahlen rollt ein autonomer Serviceroboter durch die Gänge: Er führt Kund:innen zu gesuchten Produkten, spielt Sonderangebote ab und entlastet das Personal von Standard-Fragen.",
    wasMachtDieKI:
      "Wegeführung im Markt („Wo steht das Mehl?“), Navigieren durch Gänge und Ausspielen von Durchsagen.",
    wasBleibtMenschlich:
      "Warenpräsentation, Reklamationen, persönliche Beratung an der Frischetheke, Einräumen und die soziale Atmosphäre im Markt.",
    diskussionsFrage:
      "Nimmt der Roboter dem Verkaufspersonal die Arbeit weg – oder nimmt er die nervigsten Routinefragen ab, damit mehr Zeit für echte Kundengespräche bleibt?",
    video: { id: "aiTFvqoSj1E", titel: "Putzroboter sorgt im Supermarkt für Sauberkeit", quelle: "SWR Landesschau Baden-Württemberg", hinweis: "Ein verwandter Fall: ein anderer Roboter, derselbe Alltag im Supermarkt." },
  },
  {
    id: "arztpraxis-ki-telefon-anamnese",
    titel: "KI-Telefonassistenz und Vorab-Anamnese in der Arztpraxis",
    berufSlug: "medizinische-fachangestellte",
    berufTitel: "Medizinische:r Fachangestellte:r",
    ort: "Bundesweit (u. a. Virchowbund Praxistests)",
    zeitpunkt: "Aktuell",
    medium: "Virchowbund & Fachberichte",
    url: "https://www.virchowbund.de",
    teaser:
      "Immer mehr Praxen nutzen KI-gestützte Telefonassistenten (wie Aaron.ai oder Doctolib-KI) und digitale Aufnahme-Tools: Standardanfragen nach Rezepten und Terminen werden automatisch erfasst, während das Telefon nicht mehr dauerhaft klingelt.",
    wasMachtDieKI:
      "Telefonstimme nimmt Rezeptwünsche und Terminanfragen auf, transkribiert Symptome und sortiert sie strukturiert ins Praxissystem.",
    wasBleibtMenschlich:
      "Die direkte Betreuung nervöser Patient:innen im Wartezimmer, Blutabnahme, Assistenz bei Behandlungen und das Erkennen von echten Notfällen im Empfangsbereich.",
    diskussionsFrage:
      "Warum ist das Telefon in Praxen oft die größte Stressquelle für MFAs – und warum ist es für Patient:innen trotzdem wichtig, am Tresen von einem echten Menschen empfangen zu werden?",
  },
  {
    id: "gastro-bellabot-servierroboter",
    titel: "Katzen-Roboter „BellaBot“ serviert im Restaurant",
    berufSlug: "hotelfachmann",
    berufTitel: "Hotelfachmann/-frau & Gastronomie",
    ort: "Zahlreiche Restaurants in DE (u. a. Pforzheim, Köln, Osnabrück)",
    zeitpunkt: "Aktuell",
    medium: "Gastronomie & Regionalmedien",
    url: "https://www.dehoga-bundesverband.de",
    teaser:
      "Serviceroboter mit Katzengesicht bringen schwere Tabletts mit bis zu vier Tellern gleichzeitig aus der Küche an den Tisch und fahren gebrauchtes Geschirr zurück zur Spülküche.",
    wasMachtDieKI:
      "Autonomes Navigieren zwischen engen Tischen mit Sensorik, schwere Teller tragen und repetitive Laufwege zwischen Küche und Gastraum abnehmen.",
    wasBleibtMenschlich:
      "Die herzliche Begrüßung, Weinberatung, Sonderwünsche aufnehmen, Beschwerden lösen und das Gefühl von Gastfreundschaft vermitteln.",
    diskussionsFrage:
      "Macht der Roboter das Restaurant unpersönlicher – oder ermöglicht er es den Kellner:innen erst, weniger gestresst bei den Gästen am Tisch zu sein?",
    video: { id: "YqraKGOBN2I", titel: "BellaBot: Gastro-Roboter im Einsatz", quelle: "ZDF Drehscheibe (hochgeladen von Alpha11)" },
  },
  {
    id: "pflege-exoskelette-und-hebehilfen",
    titel: "Aktive Exoskelette beim Heben und Betten in Kliniken",
    berufSlug: "pflegefachkraft",
    berufTitel: "Pflegefachkraft",
    ort: "BG Kliniken & Pflegeheime in DE",
    zeitpunkt: "Aktuell",
    medium: "Berufsgenossenschaft & Pflegeforschung",
    url: "https://www.bg-kliniken.de",
    teaser:
      "Pflegekräfte testen sensorunterstützte Exoskelette am Rücken, die beim Heben von Patient:innen und bei gebeugter Haltung bis zu 30 kg Last von der Lendenwirbelsäule nehmen.",
    wasMachtDieKI:
      "Sensoren erkennen in Millisekunden die Körperbeugung und Motoren federn die mechanische Last bei schweren Hebebewegungen ab.",
    wasBleibtMenschlich:
      "Jede einzelne Berührung, das Eingehen auf Schmerzen, das Beruhigen von Patient:innen und das empathische Gespräch bei der Pflege.",
    diskussionsFrage:
      "Warum können Roboter zwar beim Heben den Rücken entlasten, aber das eigentliche Waschen und Trösten niemals selbstständig übernehmen?",
    video: { id: "ni1yB2Im0pQ", titel: "Exoskelette: Der Pflege den Rücken stärken", quelle: "Projekt EXPERTISE 4.0" },
  },
  {
    id: "handwerk-holz-spritzroboter",
    titel: "Cobots und KI-Lackierhilfen in Schreinereien",
    berufSlug: "tischler",
    berufTitel: "Tischler:in",
    ort: "Handwerkskammern & innovative Tischlereien",
    zeitpunkt: "Aktuell",
    medium: "Deutsche Handwerks Zeitung",
    url: "https://www.deutsche-handwerks-zeitung.de",
    teaser:
      "Kollaborierende Roboterarme (Cobots) lackieren in Tischlereien Fensterrahmen und Möbeloberflächen mit mikrometergenauer Gleichmäßigkeit – während der Meister nebenan Unikate entwirft.",
    wasMachtDieKI:
      "Stundenlanges, giftiges und monotones Spritzlackieren mit gleichbleibender Schichtdicke ohne Ermüdung.",
    wasBleibtMenschlich:
      "Holzauswahl, Maserungs-Beurteilung, kreativer Möbelentwurf, Kundenberatung vor Ort und die individuelle Montage beim Kunden.",
    diskussionsFrage:
      "Wird der Tischlerberuf durch Lackier-Roboter weniger handwerklich – oder befreit es Handwerker von gesundheitsschädlicher Monotonie?",
  },
  {
    id: "anwaltskanzlei-vertragsanalyse-harvey",
    titel: "KI-Vertragsprüfung und Aktenanalyse in Großkanzleien",
    berufSlug: "rechtsanwaltsfachangestellte",
    berufTitel: "Rechtsanwalts- und Notarfachangestellte:r (ReNo)",
    ort: "Wirtschaftskanzleien in Frankfurt, Hamburg, Düsseldorf",
    zeitpunkt: "Aktuell",
    medium: "Legal Tribune Online (LTO)",
    url: "https://www.lto.de",
    teaser:
      "Spezialisierte juristische KI-Systeme durchforsten tausendseitige Vertragswerke in Sekunden nach strittigen Klauseln, Fristen und Haftungsrisiken.",
    wasMachtDieKI:
      "Extrahieren von Klauseln, Abgleich mit Standardtexten, Auffinden von Widersprüchen in riesigen Aktenbergen.",
    wasBleibtMenschlich:
      "Verhandlungsstrategie vor Gericht, Mandantengespräche in emotional aufgeladenen Situationen, ethische Abwägungen und die juristische Endverantwortung.",
    diskussionsFrage:
      "Wenn eine KI Verträge in Sekunden scannt: Verändert sich dadurch der Einstieg für junge Jurist:innen und Fachangestellte, die früher genau das gelernt haben?",
  },
];
