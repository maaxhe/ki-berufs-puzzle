export type PraxisKategorie =
  | "medizin"
  | "forschung"
  | "handel-service"
  | "handwerk-bau"
  | "verkehr"
  | "buero-it"
  | "bildung";

export const praxisKategorien: { id: PraxisKategorie; titel: string; beschreibung: string }[] = [
  { id: "medizin", titel: "Medizin & Pflege", beschreibung: "Praxis, Klinik, Rettungsdienst und Diagnostik" },
  { id: "forschung", titel: "Forschung & Wissenschaft", beschreibung: "Wo KI neue Erkenntnisse und Medikamente möglich macht" },
  { id: "handel-service", titel: "Handel, Gastronomie & Service", beschreibung: "Supermarkt, Restaurant und Küche" },
  { id: "handwerk-bau", titel: "Handwerk, Bau & Landwirtschaft", beschreibung: "Werkstatt, Baustelle und Acker" },
  { id: "verkehr", titel: "Verkehr & Mobilität", beschreibung: "Lkw und Taxi ohne Fahrer an Bord" },
  { id: "buero-it", titel: "Büro, Recht, Finanzen & IT", beschreibung: "Verträge, Beratung und Software" },
  { id: "bildung", titel: "Bildung & Schule", beschreibung: "Unterricht und Lernen mit KI" },
];

export interface PraxisBeispiel {
  id: string;
  kategorie: PraxisKategorie;
  titel: string;
  berufSlug?: string;
  /** Wenn es keinen eigenen Beruf-Quiz gibt: nächstliegende Berufe, die man stattdessen sortieren kann. */
  verwandteBerufSlugs?: string[];
  /** Studiengänge, bei denen dieser Fall ebenfalls zeigt, wohin sich der Berufsalltag entwickelt. */
  studiengangSlugs?: string[];
  berufTitel: string;
  ort: string;
  zeitpunkt: string;
  medium: string;
  url: string;
  teaser: string;
  wasMachtDieKI: string;
  wasBleibtMenschlich: string;
  diskussionsFrage: string;
  /** Hinweis, wenn der Fall Automatisierung statt KI im engeren Sinn zeigt. */
  einordnung?: string;
  video?: { id: string; titel: string; quelle: string; hinweis?: string };
}

export const praxisBeispiele: PraxisBeispiel[] = [
  {
    id: "rewe-supermarkt-roboter-ahlen",
    kategorie: "handel-service",
    titel: "Roboter „Rob“ hilft Kund:innen im Supermarkt",
    berufSlug: "einzelhandelskaufmann",
    studiengangSlugs: ["betriebswirtschaftslehre"],
    berufTitel: "Kaufmann/-frau im Einzelhandel",
    ort: "Ahlen, NRW",
    zeitpunkt: "Stand 2024",
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
    kategorie: "medizin",
    titel: "KI-Telefonassistenz und Vorab-Anamnese in der Arztpraxis",
    berufSlug: "medizinische-fachangestellte",
    studiengangSlugs: ["medizin"],
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
    video: { id: "CvmFobMmoU4", titel: "KI-Ordinationshilfen: Arztpraxen automatisieren den Erstkontakt", quelle: "ZIB Magazin (ORF)", hinweis: "Beitrag aus Österreich, die Entwicklung ist dieselbe wie in deutschen Praxen." },
  },
  {
    id: "gastro-bellabot-servierroboter",
    kategorie: "handel-service",
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
    kategorie: "medizin",
    titel: "Aktive Exoskelette beim Heben und Betten in Kliniken",
    berufSlug: "pflegefachkraft",
    studiengangSlugs: ["medizin"],
    berufTitel: "Pflegefachkraft",
    ort: "BG Kliniken & Pflegeheime in DE",
    zeitpunkt: "Aktuell",
    medium: "Berufsgenossenschaft & Pflegeforschung",
    url: "https://www.bg-kliniken.de",
    einordnung:
      "Sensoren steuern die Unterstützung. Das ist Regelungstechnik, kein KI-Modell im engeren Sinn.",
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
    kategorie: "handwerk-bau",
    titel: "Cobots helfen beim Lackieren in Schreinereien",
    berufSlug: "tischler",
    berufTitel: "Tischler:in",
    ort: "Handwerkskammern & innovative Tischlereien",
    zeitpunkt: "Aktuell",
    medium: "Deutsche Handwerks Zeitung",
    url: "https://www.deutsche-handwerks-zeitung.de",
    einordnung:
      "Der Cobot fährt programmierte Bahnen ab. Das ist Automatisierung, keine KI im engeren Sinn.",
    teaser:
      "Kollaborierende Roboterarme (Cobots) lackieren in Tischlereien Fensterrahmen und Möbeloberflächen mit mikrometergenauer Gleichmäßigkeit – während der Meister nebenan Unikate entwirft.",
    wasMachtDieKI:
      "Stundenlanges, giftiges und monotones Spritzlackieren mit gleichbleibender Schichtdicke ohne Ermüdung.",
    wasBleibtMenschlich:
      "Holzauswahl, Maserungs-Beurteilung, kreativer Möbelentwurf, Kundenberatung vor Ort und die individuelle Montage beim Kunden.",
    diskussionsFrage:
      "Wird der Tischlerberuf durch Lackier-Roboter weniger handwerklich – oder befreit es Handwerker von gesundheitsschädlicher Monotonie?",
    video: { id: "aGVGgnBvA8s", titel: "Cobots für Tischler und Schreiner", quelle: "BM TV – Matthias checkt’s", hinweis: "Zeigt einen Cobot in der Schreinerei, nicht speziell das Lackieren." },
  },
  {
    id: "anwaltskanzlei-vertragsanalyse-harvey",
    kategorie: "buero-it",
    titel: "KI-Vertragsprüfung und Aktenanalyse in Großkanzleien",
    berufSlug: "rechtsanwaltsfachangestellte",
    studiengangSlugs: ["jura"],
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
    video: { id: "SzljgvXeM28", titel: "KI im Vertragsmanagement: 2.000 Verträge in 30 Sekunden analysiert", quelle: "Genius Bytes Software Solutions", hinweis: "Produktvorstellung eines Anbieters: zeigt, was die Technik kann, nicht wie unabhängig sie bewertet wird." },
  },
  {
    id: "lkw-fernride-teleoperation",
    kategorie: "verkehr",
    titel: "Lkw ohne Fahrer an Bord – gesteuert aus der Ferne",
    berufSlug: "berufskraftfahrer",
    studiengangSlugs: ["maschinenbau"],
    berufTitel: "Berufskraftfahrer:in",
    ort: "HHLA & Fernride (Hamburg / Terminal Tallinn)",
    zeitpunkt: "Stand 2023",
    medium: "Verkehrsrundschau",
    url: "https://www.verkehrsrundschau.de/nachrichten/lager-umschlag/hhla-und-fernride-bauen-autonomen-gueterverkehr-aus-3397556",
    teaser:
      "Das Münchner Start-up Fernride rüstet Zugmaschinen mit Kameras und Sensoren aus. Im Test am HHLA-Terminal in Tallinn (Estland) fahren sie ferngesteuert ohne Fahrer an Bord, bei schwierigen Situationen steuert ein Teleoperator per Mobilfunk von einem Bildschirmarbeitsplatz aus.",
    wasMachtDieKI:
      "Containerfahrten auf dem Terminalgelände, immer gleiche Strecken, Fahren bei Nacht und im Schichtbetrieb ohne Ermüdung.",
    wasBleibtMenschlich:
      "Eingreifen bei Sonderfällen aus der Ferne, Verantwortung für Ladung und Sicherheit, Fahren auf öffentlichen Straßen, Be- und Entladen sowie der Kontakt zu Kunden und Disponenten.",
    diskussionsFrage:
      "Wenn ein Mensch mehrere Lkw von einem Bildschirm aus betreut: Ist das noch Fahren – und wäre das ein Beruf, den du dir vorstellen könntest?",
    video: { id: "1OZe7RNltDQ", titel: "Fernride – fahrerlose Technologie aus Deutschland", quelle: "European Investment Fund (englisch)" },
  },
  {
    id: "robotaxi-moia-hamburg",
    kategorie: "verkehr",
    titel: "Selbstfahrender ID. Buzz bringt Fahrgäste durch Hamburg",
    berufTitel: "Taxi- und Fahrdienst-Fahrer:in",
    ort: "Hamburg",
    zeitpunkt: "Stand 2024",
    medium: "AUTO BILD",
    url: "https://www.autobild.de/artikel/erste-fahrgaeste-im-selbstfahrenden-id-buzz-meldung-25636531.html",
    teaser:
      "MOIA, die Fahrdienst-Tochter von Volkswagen, testet in Hamburg den autonomen ID. Buzz AD. Ausgewählte, vorab registrierte Fahrgäste buchen ihn über die MOIA-App. Zunächst war ein Sicherheitsfahrer an Bord, der nur im Notfall eingreift – später soll er entfallen.",
    wasMachtDieKI:
      "Lenken, Bremsen und Spurwechsel im Stadtverkehr, Erkennen von Ampeln, Radfahrenden und Fußgängern, Routenplanung.",
    wasBleibtMenschlich:
      "Hilfe beim Einsteigen mit Rollator oder Gepäck, Ansprechperson bei Problemen und Notfällen, Ortskenntnis in Sonderlagen, ein Gespräch unterwegs.",
    diskussionsFrage:
      "Würdest du nachts allein in ein Auto ohne Fahrer steigen – und was müsste passieren, damit du dich sicher fühlst?",
    video: { id: "KX9Y4stS76s", titel: "MOIA-Busse ohne Fahrer in Hamburg unterwegs", quelle: "SAT.1 REGIONAL" },
  },
  {
    id: "koch-rewe-kochroboter",
    kategorie: "handel-service",
    titel: "Zwei Roboterarme kochen im Supermarkt",
    berufSlug: "koch",
    berufTitel: "Koch/Köchin",
    ort: "REWE in Düsseldorf",
    zeitpunkt: "Aktuell",
    medium: "Business Punk",
    url: "https://www.business-punk.com/tech/roboter-koch-uebernimmt-bei-rewe-ki-serviert-120-mahlzeiten-pro-stunde/",
    teaser:
      "In einem Düsseldorfer REWE-Markt bereitet der KI-Roboter CA-1 hinter einer Glasscheibe Gerichte zu. Kund:innen wählen eines der angebotenen Gerichte, der Roboter schneidet, erhitzt, serviert und reinigt seine Utensilien selbst.",
    wasMachtDieKI:
      "Immer gleiche Rezepte nach Bestellung: Zutaten schneiden, braten, portionieren, servieren und die Küchenwerkzeuge säubern.",
    wasBleibtMenschlich:
      "Eigene Rezepte entwickeln, Geschmack abschmecken und anpassen, auf Unverträglichkeiten und Sonderwünsche eingehen, Menüplanung und Warenkunde, Improvisieren, wenn etwas fehlt.",
    diskussionsFrage:
      "Ein Roboter kocht seine Gerichte immer gleich gut. Was kann eine Köchin oder ein Koch, das darüber hinausgeht?",
    video: { id: "vows9BODG7M", titel: "Düsseldorfer Rewe präsentiert KI-Kochroboter", quelle: "RTL West" },
  },
  {
    id: "landwirt-feldroboter-unkraut",
    kategorie: "handwerk-bau",
    titel: "Autonomer Roboter jätet Unkraut ohne Chemie",
    berufSlug: "landwirt",
    studiengangSlugs: ["nachhaltigkeitswissenschaft"],
    berufTitel: "Landwirt:in",
    ort: "Höfe in Deutschland (Farming Revolution u. a.)",
    zeitpunkt: "Aktuell",
    medium: "KfW Stories",
    url: "https://www.kfw.de/stories/wirtschaft/gruenden/farming-revolution/",
    teaser:
      "Das Start-up Farming Revolution baut einen Feldroboter, der mit Hilfe von KI auf dem Acker Unkraut entfernt. Nach Angaben des Gründers rechnet er sich für Biobetriebe in ein bis zwei Jahren, für konventionelle Betriebe in drei bis fünf. Für kleinere Höfe gibt es ihn auch zur Miete.",
    wasMachtDieKI:
      "Stundenlang Reihen abfahren, Bilder auswerten, Unkraut erkennen und gezielt entfernen, ohne Spritzmittel.",
    wasBleibtMenschlich:
      "Entscheiden, was wann angebaut wird, Boden und Wetter einschätzen, Technik warten und einrichten, Tiere versorgen, den Betrieb wirtschaftlich führen.",
    diskussionsFrage:
      "Der Roboter ersetzt Handarbeit auf dem Acker. Verändert das den Beruf eher in Richtung Technik – und wärst du dafür der richtige Typ?",
    video: { id: "z22WSxc6Xm4", titel: "Revolution auf dem Acker? Ein Feldroboter gegen Unkraut ohne Gift", quelle: "BR – Schwaben + Altbayern" },
  },
  {
    id: "maurer-3d-druck-wallenhausen",
    kategorie: "handwerk-bau",
    titel: "Ein Mehrfamilienhaus aus dem 3D-Drucker",
    berufSlug: "maurer",
    studiengangSlugs: ["architektur"],
    berufTitel: "Maurer:in",
    ort: "Wallenhausen, Bayern",
    zeitpunkt: "Fertiggestellt",
    medium: "Handwerksblatt",
    url: "https://www.handwerksblatt.de/betriebsfuehrung/3d-gebaeudedruck-wallenhausen-rupp-gebaeudedruck-peri-cobod",
    einordnung:
      "Der Drucker folgt einem vorgegebenen Bauplan. Das ist Automatisierung, keine KI: Er lernt nichts und entscheidet nichts selbst. Den Beruf verändert er trotzdem.",
    teaser:
      "In Wallenhausen entstand ein Fünf-Familienhaus mit drei Stockwerken, dessen Wände ein 3D-Betondrucker Schicht für Schicht aufgebaut hat. Die reine Druckzeit lag bei 72 Stunden. Einschließlich Rüstzeiten waren es laut Bauunternehmer etwa fünf Wochen.",
    wasMachtDieKI:
      "Die Wände präzise Schicht für Schicht drucken und dabei Öffnungen für Fenster, Türen und Leitungen aussparen.",
    wasBleibtMenschlich:
      "Baustelle einrichten, Drucker aufbauen und bedienen, Decken und Bodenplatte als Fertigteile einsetzen, Fenster, Türen, Elektrik und Ausbau, Qualität prüfen.",
    diskussionsFrage:
      "Wenn die Wände gedruckt werden: Was an einer Baustelle braucht trotzdem Menschen mit Erfahrung?",
    video: { id: "zLbVrC8V2TE", titel: "Das erste 3D gedruckte Mehrfamilienhaus Deutschlands", quelle: "mobiheat Reportage" },
  },
  {
    id: "bank-ki-assistent-sparkasse",
    kategorie: "buero-it",
    titel: "KI-Assistent unterstützt Berater:innen in der Sparkasse",
    berufSlug: "bankkaufmann",
    studiengangSlugs: ["betriebswirtschaftslehre"],
    berufTitel: "Bankkaufmann/-frau",
    ort: "Sparkassen in Deutschland",
    zeitpunkt: "Aktuell",
    medium: "IT Finanzmagazin",
    url: "https://www.it-finanzmagazin.de/?p=245306",
    teaser:
      "Der IT-Dienstleister der Sparkassen hat den KI-Assistenten „S-KIPilot“ ausgebaut. Er ist tief in das Kernbankensystem eingebunden und soll Berater:innen unter anderem bei der Vorbereitung von Gesprächen unterstützen.",
    wasMachtDieKI:
      "Kundendaten zusammenfassen, Informationen zu Konten, Umsätzen und Verträgen aufbereiten und Gespräche vorbereiten.",
    wasBleibtMenschlich:
      "Das Beratungsgespräch selbst, Vertrauen aufbauen, die persönliche Lebenssituation verstehen, Verantwortung für die Empfehlung und der Umgang mit Kund:innen in Krisen.",
    diskussionsFrage:
      "Bei Geld geht es um Vertrauen. Würdest du lieber von einem Menschen beraten werden, der eine KI nutzt, oder direkt von der KI?",
    video: { id: "phDaiXysZDM", titel: "Artificial Banking. Entscheidet die KI bald über meinen Kredit?", quelle: "WU Wien", hinweis: "Allgemeiner Beitrag zu KI im Bankwesen aus Österreich, nicht speziell zum Sparkassen-Assistenten." },
  },
  {
    id: "notfall-ki-leitstelle",
    kategorie: "medizin",
    titel: "KI hilft in der Leitstelle, den Einsatzort zu finden",
    berufSlug: "notfallsanitaeter",
    studiengangSlugs: ["medizin"],
    berufTitel: "Notfallsanitäter:in",
    ort: "Ravensburg (DRK-Pilotprojekt)",
    zeitpunkt: "Testphase",
    medium: "Schwäbische Zeitung (dpa)",
    url: "https://www.schwaebische.de/regional/baden-wuerttemberg/wie-kuenstliche-intelligenz-bei-notrufen-helfen-koennte-4113290",
    teaser:
      "Im Projekt „112 – KI rettet Leben“ erprobte der DRK-Rettungsdienst in Ravensburg, wie eine KI aus den Angaben von Anrufenden mögliche Einsatzorte eingrenzt. In Testläufen mit erfundenen Notrufen sank die Zahl der infrage kommenden Orte von rund 20 auf drei. Das Projekt lief in einer Testumgebung und ist nicht an die echte Leitstelle angeschlossen.",
    wasMachtDieKI:
      "Ortsangaben von Anrufenden mit Kartendaten abgleichen und mögliche Einsatzorte vorschlagen.",
    wasBleibtMenschlich:
      "Entscheiden, welche Hilfe losgeschickt wird, Anrufende am Telefon beruhigen, am Einsatzort Menschen versorgen, in Sekunden Lage und Gefahr einschätzen und Verantwortung tragen.",
    diskussionsFrage:
      "Eine KI kann Orte eingrenzen. Wer sollte bei einem Notruf am Ende entscheiden, und warum?",
    video: { id: "hRYBa5nvBng", titel: "Feuerwehr-Leitstelle: Der erste Kontaktpunkt bei Notfällen", quelle: "WDR – Feuer & Flamme", hinweis: "Hier geht es nicht um KI. Das Video zeigt, wie wichtig die Arbeit in der Leitstelle ist und wo die KI sie unterstützen kann." },
  },
  {
    id: "pathologie-ki-gewebeanalyse",
    kategorie: "medizin",
    titel: "KI markiert Tumorgewebe auf digitalen Gewebeschnitten",
    verwandteBerufSlugs: ["medizinische-fachangestellte", "pflegefachkraft"],
    studiengangSlugs: ["medizin", "biologie"],
    berufTitel: "Pathologe/Pathologin",
    ort: "Charité Berlin & TU Berlin",
    zeitpunkt: "Stand 2020, Entwicklung und Erprobung",
    medium: "Deutsches Ärzteblatt",
    url: "https://www.aerzteblatt.de/nachrichten/112337/Digitales-Bildanalysesystem-unterstuetzt-Pathologen-bei-Beurteilung-mikroskopischer-Praeparate",
    teaser:
      "Das Pathologische Institut der Charité hat gemeinsam mit der TU Berlin ein Bildanalysesystem entwickelt, das mikroskopische Aufnahmen beurteilt. Die Software lernt aus tausenden digitalen Gewebeschnitten, in denen Pathologen krankhafte Veränderungen markiert haben, und unterscheidet so zum Beispiel Tumorgewebe von gesundem Gewebe.",
    wasMachtDieKI:
      "Gewebeschnitte durchsuchen, Tumorgewebe von gesundem Gewebe unterscheiden und per Heatmap zeigen, welche Bildbereiche für die Einordnung ausschlaggebend waren.",
    wasBleibtMenschlich:
      "Die Diagnose und die Verantwortung dafür, das Einordnen unklarer Befunde, die Abstimmung mit den behandelnden Ärzt:innen und das Training der KI: Die Markierungen, aus denen sie lernt, stammen von Pathologen.",
    diskussionsFrage:
      "Eine KI kann tausende Bilder ermüdungsfrei prüfen. Was spricht trotzdem dafür, dass am Ende ein Mensch den Befund unterschreibt, von dem eine Krebsdiagnose abhängt?",
    einordnung:
      "Die Meldung stammt aus dem Jahr 2020 und beschreibt ein Forschungsprojekt. Wie weit solche Systeme heute im Routinebetrieb sind, ist je nach Institut unterschiedlich.",
    video: { id: "k0bCKnxFKA8", titel: "KI-basierte Diagnoseunterstützung in der digitalen Pathologie", quelle: "Fraunhofer IIS", hinweis: "Video eines Forschungsinstituts zur digitalen Pathologie, nicht zum Charité-System." },
  },
  {
    id: "radiologie-mammografie-screening-praim",
    kategorie: "medizin",
    titel: "KI als zweite Meinung beim Brustkrebs-Screening",
    verwandteBerufSlugs: ["medizinische-fachangestellte", "pflegefachkraft"],
    studiengangSlugs: ["medizin"],
    berufTitel: "Radiolog:in",
    ort: "12 Screening-Standorte in Deutschland (PRAIM-Studie)",
    zeitpunkt: "Studie, veröffentlicht 2025",
    medium: "Pharmazeutische Zeitung",
    url: "https://www.pharmazeutische-zeitung.de/ki-verbessert-brustkrebsscreening-signifikant-152367/",
    teaser:
      "In einer Studie mit 463.094 Frauen zwischen 50 und 69 Jahren werteten Radiolog:innen einen Teil der Mammografien mit KI-Unterstützung aus. Mit KI stieg die Entdeckungsrate von 5,7 auf 6,7 Brustkrebsfälle pro 1.000 Frauen, die Zahl der Rückrufe sank leicht.",
    wasMachtDieKI:
      "Mammografien auf verdächtige Stellen prüfen und die Radiolog:innen auf Auffälligkeiten hinweisen.",
    wasBleibtMenschlich:
      "Die endgültige Befundung, das Gespräch mit Frauen nach einem auffälligen Ergebnis, die Entscheidung über weitere Untersuchungen und die Verantwortung für Fehler in beide Richtungen.",
    diskussionsFrage:
      "Bisher schauen zwei Radiolog:innen auf jedes Bild. Wäre dir ein Mensch plus KI genauso recht, und was würde sich für dich ändern, wenn der Mensch nur noch bei Auffälligkeiten hinsieht?",
    einordnung:
      "Die Teilnahme der Radiolog:innen an der KI-Nutzung war freiwillig, und es war keine Studie mit zufälliger Zuteilung. Die Zahlen zeigen daher einen Zusammenhang, der Vergleich ist nicht perfekt.",
    video: { id: "-Jp4eI1E-XQ", titel: "How radiologists are using AI to detect breast cancer", quelle: "CBS Los Angeles (englisch)", hinweis: "Englisch, Fernsehbeitrag aus den USA. Radiolog:innen zeigen, wie sie KI beim Brustkrebs-Screening im Alltag nutzen." },
  },
  {
    id: "pharma-ki-wirkstoffforschung-rentosertib",
    kategorie: "forschung",
    titel: "Ein mit KI entworfener Wirkstoff wirkt in der klinischen Studie",
    studiengangSlugs: ["pharmazie", "chemie"],
    berufTitel: "Pharmazeut:in & Chemiker:in",
    ort: "22 Studienzentren in China (Insilico Medicine)",
    zeitpunkt: "Studie, veröffentlicht 2025",
    medium: "BioSpace (Pressemitteilung von Insilico, Fachartikel in Nature Medicine)",
    url: "https://www.biospace.com/press-releases/insilico-medicine-announces-nature-medicine-publication-of-phase-iia-results-evaluating-rentosertib-the-novel-tnik-inhibitor-for-idiopathic-pulmonary-fibrosis-ipf-discovered-and-designed-with-a-pioneering-ai-approach",
    teaser:
      "Der Wirkstoff Rentosertib gegen die Lungenerkrankung idiopathische Lungenfibrose wurde mit Hilfe generativer KI gefunden und entworfen. In einer Phase-IIa-Studie mit 71 Patient:innen stieg die Lungenfunktion in der 60-mg-Gruppe im Mittel um 98 ml, unter Placebo sank sie um 20 ml.",
    wasMachtDieKI:
      "Ein Zielmolekül im Körper vorschlagen (TNIK) und passende Wirkstoffmoleküle entwerfen, die sonst in langen Testreihen im Labor gesucht würden.",
    wasBleibtMenschlich:
      "Die Synthese und Prüfung im Labor, das Design und die Leitung der klinischen Studie, die Bewertung von Nutzen und Nebenwirkungen und die Entscheidung über eine Zulassung.",
    diskussionsFrage:
      "Die KI hat den Wirkstoff vorgeschlagen, geprüft haben ihn Menschen in einer Studie. Wer hat die eigentliche Leistung erbracht, und wie sollte man das bei Medikamenten bewerten?",
    einordnung:
      "Die Quelle ist eine Pressemitteilung des Herstellers. Die Studie war mit 71 Personen klein, das Mittel ist noch nicht zugelassen und braucht größere Studien.",
    video: { id: "yvLfHJfzn6Q", titel: "Wie hilft KI, neue Medikamente zu finden?", quelle: "Einfach Kapiert", hinweis: "Kurzer Erklärfilm zur KI-Wirkstoffsuche allgemein, nicht zu Rentosertib." },
  },
  {
    id: "alphafold-proteinstrukturen",
    kategorie: "forschung",
    titel: "AlphaFold sagt die Form von Proteinen voraus",
    studiengangSlugs: ["biologie", "chemie", "pharmazie"],
    berufTitel: "Biolog:in & Biochemiker:in in der Forschung",
    ort: "Weltweit (Google DeepMind, Datenbank beim EMBL-EBI)",
    zeitpunkt: "Seit 2021 im Einsatz, Nobelpreis 2024",
    medium: "EMBL-EBI",
    url: "https://www.ebi.ac.uk/about/news/alphafold-wins-nobel-prize-chemistry-2024/",
    teaser:
      "Das KI-System AlphaFold sagt voraus, welche dreidimensionale Struktur ein Protein hat. Die Struktur gibt Hinweise auf die Funktion. Die frei zugängliche Datenbank startete 2021 mit rund 360.000 Strukturen und umfasst inzwischen etwa 200 Millionen, mehr als eine Million Menschen nutzen sie. 2024 gab es dafür den Nobelpreis für Chemie.",
    wasMachtDieKI:
      "Aus der Abfolge der Bausteine eines Proteins die räumliche Struktur berechnen, ohne dass sie erst aufwendig im Labor bestimmt werden muss.",
    wasBleibtMenschlich:
      "Die richtige Forschungsfrage stellen, Vorhersagen im Experiment überprüfen, Ergebnisse einordnen und daraus Medikamente, Enzyme oder neue Therapien entwickeln.",
    diskussionsFrage:
      "Wenn die Form eines Proteins in Minuten statt in Jahren vorliegt: Welche Aufgaben in der Forschung werden dann wichtiger, und welche braucht man weniger?",
    einordnung:
      "Das ist ein Werkzeug der Forschung und kein Berufsalltag wie in einer Arztpraxis. Es zeigt aber, wie sich die Arbeit in Biologie, Chemie und Pharmazie gerade verändert.",
    video: { id: "r4-hXO7MLVU", titel: "AlphaFold: The 50-year grand challenge cracked by AI", quelle: "Google DeepMind (englisch)", hinweis: "Englisch, Video des Herstellers: zeigt, was AlphaFold kann, nicht wie unabhängig es bewertet wird." },
  },
  {
    id: "wetter-ki-graphcast",
    kategorie: "forschung",
    titel: "KI-Wettermodell rechnet zehn Tage in unter einer Minute",
    studiengangSlugs: ["physik", "nachhaltigkeitswissenschaft"],
    berufTitel: "Meteorolog:in",
    ort: "Google DeepMind, eingeordnet vom Deutschen Wetterdienst",
    zeitpunkt: "Vorgestellt 2023",
    medium: "Deutscher Wetterdienst (DWD)",
    url: "https://www.wetterdienst.de/Deutschlandwetter/Thema_des_Tages/5615/kuenstliche-intelligenz-in-der-wettervorhersage-was-kann-graphcast",
    teaser:
      "GraphCast lernt aus Wetterdaten von 1979 bis 2017, statt physikalische Gleichungen zu lösen, und berechnet eine Zehn-Tage-Vorhersage in unter einer Minute. In einer Studie schlug es den Hauptlauf eines führenden europäischen Wettermodells bei rund 90 Prozent der geprüften Größen.",
    wasMachtDieKI:
      "Aus dem aktuellen Wetterzustand und gelernten Mustern den Verlauf der nächsten Tage berechnen, deutlich schneller als klassische Modelle auf Supercomputern.",
    wasBleibtMenschlich:
      "Unsichere Wetterlagen einschätzen, kleinräumige Phänomene wie Gewitter beurteilen, mehrere Modelle vergleichen, Warnungen aussprechen und sie verständlich weitergeben.",
    diskussionsFrage:
      "GraphCast verschmiert Vorhersagen bei unsicheren Lagen. Wer sollte bei einer Unwetterwarnung entscheiden, die KI oder eine Meteorologin, und warum?",
    einordnung:
      "Der Artikel stammt von 2023. Der DWD sieht KI-Modelle als Ergänzung zu den Wettermodellen und nicht als Ersatz für Meteorolog:innen.",
    video: { id: "bfJyHQ31B0Y", titel: "Google-KI Graphcast trifft genauere Wettervorhersagen als Meteorologen", quelle: "BuzzClips News", hinweis: "Sehr kurzer Nachrichtenclip. Der DWD-Artikel oben ordnet die Grenzen von GraphCast ein." },
  },
  {
    id: "software-ki-assistenten-entwicklung",
    kategorie: "buero-it",
    titel: "KI schreibt Code, Menschen prüfen ihn",
    berufSlug: "softwareentwickler",
    studiengangSlugs: ["informatik"],
    berufTitel: "Softwareentwickler:in",
    ort: "Deutschland, Österreich, Schweiz (BearingPoint-Umfrage)",
    zeitpunkt: "Umfrage vom September 2026",
    medium: "Retail News (zur BearingPoint-Studie)",
    url: "https://retail-news.de/bearingpoint-ki-softwareentwicklung-entwickler-2026/",
    teaser:
      "In einer Umfrage unter 112 Führungskräften nutzen 91 Prozent der Unternehmen KI in der Softwareentwicklung, aber nur 18 Prozent haben sie dauerhaft in ihre Abläufe eingebaut. Am häufigsten kommt sie bei Dokumentation, Code-Erzeugung und Code-Prüfung zum Einsatz.",
    wasMachtDieKI:
      "Code vorschlagen, Dokumentation schreiben und Fehler in Programmen aufspüren.",
    wasBleibtMenschlich:
      "KI-Ergebnisse prüfen, sie sicher in bestehende Systeme einbauen, Qualitätsvorgaben durchsetzen und verstehen, was eine Software für die Menschen leisten soll.",
    diskussionsFrage:
      "Laut Studie führt KI bisher nicht zu einem breiten Abbau von Stellen, sondern verändert die Aufgaben. Wie viel Programmieren musst du selbst können, um KI-Code überhaupt beurteilen zu können?",
    einordnung:
      "Das ist eine Befragung von Führungskräften und keine Messung. Eine Studie mit Stoppuhr (METR) fand, dass erfahrene Entwickler:innen mit KI nicht schneller, aber sich schneller fühlten. Die Ergebnisse sind nicht eindeutig.",
    video: { id: "7XTuyPfMUnc", titel: "So verändert KI die Softwareentwicklung", quelle: "Programmieren Starten", hinweis: "Beitrag eines Lernkanals zur Softwareentwicklung allgemein, nicht zur BearingPoint-Umfrage." },
  },
  {
    id: "schule-ki-chatbot-telli",
    kategorie: "bildung",
    titel: "KI-Chatbot „telli“ für Lehrkräfte und Schüler:innen",
    berufSlug: "lehrer",
    studiengangSlugs: ["paedagogik"],
    berufTitel: "Lehrer:in",
    ort: "Baden-Württemberg (Start im Oktober 2025)",
    zeitpunkt: "Seit Oktober 2025 an Schulen",
    medium: "Landesregierung Baden-Württemberg",
    url: "https://www.baden-wuerttemberg.de/de/service/presse/pressemitteilung/pid/ki-chatbot-fuer-schulen-geht-an-den-start-1",
    teaser:
      "„telli“ ist ein KI-Chatbot, der eigens für Schulen entwickelt wurde. Seit dem 13. Oktober 2025 steht er allen Schulen in Baden-Württemberg zur Verfügung und kann von den Schulleitungen aktiviert werden. Die Eingaben werden laut Landesregierung nicht zum Training der Sprachmodelle verwendet.",
    wasMachtDieKI:
      "Unterrichtsmaterial entwerfen, Aufgaben in verschiedenen Schwierigkeitsgraden anbieten, Texte übersetzen und Schüler:innen im Schulalltag unterstützen.",
    wasBleibtMenschlich:
      "Entscheiden, was im Unterricht gelernt werden soll, Materialien prüfen, Noten geben, Konflikte in der Klasse lösen und Schüler:innen persönlich begleiten.",
    diskussionsFrage:
      "Wenn der Chatbot Aufgaben und Erklärungen liefert: Was sollen Lehrkräfte dann tun, was ein Chatbot nicht kann? Und wo sollte er im Unterricht aus bleiben?",
    einordnung:
      "Die Quelle ist eine Pressemitteilung des Landes. Wie viel Zeit Lehrkräfte damit wirklich sparen, ist umstritten. Kritik an KI-Korrekturhilfen gibt es etwa von netzpolitik.org.",
    video: { id: "w_51AdefV30", titel: "Bremen führt als erstes Bundesland KI-Chatbot im Unterricht ein", quelle: "SAT.1 REGIONAL", hinweis: "Der Beitrag zeigt den Start in Bremen, nicht in Baden-Württemberg." },
  },
];
