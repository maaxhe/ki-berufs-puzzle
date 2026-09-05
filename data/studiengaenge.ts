import { STANDARD_QUELLEN } from "@/types";
import type { Studiengang } from "@/types";

const { jobFuturomat, freyOsborne, ilo, wef, eloundou, clioLegal } =
  STANDARD_QUELLEN;

/**
 * Studiengänge, aufgeschlüsselt nach typischen Tätigkeiten im Studium und im
 * daran anschließenden Berufsfeld – gleiche Puzzle-Mechanik wie bei den
 * Berufen, nur auf die Frage "welches Studium ist für eine KI-Zukunft gut
 * gerüstet?" gemünzt.
 */
export const studiengaenge: Studiengang[] = [
  // ─── Technik & Informatik ───
  {
    slug: "informatik",
    title: "Informatik",
    shortDescription:
      "Vom Bachelor direkt in die Disziplin, die KI selbst hervorgebracht hat.",
    kategorie: "technik-informatik",
    zukunftsausblick:
      "Informatik bleibt gefragt, aber das Berufsbild verschiebt sich spürbar: weniger Zeit fürs Tippen von Code, mehr Zeit für Architektur, Review und die Frage, was überhaupt gebaut werden soll. Wer nur syntaktisch programmieren kann, konkurriert direkt mit der eigenen KI.",
    tippsMenschlich: [
      "Systeme und Zusammenhänge verstehen statt nur Syntax pauken",
      "Kommunikation mit Fachabteilungen und Nutzer:innen üben",
      "Verantwortung für Entscheidungen übernehmen, die KI nicht treffen kann",
    ],
    quellen: [eloundou, jobFuturomat, wef],
    tasks: [
      {
        id: "inf-1",
        title: "Standard-Code schreiben",
        description: "Übliche Funktionen, CRUD-Logik, Boilerplate.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Boilerplate, CRUD-Funktionen und Standardalgorithmen generieren Copilot & Co. heute zuverlässig aus einer kurzen Beschreibung – „Computer and Mathematical“ zählt bei Eloundou et al. zu den am stärksten exponierten Berufsgruppen.",
      },
      {
        id: "inf-2",
        title: "Systemarchitektur entwerfen",
        description: "Entscheiden, wie ein größeres System aufgebaut wird.",
        kiEignung: 57,
        category: "analytisch",
        warum:
          "Welche Trade-offs für dieses Produkt, dieses Team und dieses Budget richtig sind, erfordert Erfahrung und Kontext, den KI nicht hat.",
      },
      {
        id: "inf-3",
        title: "Bugs in fremdem Code debuggen",
        description: "Ursache eines Fehlers in gewachsenem Code finden.",
        kiEignung: 82,
        category: "analytisch",
        warum:
          "KI findet viele Fehlerklassen selbst, aber bei verteilten Systemen und Legacy-Code bleibt die Ursachenforschung oft Handarbeit.",
      },
      {
        id: "inf-4",
        title: "Anforderungen mit der Fachabteilung klären",
        description: "Verstehen, was ein Team eigentlich braucht.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Unausgesprochene Bedürfnisse verstehen und Prioritäten aushandeln bleibt zwischenmenschlich.",
      },
      {
        id: "inf-5",
        title: "Unit-Tests schreiben",
        description: "Testfälle für einzelne Funktionen formulieren.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Testfälle aus Funktionssignaturen abzuleiten ist ein Musterbeispiel für generative KI.",
      },
      {
        id: "inf-6",
        title: "Code-Review verantworten",
        description: "Eine Änderung zur Freigabe prüfen und unterschreiben.",
        kiEignung: 52,
        category: "analytisch",
        warum:
          "KI kommentiert Stil und Muster – die Freigabeentscheidung mit Haftung trifft weiterhin ein Mensch.",
      },
      {
        id: "inf-7",
        title: "Nutzer:innen bei einem Problem beobachten",
        description: "Verstehen, woran Menschen in der Anwendung scheitern.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Echtes Nutzerverhalten zu lesen und einzuordnen bleibt eine zutiefst menschliche Fähigkeit.",
      },
    ],
  },
  {
    slug: "elektrotechnik",
    title: "Elektrotechnik",
    shortDescription:
      "Von der Schaltung auf dem Papier bis zur Anlage, die tatsächlich läuft.",
    kategorie: "technik-informatik",
    zukunftsausblick:
      "Simulation und Berechnung übernimmt Software immer selbstständiger. Der Aufbau realer Anlagen, ihre Abnahme und die Haftung dafür bleiben aber an eine Person gebunden – Elektrotechnik verlagert sich vom Rechnen zum Verantworten.",
    tippsMenschlich: [
      "Praxiserfahrung mit realer Hardware sammeln, nicht nur simulieren",
      "Normen und rechtliche Verantwortung wirklich verstehen",
      "Kundengespräche und Vor-Ort-Diagnose üben",
    ],
    quellen: [jobFuturomat, freyOsborne],
    tasks: [
      {
        id: "et-1",
        title: "Schaltungen simulieren",
        description: "Verhalten einer Schaltung am Rechner durchspielen.",
        kiEignung: 72,
        category: "analytisch",
        warum:
          "Simulationssoftware mit KI-Unterstützung schlägt heute schon plausible Bauteilwerte und Layouts vor.",
      },
      {
        id: "et-2",
        title: "Prototyp aufbauen und verkabeln",
        description: "Bauteile physisch verlöten und verdrahten.",
        kiEignung: 25,
        category: "physisch",
        warum:
          "Feinmotorik am realen Bauteil bleibt vorerst Handarbeit, auch wenn Roboterarme in der Serienfertigung helfen.",
      },
      {
        id: "et-3",
        title: "Fehler in einer Anlage vor Ort suchen",
        description: "Störung in einer bestehenden Installation finden.",
        kiEignung: 20,
        category: "physisch",
        warum:
          "Ungewöhnliche, nie dokumentierte Fehlerbilder vor Ort erfordern Erfahrung und Improvisation.",
      },
      {
        id: "et-4",
        title: "Regelungstechnik berechnen",
        description: "Parameter für ein Regelsystem bestimmen.",
        kiEignung: 62,
        category: "analytisch",
        warum:
          "Für Standardregelkreise liefert KI-gestützte Software brauchbare Startwerte, Feinschliff bleibt Aufgabe der Ingenieurin.",
      },
      {
        id: "et-5",
        title: "Abnahme nach VDE-Norm verantworten",
        description: "Anlage offiziell zur Nutzung freigeben.",
        kiEignung: 22,
        category: "analytisch",
        warum:
          "Prüfgeräte liefern die Werte automatisch, die gesetzliche Freigabe unterschreibt trotzdem eine Elektrofachkraft mit persönlicher Haftung.",
      },
      {
        id: "et-6",
        title: "Schaltpläne und Dokumentation erstellen",
        description: "Aufbau einer Anlage nachvollziehbar festhalten.",
        kiEignung: 77,
        category: "routine",
        warum:
          "Aus einer fertigen Schaltung strukturierte Dokumentation zu erzeugen ist eine Standardaufgabe für Software.",
      },
      {
        id: "et-7",
        title: "Technische Anforderungen mit Kund:innen klären",
        description: "Herausfinden, was eine Anlage wirklich leisten soll.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Laien in technische Entscheidungen mitzunehmen und Vertrauen aufzubauen bleibt Beziehungsarbeit.",
      },
    ],
  },

  // ─── Naturwissenschaft & Medizin ───
  {
    slug: "physik",
    title: "Physik",
    shortDescription:
      "Grundlagenforschung zwischen Rechenpower und dem einen überraschenden Messwert.",
    kategorie: "naturwissenschaft-medizin",
    zukunftsausblick:
      "KI beschleunigt Physik enorm bei Auswertung und Simulation – ganze Forschungsschritte, für die früher Wochen nötig waren, laufen heute automatisiert. Die eigentliche wissenschaftliche Leistung, aus Daten eine neue Idee zu machen und sie zu verteidigen, bleibt menschlich.",
    tippsMenschlich: [
      "Kritisches Hinterfragen von Modellen und Daten trainieren",
      "Eigenständig neue Fragestellungen entwickeln",
      "Ergebnisse überzeugend vor Fachpublikum vertreten",
    ],
    quellen: [freyOsborne, wef],
    tasks: [
      {
        id: "phy-1",
        title: "Messdaten auswerten",
        description: "Aus Rohdaten eines Experiments Ergebnisse extrahieren.",
        kiEignung: 77,
        category: "analytisch",
        warum:
          "Statistische Auswertung großer Datensätze ist eine der stärksten Domänen aktueller KI-Tools.",
      },
      {
        id: "phy-2",
        title: "Simulationen programmieren",
        description: "Physikalisches Verhalten am Rechner nachbilden.",
        kiEignung: 62,
        category: "analytisch",
        warum:
          "Standardsimulationen lassen sich KI-gestützt aufsetzen, komplexe Modellannahmen erfordern aber Fachverständnis.",
      },
      {
        id: "phy-3",
        title: "Experimentaufbau im Labor justieren",
        description: "Geräte kalibrieren, bis ein Aufbau sauber misst.",
        kiEignung: 20,
        category: "physisch",
        warum:
          "Feinjustage an realer Hardware mit unvorhersehbaren Störeinflüssen bleibt eine manuelle, erfahrungsgetriebene Tätigkeit.",
      },
      {
        id: "phy-4",
        title: "Neue Hypothese aus überraschenden Daten entwickeln",
        description: "Aus einer Anomalie eine neue Idee ableiten.",
        kiEignung: 30,
        category: "kreativ",
        warum:
          "Ein unerwartetes Messergebnis als Hinweis auf etwas grundlegend Neues zu deuten ist der kreative Kern von Forschung.",
      },
      {
        id: "phy-5",
        title: "Fachliteratur zusammenfassen",
        description: "Überblick über den Stand der Forschung erstellen.",
        kiEignung: 67,
        category: "routine",
        warum:
          "KI fasst Paper und Literaturstände heute schon brauchbar zusammen, Fachprüfung bleibt aber nötig.",
      },
      {
        id: "phy-6",
        title: "Ergebnis auf einer Konferenz verteidigen",
        description: "Fragen und Kritik von Fachkolleg:innen live beantworten.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Spontane Rückfragen souverän einzuordnen und zu beantworten verlangt echtes Verständnis und Präsenz.",
      },
      {
        id: "phy-7",
        title: "Fördermittelantrag schreiben und Projekt verkaufen",
        description: "Ein Forschungsvorhaben überzeugend begründen.",
        kiEignung: 35,
        category: "kreativ",
        warum:
          "Warum genau dieses Projekt jetzt wichtig ist, glaubhaft zu machen, ist mehr Überzeugungsarbeit als Textproduktion.",
      },
    ],
  },
  {
    slug: "medizin",
    title: "Medizin",
    shortDescription:
      "Gilt als KI-fest – bei genauerem Hinsehen ist das nur die halbe Wahrheit.",
    kategorie: "naturwissenschaft-medizin",
    zukunftsausblick:
      "Bildbefundung und Dokumentation werden zunehmend KI-gestützt, teils schon heute treffsicherer als Menschen. Untersuchung, Aufklärung und die Verantwortung für eine Diagnose bleiben aber an eine approbierte Person gebunden – Medizin bleibt ein Beruf mit Menschen, nicht nur über Menschen.",
    tippsMenschlich: [
      "Empathisches Gespräch und Aufklärung als Kernkompetenz begreifen",
      "Verantwortung für Diagnosen bewusst übernehmen, nicht outsourcen",
      "Handwerkliche Fertigkeiten (Untersuchung, OP) aktiv trainieren",
    ],
    quellen: [ilo, wef],
    tasks: [
      {
        id: "med-1",
        title: "Röntgen-/MRT-Bilder auf Auffälligkeiten prüfen",
        description: "Erste Durchsicht bildgebender Diagnostik.",
        kiEignung: 72,
        category: "analytisch",
        warum:
          "Bilderkennungs-KI erreicht bei klar definierten Mustern wie Tumoren oder Frakturen inzwischen sehr hohe Trefferquoten.",
      },
      {
        id: "med-2",
        title: "Anamnese-Gespräch führen",
        description: "Krankengeschichte im Gespräch erheben.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Was Patient:innen sagen, wie sie es sagen und was sie verschweigen, richtig einzuordnen ist zutiefst menschliche Arbeit.",
      },
      {
        id: "med-3",
        title: "Diagnose stellen und Behandlung verantworten",
        description: "Aus Befunden eine verbindliche Entscheidung treffen.",
        kiEignung: 32,
        category: "analytisch",
        warum:
          "KI liefert Vorschläge, die approbierte Entscheidung mit Haftung trifft weiterhin ein Mensch.",
      },
      {
        id: "med-4",
        title: "Patient:in in schwerer Situation begleiten",
        description: "Schlechte Nachrichten überbringen und da sein.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "Trost, Präsenz und echtes Mitgefühl in existenziellen Momenten lassen sich nicht automatisieren.",
      },
      {
        id: "med-5",
        title: "Operation durchführen",
        description: "Handwerklicher Eingriff am Patient:innenkörper.",
        kiEignung: 10,
        category: "physisch",
        warum:
          "Roboterassistenz unterstützt die Chirurgin, geführt und verantwortet wird der Eingriff aber von ihr.",
      },
      {
        id: "med-6",
        title: "Arztbrief und Dokumentation schreiben",
        description: "Behandlung strukturiert festhalten.",
        kiEignung: 67,
        category: "routine",
        warum:
          "Aus Gesprächsnotizen einen strukturierten Arztbrief zu erzeugen ist eine der am weitesten verbreiteten KI-Anwendungen in Kliniken.",
      },
      {
        id: "med-7",
        title: "Leitlinien und aktuelle Studienlage einordnen",
        description: "Neue Forschung auf den Einzelfall übertragen.",
        kiEignung: 52,
        category: "analytisch",
        warum:
          "KI kann Studien zusammenfassen, die Übertragung auf eine individuelle Patientin mit Vorerkrankungen bleibt ärztliches Urteilsvermögen.",
      },
    ],
  },

  // ─── Wirtschaft & Recht ───
  {
    slug: "betriebswirtschaftslehre",
    title: "Betriebswirtschaftslehre (BWL)",
    shortDescription:
      "Der Klassiker unter den Studiengängen – und einer mit vielen automatisierbaren Routinen.",
    kategorie: "wirtschaft-recht",
    zukunftsausblick:
      "Viele klassische BWL-Aufgaben – Reporting, Analyse, Foliensätze – lassen sich heute größtenteils von KI vorbereiten. Wer im Beruf bestehen will, muss zunehmend das liefern, was danach kommt: Entscheidung, Verhandlung, Führung.",
    tippsMenschlich: [
      "Verhandlungs- und Präsentationskompetenz gezielt trainieren",
      "Entscheidungsfähigkeit unter Unsicherheit üben, nicht nur Zahlen liefern",
      "Führungserfahrung früh sammeln, z. B. in Projekten oder Vereinen",
    ],
    quellen: [eloundou, wef, jobFuturomat],
    tasks: [
      {
        id: "bwl-1",
        title: "Finanzkennzahlen berechnen und Reports erstellen",
        description: "Zahlen aufbereiten und in Berichte gießen.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Kennzahlen aus Daten zu berechnen und in Standardformate zu bringen ist einer der am stärksten automatisierten Bürojobs überhaupt.",
      },
      {
        id: "bwl-2",
        title: "Marktanalyse recherchieren",
        description: "Wettbewerb und Marktumfeld zusammentragen.",
        kiEignung: 85,
        category: "analytisch",
        warum:
          "Öffentlich verfügbare Marktdaten zu sammeln und zusammenzufassen erledigt KI heute in einem Bruchteil der Zeit.",
      },
      {
        id: "bwl-3",
        title: "Strategieentscheidung mit Unsicherheit treffen",
        description: "Bei unklarer Datenlage eine Richtung festlegen.",
        kiEignung: 47,
        category: "analytisch",
        warum:
          "Verantwortung für eine Entscheidung zu übernehmen, deren Ausgang niemand kennt, bleibt eine menschliche Führungsaufgabe.",
      },
      {
        id: "bwl-4",
        title: "Verhandlung mit Geschäftspartner:innen führen",
        description: "Konditionen live aushandeln.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Verhandlungsgeschick, Lesen der Gegenseite und Vertrauensaufbau lassen sich kaum automatisieren.",
      },
      {
        id: "bwl-5",
        title: "Präsentation für die Geschäftsleitung vorbereiten",
        description: "Folien und Argumentation für Entscheider:innen bauen.",
        kiEignung: 65,
        category: "kreativ",
        warum:
          "Foliensätze aus Kernbotschaften zu erzeugen kann KI übernehmen, die Zuspitzung auf das, was diese Geschäftsleitung überzeugt, bleibt Fingerspitzengefühl.",
      },
      {
        id: "bwl-6",
        title: "Team führen und motivieren",
        description: "Menschen durch schwierige Phasen führen.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "Vertrauen, Motivation und Konfliktlösung im Team sind Kernbeispiele für nicht automatisierbare Führungsarbeit.",
      },
      {
        id: "bwl-7",
        title: "Businessplan-Zahlen modellieren",
        description: "Finanzmodell für ein Vorhaben aufstellen.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Standard-Finanzmodelle mit üblichen Annahmen baut KI-gestützte Software heute weitgehend selbstständig.",
      },
    ],
  },
  {
    slug: "jura",
    title: "Rechtswissenschaft (Jura)",
    shortDescription:
      "Viel Textarbeit, viel Recherche – und trotzdem ein zutiefst menschlicher Kern.",
    kategorie: "wirtschaft-recht",
    zukunftsausblick:
      "Rechtsrecherche und Standardverträge werden schon heute KI-gestützt erledigt – Legal-Tech ist eine der am schnellsten wachsenden Branchen im Recht. Die Vertretung vor Gericht, die Beratung in Vertrauensfragen und ethische Abwägungen bleiben aber an eine zugelassene Person gebunden.",
    tippsMenschlich: [
      "Argumentation und freies Sprechen vor Publikum trainieren",
      "Mandant:innenvertrauen als eigenständige Kompetenz begreifen",
      "Ethisches Urteilsvermögen bei Grenzfällen bewusst schärfen",
    ],
    quellen: [clioLegal, wef, ilo],
    tasks: [
      {
        id: "jur-1",
        title: "Gesetzestexte und Urteile recherchieren",
        description: "Relevante Rechtsprechung zu einem Fall finden.",
        kiEignung: 90,
        category: "routine",
        warum:
          "KI-gestützte Rechtsdatenbanken durchsuchen Urteile und Gesetze deutlich schneller als eine Recherche von Hand – laut Clio Legal Trends sind rund 81% der Aufgaben von Kanzleifachangestellten automatisierbar.",
      },
      {
        id: "jur-2",
        title: "Standardvertrag aus Textbausteinen erstellen",
        description: "Verträge nach Muster zusammenstellen.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Für wiederkehrende Vertragstypen generiert Legal-Tech-Software heute brauchbare erste Entwürfe.",
      },
      {
        id: "jur-3",
        title: "Mandant:in beraten und Vertrauen aufbauen",
        description: "Persönliche Situation verstehen und einordnen.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Eine Person in einer belastenden rechtlichen Lage zu beraten braucht Vertrauen, das nur im Gespräch entsteht.",
      },
      {
        id: "jur-4",
        title: "Neuartigen Fall juristisch argumentieren",
        description: "Für eine Situation ohne klare Präzedenzfälle argumentieren.",
        kiEignung: 47,
        category: "analytisch",
        warum:
          "Wo es noch keine etablierte Rechtsprechung gibt, ist juristische Kreativität und Verantwortung gefragt, keine Mustererkennung.",
      },
      {
        id: "jur-5",
        title: "Vor Gericht plädieren",
        description: "Argumentation live vor Richter:in vertreten.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Spontan auf Rückfragen und Gegenargumente reagieren zu können ist im Kern eine menschliche Live-Performance.",
      },
      {
        id: "jur-6",
        title: "Vertragsentwurf gegenlesen und Risiken einschätzen",
        description: "Vertrag auf Fallstricke prüfen.",
        kiEignung: 72,
        category: "analytisch",
        warum:
          "KI markiert ungewöhnliche Klauseln zuverlässig, die endgültige Risikoeinschätzung für die Mandantschaft bleibt juristisches Urteil.",
      },
      {
        id: "jur-7",
        title: "Ethisch schwierige Güterabwägung entscheiden",
        description: "Zwischen widerstreitenden Interessen abwägen.",
        kiEignung: 37,
        category: "analytisch",
        warum:
          "Wo Recht und Moral in Konflikt geraten, braucht es eine Person, die die Entscheidung verantwortet – keinen Algorithmus.",
      },
    ],
  },

  // ─── Geistes- & Sozialwissenschaft ───
  {
    slug: "psychologie",
    title: "Psychologie",
    shortDescription:
      "Zwischen harter Statistik im Studium und zutiefst menschlicher Arbeit im Beruf.",
    kategorie: "geistes-sozialwissenschaft",
    zukunftsausblick:
      "Der methodische Teil des Studiums – Statistik, Studiendesign, Literaturarbeit – wird zunehmend KI-unterstützt. Der eigentliche Beruf, Menschen in Krisen zu begleiten und eine tragfähige therapeutische Beziehung aufzubauen, gehört zu den Tätigkeiten mit dem geringsten Automatisierungsrisiko überhaupt.",
    tippsMenschlich: [
      "Beziehungsaufbau und aktives Zuhören als zentrale Fähigkeit üben",
      "Belastbarkeit für emotional fordernde Situationen entwickeln",
      "Statistik-Tools als Werkzeug nutzen, nicht als Ersatz für klinisches Urteil",
    ],
    quellen: [freyOsborne, wef],
    tasks: [
      {
        id: "psy-1",
        title: "Fragebogendaten statistisch auswerten",
        description: "Studienergebnisse quantitativ auswerten.",
        kiEignung: 77,
        category: "analytisch",
        warum:
          "Statistische Standardauswertungen an Studiendaten sind eine Kernstärke aktueller KI- und Statistik-Tools.",
      },
      {
        id: "psy-2",
        title: "Therapiegespräch führen",
        description: "Klient:in durch ein Gespräch begleiten.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Eine tragfähige therapeutische Beziehung entsteht durch echte Präsenz, nicht durch Textverarbeitung.",
      },
      {
        id: "psy-3",
        title: "Studiendesign entwickeln",
        description: "Untersuchung methodisch sauber planen.",
        kiEignung: 42,
        category: "analytisch",
        warum:
          "KI schlägt gängige Designs vor, methodische Fallstricke für eine konkrete Fragestellung zu erkennen bleibt Fachwissen.",
      },
      {
        id: "psy-4",
        title: "Vertrauensvolle Beziehung zu Klient:innen aufbauen",
        description: "Über Zeit Vertrauen entwickeln.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "Vertrauen wächst durch wiederholte echte Begegnung – eine der am wenigsten automatisierbaren menschlichen Erfahrungen.",
      },
      {
        id: "psy-5",
        title: "Literaturbericht schreiben",
        description: "Forschungsstand zu einem Thema zusammenfassen.",
        kiEignung: 62,
        category: "routine",
        warum:
          "Bestehende Literatur zusammenzufassen ist eine der Aufgaben, bei denen KI-Textwerkzeuge heute schon spürbar entlasten.",
      },
      {
        id: "psy-6",
        title: "Verhalten in einer Krisensituation einschätzen",
        description: "Akute Gefährdung erkennen und richtig reagieren.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "In einer echten Krise Nuancen von Ton, Körpersprache und Kontext zu lesen erfordert menschliches Urteilsvermögen mit Verantwortung.",
      },
      {
        id: "psy-7",
        title: "Testverfahren auswerten und Gutachten erstellen",
        description: "Diagnostische Tests interpretieren und dokumentieren.",
        kiEignung: 52,
        category: "analytisch",
        warum:
          "Die Auswertung folgt klaren Normwerten, die Einordnung in die individuelle Lebenssituation bleibt fachliches Urteil.",
      },
    ],
  },
  {
    slug: "germanistik",
    title: "Germanistik",
    shortDescription:
      "Oft als „brotlos“ belächelt – ausgerechnet hier zeigt sich, was KI wirklich nicht kann.",
    kategorie: "geistes-sozialwissenschaft",
    zukunftsausblick:
      "Sprachliche KI ist in Grammatik und Zusammenfassung stark, an eigenständiger Interpretation, echter literarischer Stimme und der Vermittlung von Inhalten an Menschen scheitert sie noch regelmäßig. Germanistik verschiebt sich vom reinen Textwissen zur Fähigkeit, mit Sprache und Menschen umzugehen.",
    tippsMenschlich: [
      "Eigene Deutungen und Thesen entwickeln, nicht nur referieren",
      "Vermittlung und Diskussionsleitung als Kernkompetenz trainieren",
      "Eigenständige kreative Stimme in Texten bewusst pflegen",
    ],
    quellen: [freyOsborne, ilo],
    tasks: [
      {
        id: "ger-1",
        title: "Textzusammenfassung und Rechtschreibkorrektur",
        description: "Texte kürzen und formal korrigieren.",
        kiEignung: 82,
        category: "routine",
        warum:
          "Zusammenfassen und Korrigieren von Texten gehört zu den zuverlässigsten Fähigkeiten heutiger Sprachmodelle.",
      },
      {
        id: "ger-2",
        title: "Literaturinterpretation mit eigener These entwickeln",
        description: "Einen eigenständigen Deutungsansatz zu einem Werk finden.",
        kiEignung: 35,
        category: "kreativ",
        warum:
          "Eine originelle, gut begründete eigene These zu einem Text zu entwickeln ist mehr als Mustererkennung im Trainingskorpus.",
      },
      {
        id: "ger-3",
        title: "Seminar leiten und Diskussion moderieren",
        description: "Gespräch einer Gruppe strukturieren und lenken.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Eine Diskussion im Raum spontan zu lenken, auf Zwischentöne zu reagieren, ist Live-Beziehungsarbeit.",
      },
      {
        id: "ger-4",
        title: "Text mit eigener Stimme schreiben",
        description: "Essay oder literarischer Text mit klarer Handschrift.",
        kiEignung: 30,
        category: "kreativ",
        warum:
          "Eine erkennbar eigene Stimme und Haltung in einem Text zu entwickeln bleibt schwer nachahmbar, so gut KI-Texte klingen mögen.",
      },
      {
        id: "ger-5",
        title: "Quellenrecherche im Archiv",
        description: "Historische oder seltene Quellen auffinden.",
        kiEignung: 47,
        category: "analytisch",
        warum:
          "Digitalisierte Bestände durchsucht KI gut, unerschlossene oder physische Archivbestände erfordern weiterhin Handarbeit vor Ort.",
      },
      {
        id: "ger-6",
        title: "Sprachliche Nuancen und Ironie erkennen",
        description: "Zwischen den Zeilen lesen.",
        kiEignung: 42,
        category: "analytisch",
        warum:
          "Ironie, Anspielungen und kulturellen Kontext zuverlässig zu erkennen ist eine der bekannten Schwachstellen aktueller Sprachmodelle.",
      },
      {
        id: "ger-7",
        title: "Feedback zu Texten geben, das weiterhilft",
        description: "Andere beim Schreiben wirklich voranbringen.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Gutes Feedback braucht Einfühlung in die Absicht und den Entwicklungsstand der schreibenden Person, nicht nur Regelwissen.",
      },
    ],
  },

  // ─── Technik & Informatik (Fortsetzung) ───
  {
    slug: "maschinenbau",
    title: "Maschinenbau",
    shortDescription:
      "Konstruktion, Simulation und die Frage, wer für eine fehlerhafte Maschine geradesteht.",
    kategorie: "technik-informatik",
    zukunftsausblick:
      "CAD-Konstruktion und Simulation werden zunehmend KI-gestützt vorgeschlagen, echte Prototypenarbeit und die technische Verantwortung für eine gebaute Maschine bleiben aber an Ingenieur:innen gebunden. Der Beruf verschiebt sich vom reinen Zeichnen zum Prüfen und Verantworten.",
    tippsMenschlich: [
      "Praktische Erfahrung mit realen Bauteilen und Werkstoffen sammeln",
      "Technische Verantwortung und Normen wirklich verstehen, nicht nur abhaken",
      "Interdisziplinäre Projektarbeit mit anderen Gewerken üben",
    ],
    quellen: [jobFuturomat, freyOsborne],
    tasks: [
      {
        id: "mb-1",
        title: "Bauteile in CAD konstruieren",
        description: "3D-Modell eines Bauteils erstellen.",
        kiEignung: 62,
        category: "routine",
        warum:
          "Für Standardbauteile schlagen KI-gestützte CAD-Tools heute brauchbare erste Entwürfe vor.",
      },
      {
        id: "mb-2",
        title: "Festigkeitsberechnung und Simulation",
        description: "Belastung eines Bauteils rechnerisch prüfen.",
        kiEignung: 57,
        category: "analytisch",
        warum:
          "Simulationssoftware übernimmt die Rechenarbeit, die Interpretation der Ergebnisse für den Einsatzfall bleibt Ingenieursarbeit.",
      },
      {
        id: "mb-3",
        title: "Prototyp bauen und testen",
        description: "Physisches Modell fertigen und ausprobieren.",
        kiEignung: 20,
        category: "physisch",
        warum:
          "Der Umgang mit realem Material, Werkzeug und unvorhergesehenen Effekten bleibt praktische Handarbeit.",
      },
      {
        id: "mb-4",
        title: "Serienfertigung technisch verantworten",
        description: "Freigabe für die Produktion erteilen.",
        kiEignung: 22,
        category: "analytisch",
        warum:
          "Für Sicherheit und Funktion einer in Serie gefertigten Maschine haftet am Ende eine konkrete Person.",
      },
      {
        id: "mb-5",
        title: "Technische Dokumentation erstellen",
        description: "Konstruktionsunterlagen und Stücklisten schreiben.",
        kiEignung: 77,
        category: "routine",
        warum:
          "Aus einem fertigen CAD-Modell strukturierte Dokumentation abzuleiten ist eine klassische Automatisierungsaufgabe.",
      },
      {
        id: "mb-6",
        title: "Mit Fertigung und Einkauf abstimmen",
        description: "Machbarkeit und Kosten mit anderen Abteilungen klären.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Kompromisse zwischen Konstruktion, Fertigbarkeit und Budget auszuhandeln ist Teamarbeit zwischen Menschen.",
      },
      {
        id: "mb-7",
        title: "Neuartiges technisches Problem kreativ lösen",
        description: "Für eine ungewöhnliche Anforderung eine Lösung finden.",
        kiEignung: 35,
        category: "kreativ",
        warum:
          "Wo es noch kein Vorbild gibt, hilft KI bei der Recherche, die eigentliche Lösungsidee bleibt menschlicher Einfallsreichtum.",
      },
    ],
  },
  {
    slug: "wirtschaftsinformatik",
    title: "Wirtschaftsinformatik",
    shortDescription:
      "Die Schnittstelle zwischen IT und Business – und damit doppelt im KI-Fokus.",
    kategorie: "technik-informatik",
    zukunftsausblick:
      "Wirtschaftsinformatik sitzt genau dort, wo Automatisierung am stärksten zuschlägt: Programmieren und Prozessanalyse werden beide KI-unterstützt. Wer übrig bleibt, übersetzt zwischen Business-Bedarf und technischer Umsetzung – eine Rolle, die KI bisher schlecht ausfüllt.",
    tippsMenschlich: [
      "Vermittlung zwischen Fachabteilung und IT als Kernkompetenz ausbauen",
      "Projektverantwortung und Priorisierung üben",
      "Prozesse End-to-End verstehen, nicht nur einzelne Tools bedienen",
    ],
    quellen: [eloundou, jobFuturomat],
    tasks: [
      {
        id: "wi-1",
        title: "Geschäftsprozess analysieren und dokumentieren",
        description: "Ablauf eines Unternehmensprozesses erfassen.",
        kiEignung: 82,
        category: "analytisch",
        warum:
          "Standardprozesse aus Interviews und Dokumenten zu strukturieren kann KI heute weitgehend vorbereiten.",
      },
      {
        id: "wi-2",
        title: "Anforderungen in ein IT-System übersetzen",
        description: "Fachliche Wünsche in technische Spezifikation gießen.",
        kiEignung: 57,
        category: "analytisch",
        warum:
          "Welche Anforderung wirklich gemeint ist und wie sie ins System passt, erfordert Verständnis auf beiden Seiten.",
      },
      {
        id: "wi-3",
        title: "Standard-Software anpassen und konfigurieren",
        description: "ERP- oder CRM-System einrichten.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Konfigurationsaufgaben nach bekanntem Muster übernehmen KI-Assistenten in Business-Software zunehmend selbst.",
      },
      {
        id: "wi-4",
        title: "IT-Projekt mit Stakeholdern abstimmen",
        description: "Erwartungen verschiedener Abteilungen zusammenführen.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Widersprüchliche Interessen verschiedener Abteilungen zu moderieren bleibt Beziehungs- und Verhandlungsarbeit.",
      },
      {
        id: "wi-5",
        title: "Datenmodell für ein System entwerfen",
        description: "Struktur einer Datenbank planen.",
        kiEignung: 77,
        category: "analytisch",
        warum:
          "Für gängige Anwendungsfälle liefert KI brauchbare Datenmodell-Vorschläge, Sonderfälle prüft weiterhin ein Mensch.",
      },
      {
        id: "wi-6",
        title: "Wirtschaftlichkeit einer IT-Investition bewerten",
        description: "Kosten-Nutzen-Rechnung für ein Projekt erstellen.",
        kiEignung: 72,
        category: "analytisch",
        warum:
          "Zahlen liefert KI schnell, die Einschätzung strategischer Risiken bleibt unternehmerisches Urteil.",
      },
      {
        id: "wi-7",
        title: "Mitarbeitende bei neuer Software schulen",
        description: "Team im Umgang mit einem neuen System anleiten.",
        kiEignung: 20,
        category: "sozial",
        warum:
          "Menschen für Veränderung zu gewinnen und Ängste ernst zu nehmen ist eine zwischenmenschliche Aufgabe.",
      },
    ],
  },
  {
    slug: "architektur",
    title: "Architektur",
    shortDescription:
      "Entwurf zwischen KI-generierten Varianten und der Verantwortung für ein bewohnbares Gebäude.",
    kategorie: "technik-informatik",
    zukunftsausblick:
      "KI-Tools erzeugen heute in Minuten Dutzende Entwurfsvarianten und übernehmen viel Routine bei Plänen und Renderings. Die verbindliche Entwurfsidee, die Abstimmung mit Bauherrschaft und Behörden sowie die bautechnische Verantwortung bleiben menschlich.",
    tippsMenschlich: [
      "Eigene gestalterische Haltung entwickeln statt nur Varianten zu wählen",
      "Bauherrengespräche und Behördenkommunikation aktiv üben",
      "Verantwortung für Statik und Bauausführung ernst nehmen",
    ],
    quellen: [jobFuturomat, wef],
    tasks: [
      {
        id: "arch-1",
        title: "Erste Entwurfsvarianten generieren",
        description: "Mögliche Gebäudeformen für ein Grundstück skizzieren.",
        kiEignung: 65,
        category: "kreativ",
        warum:
          "KI-Entwurfstools schlagen für Standardanforderungen heute schnell mehrere plausible Varianten vor.",
      },
      {
        id: "arch-2",
        title: "Entwurfsidee mit eigener Handschrift entwickeln",
        description: "Das Gebäude finden, das zu Ort und Auftrag passt.",
        kiEignung: 35,
        category: "kreativ",
        warum:
          "Eine Idee, die auf einen bestimmten Ort, eine bestimmte Bauherrschaft und ein bestimmtes Budget wirklich passt, ist mehr als Variantenauswahl.",
      },
      {
        id: "arch-3",
        title: "Bauantrag und Pläne erstellen",
        description: "Genehmigungsfähige Unterlagen zeichnen.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Pläne nach Norm aus einem fertigen Entwurf abzuleiten ist eine der am stärksten automatisierten Aufgaben im Büroalltag.",
      },
      {
        id: "arch-4",
        title: "Mit Bauherrschaft Wünsche klären",
        description: "Herausfinden, wie Menschen wirklich leben und arbeiten wollen.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Unausgesprochene Bedürfnisse an ein zukünftiges Zuhause zu verstehen ist Beziehungsarbeit über viele Gespräche.",
      },
      {
        id: "arch-5",
        title: "Statik und Bauausführung verantworten",
        description: "Sicherheit und Umsetzbarkeit eines Entwurfs freigeben.",
        kiEignung: 42,
        category: "analytisch",
        warum:
          "Für die Standsicherheit eines gebauten Gebäudes haftet am Ende eine konkrete verantwortliche Person.",
      },
      {
        id: "arch-6",
        title: "Auf der Baustelle Probleme lösen",
        description: "Unerwartete Situationen vor Ort klären.",
        kiEignung: 15,
        category: "physisch",
        warum:
          "Was auf der Baustelle wirklich passiert, weicht oft vom Plan ab – Vor-Ort-Improvisation bleibt menschlich.",
      },
      {
        id: "arch-7",
        title: "Visualisierungen und Renderings erstellen",
        description: "Entwurf für Präsentationen ansprechend darstellen.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Fotorealistische Renderings aus einem 3D-Modell erzeugt KI-Software heute in Sekunden statt Stunden.",
      },
    ],
  },

  // ─── Naturwissenschaft & Medizin (Fortsetzung) ───
  {
    slug: "biologie",
    title: "Biologie",
    shortDescription:
      "Von der Feldarbeit bis zur Genanalyse am Rechner.",
    kategorie: "naturwissenschaft-medizin",
    zukunftsausblick:
      "Bioinformatik und Datenauswertung werden zunehmend KI-gestützt, ganze Proteinstrukturen sagen Modelle wie AlphaFold heute vorher, wofür früher Jahre Laborarbeit nötig waren. Feldarbeit, Experimentplanung und die Entwicklung neuer Fragestellungen bleiben aber menschlich.",
    tippsMenschlich: [
      "Praktische Feld- und Laborerfahrung aktiv sammeln",
      "Eigenständige Fragestellungen statt nur Datenauswertung entwickeln",
      "Interdisziplinäre Zusammenarbeit mit Informatik und Chemie suchen",
    ],
    quellen: [freyOsborne, ilo],
    tasks: [
      {
        id: "bio-1",
        title: "Genom- oder Proteindaten auswerten",
        description: "Große biologische Datensätze computergestützt analysieren.",
        kiEignung: 72,
        category: "analytisch",
        warum:
          "KI-Modelle wie AlphaFold lösen heute Teile der Strukturvorhersage, für die früher aufwendige Laborarbeit nötig war.",
      },
      {
        id: "bio-2",
        title: "Feldbeobachtungen durchführen",
        description: "Tiere oder Pflanzen in ihrem Lebensraum untersuchen.",
        kiEignung: 15,
        category: "physisch",
        warum:
          "Beobachtung unter unvorhersehbaren realen Bedingungen im Feld bleibt praktische, körperliche Arbeit.",
      },
      {
        id: "bio-3",
        title: "Experiment im Labor planen und durchführen",
        description: "Versuchsaufbau festlegen und Proben bearbeiten.",
        kiEignung: 25,
        category: "physisch",
        warum:
          "Pipettieren, Kultivieren und Feinjustage im Labor bleiben manuelle Fertigkeiten mit viel Erfahrungswissen.",
      },
      {
        id: "bio-4",
        title: "Neue Forschungsfrage entwickeln",
        description: "Aus bestehendem Wissen eine offene Lücke identifizieren.",
        kiEignung: 30,
        category: "kreativ",
        warum:
          "Zu erkennen, welche Frage als Nächstes lohnend ist, bleibt wissenschaftliche Kreativität.",
      },
      {
        id: "bio-5",
        title: "Fachliteratur zusammenfassen",
        description: "Überblick über bestehende Studien erstellen.",
        kiEignung: 67,
        category: "routine",
        warum:
          "KI fasst Fachliteratur heute brauchbar zusammen, die fachliche Prüfung bleibt aber nötig.",
      },
      {
        id: "bio-6",
        title: "Ergebnis in einem Paper verteidigen",
        description: "Kritische Rückfragen von Gutachter:innen beantworten.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Peer-Review-Prozesse leben von echter fachlicher Auseinandersetzung zwischen Menschen.",
      },
      {
        id: "bio-7",
        title: "Naturschutzprojekt vor Ort koordinieren",
        description: "Mit Behörden und Anwohner:innen zusammenarbeiten.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Interessen von Naturschutz, Landwirtschaft und Anwohnerschaft vor Ort auszugleichen ist Vermittlungsarbeit.",
      },
    ],
  },
  {
    slug: "chemie",
    title: "Chemie",
    shortDescription:
      "Reaktionen vorhersagen am Rechner, sie im Labor tatsächlich zum Laufen bringen.",
    kategorie: "naturwissenschaft-medizin",
    zukunftsausblick:
      "KI sagt heute Molekülstrukturen und Reaktionswege oft schneller vorher als klassische Berechnungen. Die praktische Synthese im Labor, mit all ihren Nebenreaktionen und Sicherheitsfragen, bleibt jedoch Handwerk mit hoher Verantwortung.",
    tippsMenschlich: [
      "Praktische Laborfertigkeiten und Sicherheitsbewusstsein ausbauen",
      "Fehleranalyse bei gescheiterten Experimenten als Kompetenz begreifen",
      "Anwendungsfelder abseits reiner Berechnung im Blick behalten",
    ],
    quellen: [freyOsborne, wef],
    tasks: [
      {
        id: "che-1",
        title: "Molekülstruktur und Reaktionswege berechnen",
        description: "Chemische Reaktionen am Rechner simulieren.",
        kiEignung: 85,
        category: "analytisch",
        warum:
          "KI-gestützte Simulationen sagen molekulare Eigenschaften heute oft treffsicherer und schneller vorher als klassische Methoden.",
      },
      {
        id: "che-2",
        title: "Synthese im Labor durchführen",
        description: "Reaktion praktisch ansetzen und überwachen.",
        kiEignung: 20,
        category: "physisch",
        warum:
          "Reale Nebenreaktionen, Verunreinigungen und Sicherheitsrisiken erfordern erfahrene menschliche Aufsicht im Labor.",
      },
      {
        id: "che-3",
        title: "Messdaten aus Spektroskopie auswerten",
        description: "Analysegeräte-Ausgabe interpretieren.",
        kiEignung: 82,
        category: "analytisch",
        warum:
          "Für bekannte Substanzklassen liefert KI-gestützte Auswertungssoftware zuverlässige Vorschläge.",
      },
      {
        id: "che-4",
        title: "Gescheitertes Experiment analysieren",
        description: "Herausfinden, warum ein Versuch nicht wie erwartet lief.",
        kiEignung: 52,
        category: "analytisch",
        warum:
          "Unerwartete Ergebnisse im Labor auf ihre wahre Ursache zurückzuführen braucht Erfahrung und Fingerspitzengefühl.",
      },
      {
        id: "che-5",
        title: "Sicherheitsdatenblätter und Dokumentation erstellen",
        description: "Umgang mit Stoffen normgerecht dokumentieren.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Standarddokumentation nach bekannten Vorlagen ist eine klassische Automatisierungsaufgabe.",
      },
      {
        id: "che-6",
        title: "Neues Material oder Verfahren entwickeln",
        description: "Für ein Problem eine neuartige chemische Lösung finden.",
        kiEignung: 35,
        category: "kreativ",
        warum:
          "KI schlägt Kandidaten vor, welche davon tatsächlich funktionieren und sinnvoll sind, entscheidet weiterhin die Forscherin.",
      },
      {
        id: "che-7",
        title: "Laborteam bei einem Sicherheitsvorfall anleiten",
        description: "In einer kritischen Situation richtig reagieren.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "Verantwortung für die Sicherheit anderer Menschen in einer akuten Situation zu übernehmen bleibt zutiefst menschlich.",
      },
    ],
  },
  {
    slug: "pharmazie",
    title: "Pharmazie",
    shortDescription:
      "Zwischen Wirkstoffentwicklung am Rechner und persönlicher Beratung am Apothekentresen.",
    kategorie: "naturwissenschaft-medizin",
    zukunftsausblick:
      "KI beschleunigt die Wirkstoffsuche massiv – Kandidatenmoleküle, für die früher Jahre nötig waren, schlägt Software heute in Tagen vor. Beratung, Herstellung in der Apotheke und die Verantwortung für die Arzneimittelsicherheit bleiben aber an approbierte Personen gebunden.",
    tippsMenschlich: [
      "Beratungskompetenz am Tresen als eigenständige Stärke pflegen",
      "Verantwortung für Arzneimittelsicherheit bewusst wahrnehmen",
      "Praktische Herstellung und Qualitätskontrolle beherrschen",
    ],
    quellen: [ilo, wef],
    tasks: [
      {
        id: "pha-1",
        title: "Wirkstoffkandidaten am Rechner vorschlagen",
        description: "Mögliche neue Moleküle für eine Zielstruktur finden.",
        kiEignung: 85,
        category: "analytisch",
        warum:
          "KI-Modelle durchsuchen heute riesige Molekülräume und schlagen Kandidaten deutlich schneller vor als klassisches Screening.",
      },
      {
        id: "pha-2",
        title: "Patient:in am Tresen beraten",
        description: "Fragen zu Medikamenten und Wechselwirkungen beantworten.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Individuelle Sorgen und Verständnisprobleme im persönlichen Gespräch aufzufangen bleibt menschliche Beratungsarbeit.",
      },
      {
        id: "pha-3",
        title: "Rezeptur in der Apotheke herstellen",
        description: "Individuelle Arzneimittel praktisch anfertigen.",
        kiEignung: 20,
        category: "physisch",
        warum:
          "Die praktische Herstellung individueller Rezepturen bleibt handwerkliche Arbeit mit persönlicher Verantwortung.",
      },
      {
        id: "pha-4",
        title: "Wechselwirkungen und Interaktionen prüfen",
        description: "Medikamentenkombination auf Risiken checken.",
        kiEignung: 82,
        category: "analytisch",
        warum:
          "Bekannte Wechselwirkungen listet Software zuverlässig auf, die Einschätzung im Einzelfall bleibt fachliches Urteil.",
      },
      {
        id: "pha-5",
        title: "Klinische Studiendaten auswerten",
        description: "Wirksamkeit und Sicherheit eines Präparats prüfen.",
        kiEignung: 77,
        category: "analytisch",
        warum:
          "Statistische Auswertung großer Studiendaten ist eine Stärke aktueller KI-Systeme, die Zulassungsentscheidung bleibt reguliert und menschlich.",
      },
      {
        id: "pha-6",
        title: "Qualitätskontrolle im Herstellungsprozess verantworten",
        description: "Charge vor der Freigabe prüfen.",
        kiEignung: 47,
        category: "analytisch",
        warum:
          "Für die Freigabe einer Arzneimittelcharge haftet am Ende eine konkrete approbierte Person.",
      },
      {
        id: "pha-7",
        title: "Über neue Arzneimittel und Studienlage informieren",
        description: "Ärzt:innen und Fachpersonal auf dem Laufenden halten.",
        kiEignung: 72,
        category: "routine",
        warum:
          "Zusammenfassungen liefert KI gut, die Einordnung für eine konkrete Praxis bleibt Fachaustausch zwischen Menschen.",
      },
    ],
  },

  // ─── Wirtschaft & Recht (Fortsetzung) ───
  {
    slug: "volkswirtschaftslehre",
    title: "Volkswirtschaftslehre (VWL)",
    shortDescription:
      "Modelle bauen, Politik beraten – und verstehen, warum Menschen sich nicht wie Modelle verhalten.",
    kategorie: "wirtschaft-recht",
    zukunftsausblick:
      "Datenanalyse und Modellrechnungen erledigt KI heute in einem Bruchteil der bisherigen Zeit. Die politische Beratung, das Abwägen konkurrierender Interessen und die Kommunikation komplexer Zusammenhänge an Entscheider:innen bleiben aber menschliche Aufgaben.",
    tippsMenschlich: [
      "Komplexe Zusammenhänge verständlich vermitteln können",
      "Politische und gesellschaftliche Abwägungen nicht der KI überlassen",
      "Kritisches Hinterfragen von Modellannahmen trainieren",
    ],
    quellen: [eloundou, wef],
    tasks: [
      {
        id: "vwl-1",
        title: "Ökonometrische Modelle rechnen",
        description: "Wirtschaftsdaten statistisch auswerten.",
        kiEignung: 85,
        category: "analytisch",
        warum:
          "Standard-Regressionen und Modellrechnungen mit bekannten Verfahren erledigt KI-gestützte Software heute weitgehend selbst.",
      },
      {
        id: "vwl-2",
        title: "Politikempfehlung ausarbeiten",
        description: "Aus Analyse eine konkrete Handlungsempfehlung ableiten.",
        kiEignung: 52,
        category: "analytisch",
        warum:
          "Welche Empfehlung politisch tragfähig und gesellschaftlich vertretbar ist, erfordert Abwägung, die über reine Daten hinausgeht.",
      },
      {
        id: "vwl-3",
        title: "Wirtschaftsdaten aufbereiten und visualisieren",
        description: "Rohdaten in verständliche Grafiken übersetzen.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Aus einem Datensatz Standardgrafiken zu erzeugen ist eine der zuverlässigsten Fähigkeiten aktueller KI-Tools.",
      },
      {
        id: "vwl-4",
        title: "Entscheider:innen komplexe Zusammenhänge erklären",
        description: "Wirtschaftliche Modelle für Laien verständlich machen.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Komplexe Inhalte an eine bestimmte Zuhörerschaft anzupassen und Vertrauen zu gewinnen ist Kommunikationsarbeit.",
      },
      {
        id: "vwl-5",
        title: "Neues Marktphänomen theoretisch einordnen",
        description: "Unerwartetes wirtschaftliches Verhalten erklären.",
        kiEignung: 35,
        category: "kreativ",
        warum:
          "Eine neue, tragfähige Erklärung für ein unerwartetes Phänomen zu finden ist wissenschaftliche Kreativarbeit.",
      },
      {
        id: "vwl-6",
        title: "Literaturüberblick zu einem Thema erstellen",
        description: "Forschungsstand zusammenfassen.",
        kiEignung: 87,
        category: "routine",
        warum:
          "Bestehende Literatur zusammenzufassen gehört zu den Aufgaben, bei denen KI-Textwerkzeuge heute spürbar entlasten.",
      },
      {
        id: "vwl-7",
        title: "In Gremien oder Ausschüssen verhandeln",
        description: "Position gegenüber anderen Interessengruppen vertreten.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Verhandlung und Kompromissfindung zwischen Interessengruppen bleibt zwischenmenschliche Arbeit.",
      },
    ],
  },
  {
    slug: "wirtschaftsingenieurwesen",
    title: "Wirtschaftsingenieurwesen",
    shortDescription:
      "Bewusst zwischen Technik und Wirtschaft – und damit auf beiden Seiten von KI betroffen.",
    kategorie: "wirtschaft-recht",
    zukunftsausblick:
      "Sowohl die technische als auch die betriebswirtschaftliche Seite dieses Studiums enthalten Aufgaben, die KI heute gut übernimmt. Was bleibt, ist genau die Vermittlerrolle, für die der Studiengang ursprünglich erfunden wurde: zwischen Technik, Zahlen und Menschen übersetzen.",
    tippsMenschlich: [
      "Die Vermittlerrolle zwischen Technik und Wirtschaft aktiv ausbauen",
      "Projektverantwortung über Abteilungsgrenzen hinweg üben",
      "Verhandlungs- und Präsentationskompetenz gezielt trainieren",
    ],
    quellen: [jobFuturomat, wef],
    tasks: [
      {
        id: "wing-1",
        title: "Produktionskosten kalkulieren",
        description: "Kosten eines technischen Vorhabens berechnen.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Standard-Kalkulationen aus bekannten Kostentreibern erstellt KI-gestützte Software heute weitgehend selbst.",
      },
      {
        id: "wing-2",
        title: "Technische Machbarkeit einschätzen",
        description: "Prüfen, ob eine Idee technisch realistisch umsetzbar ist.",
        kiEignung: 62,
        category: "analytisch",
        warum:
          "KI liefert Anhaltspunkte, die belastbare Einschätzung für ein konkretes Projekt bleibt Erfahrungssache.",
      },
      {
        id: "wing-3",
        title: "Projekt zwischen Technik und Vertrieb koordinieren",
        description: "Anforderungen verschiedener Abteilungen zusammenführen.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Unterschiedliche Sprachen und Interessen von Technik und Vertrieb zu übersetzen ist Kernaufgabe dieser Vermittlerrolle.",
      },
      {
        id: "wing-4",
        title: "Lieferkette und Logistik optimieren",
        description: "Materialfluss effizienter gestalten.",
        kiEignung: 85,
        category: "analytisch",
        warum:
          "Optimierungsprobleme mit klaren Zielgrößen löst KI-gestützte Software heute oft besser als manuelle Planung.",
      },
      {
        id: "wing-5",
        title: "Investitionsentscheidung vorbereiten und verantworten",
        description: "Für ein technisches Vorhaben grünes Licht geben.",
        kiEignung: 47,
        category: "analytisch",
        warum:
          "Verantwortung für eine größere Investition mit unsicherem Ausgang bleibt eine unternehmerische Entscheidung von Menschen.",
      },
      {
        id: "wing-6",
        title: "Präsentation für Management erstellen",
        description: "Komplexen Sachverhalt kompakt aufbereiten.",
        kiEignung: 65,
        category: "kreativ",
        warum:
          "Foliensätze aus Kerninhalten erzeugt KI zuverlässig, die Zuspitzung auf das Publikum bleibt Fingerspitzengefühl.",
      },
      {
        id: "wing-7",
        title: "Verhandlung mit Lieferanten führen",
        description: "Konditionen für Bauteile oder Dienstleistungen aushandeln.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Verhandlungsgeschick und das Lesen der Gegenseite lassen sich kaum automatisieren.",
      },
    ],
  },

  // ─── Geistes- & Sozialwissenschaft (Fortsetzung) ───
  {
    slug: "soziale-arbeit",
    title: "Soziale Arbeit",
    shortDescription:
      "Einer der Studiengänge mit dem geringsten KI-Risiko überhaupt – aus gutem Grund.",
    kategorie: "geistes-sozialwissenschaft",
    zukunftsausblick:
      "Verwaltung und Dokumentation lassen sich zunehmend KI-gestützt beschleunigen. Der Kern des Berufs – Vertrauen zu Menschen in schwierigen Lebenslagen aufbauen und sie durch Krisen begleiten – gehört zu den am wenigsten automatisierbaren Tätigkeiten überhaupt.",
    tippsMenschlich: [
      "Beziehungsaufbau und Vertrauen als zentrale Kompetenz begreifen",
      "Belastbarkeit für emotional fordernde Situationen entwickeln",
      "KI-Tools für Dokumentation nutzen, um mehr Zeit für Menschen zu haben",
    ],
    quellen: [freyOsborne, ilo],
    tasks: [
      {
        id: "sa-1",
        title: "Falldokumentation schreiben",
        description: "Betreuungsverlauf strukturiert festhalten.",
        kiEignung: 70,
        category: "routine",
        warum:
          "Aus Gesprächsnotizen strukturierte Berichte zu erzeugen ist eine der am weitesten verbreiteten KI-Anwendungen im sozialen Bereich.",
      },
      {
        id: "sa-2",
        title: "Vertrauensvolle Beziehung zu Klient:innen aufbauen",
        description: "Über Zeit Vertrauen in einer belasteten Lebenslage entwickeln.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "Vertrauen entsteht durch echte, wiederholte menschliche Begegnung – eine der am wenigsten automatisierbaren Erfahrungen.",
      },
      {
        id: "sa-3",
        title: "Krisensituation einschätzen und intervenieren",
        description: "Akute Gefährdung erkennen und richtig reagieren.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "In einer akuten Krise Verantwortung zu übernehmen und richtig zu handeln erfordert menschliches Urteilsvermögen unter Druck.",
      },
      {
        id: "sa-4",
        title: "Zwischen Ämtern und Institutionen vermitteln",
        description: "Klient:innen durch bürokratische Prozesse begleiten.",
        kiEignung: 20,
        category: "sozial",
        warum:
          "Menschen durch komplexe Verwaltungsprozesse zu begleiten und für sie einzustehen bleibt persönliche Fürsprache.",
      },
      {
        id: "sa-5",
        title: "Fördermittel und Anträge recherchieren",
        description: "Passende Unterstützungsangebote finden.",
        kiEignung: 75,
        category: "routine",
        warum:
          "Verfügbare Programme und Fristen zu recherchieren ist eine Aufgabe, bei der KI-Suche heute gut unterstützt.",
      },
      {
        id: "sa-6",
        title: "Gruppenangebot planen und leiten",
        description: "Workshop oder Gruppentreffen für Klient:innen gestalten.",
        kiEignung: 30,
        category: "kreativ",
        warum:
          "Die Leitung selbst lebt von echter Präsenz im Raum, auch wenn die Vorbereitung KI-gestützt schneller geht.",
      },
      {
        id: "sa-7",
        title: "Mit Kolleg:innen im Team beraten",
        description: "Schwierige Fälle im Team besprechen.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Kollegiale Fallberatung lebt von unterschiedlichen menschlichen Perspektiven und echtem Austausch.",
      },
    ],
  },
  {
    slug: "paedagogik",
    title: "Pädagogik / Erziehungswissenschaft",
    shortDescription:
      "Lernen erforschen und gestalten – in einem Berufsfeld, das explizit als Wachstumsbranche gilt.",
    kategorie: "geistes-sozialwissenschaft",
    zukunftsausblick:
      "Der WEF Future of Jobs Report zählt Bildungsberufe zu den wachsenden Berufsfeldern, während administrative Aufgaben schrumpfen. KI übernimmt Materialerstellung und Verwaltung, die Beziehung zu Lernenden und die pädagogische Urteilsfähigkeit bleiben menschlich.",
    tippsMenschlich: [
      "Beziehungsarbeit mit Lernenden als Kern des Berufs begreifen",
      "Pädagogisches Urteilsvermögen für individuelle Situationen schärfen",
      "KI-Tools zur Materialerstellung nutzen, um mehr Zeit für Menschen zu haben",
    ],
    quellen: [wef, jobFuturomat],
    tasks: [
      {
        id: "paed-1",
        title: "Unterrichtsmaterial erstellen",
        description: "Übungen und Arbeitsblätter für ein Thema entwickeln.",
        kiEignung: 85,
        category: "routine",
        warum:
          "Aus einem Lernziel Übungsmaterial zu erzeugen ist eine der am weitesten verbreiteten KI-Anwendungen im Bildungsbereich.",
      },
      {
        id: "paed-2",
        title: "Lernstand individuell einschätzen",
        description: "Verstehen, wo eine einzelne Person gerade steht.",
        kiEignung: 40,
        category: "analytisch",
        warum:
          "Standardtests wertet Software gut aus, das Gesamtbild einer Person im Kontext einzuschätzen bleibt pädagogisches Urteil.",
      },
      {
        id: "paed-3",
        title: "Lerngruppe anleiten und motivieren",
        description: "Eine Gruppe durch eine Lernsituation führen.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Eine Gruppe im Raum zu lesen und spontan auf sie einzugehen ist Live-Beziehungsarbeit.",
      },
      {
        id: "paed-4",
        title: "Bildungskonzept wissenschaftlich entwickeln",
        description: "Neuen pädagogischen Ansatz theoretisch begründen.",
        kiEignung: 40,
        category: "kreativ",
        warum:
          "Ein neues, in der Praxis tragfähiges Konzept zu entwickeln ist mehr als das Zusammenfassen bestehender Ansätze.",
      },
      {
        id: "paed-5",
        title: "Elterngespräch führen",
        description: "Sensible Themen mit Eltern besprechen.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "Ein heikles Gespräch über ein Kind einfühlsam zu führen bleibt zutiefst menschliche Kommunikation.",
      },
      {
        id: "paed-6",
        title: "Verwaltung und Dokumentation erledigen",
        description: "Berichte und Nachweise erstellen.",
        kiEignung: 80,
        category: "routine",
        warum:
          "Standardisierte Verwaltungsdokumentation lässt sich heute weitgehend KI-gestützt vorbereiten.",
      },
      {
        id: "paed-7",
        title: "Auf ungeplante Konfliktsituation reagieren",
        description: "Spontanen Streit oder Krise in der Gruppe klären.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "Spontane Konflikte zwischen Menschen in Echtzeit zu lösen erfordert Präsenz, Erfahrung und Fingerspitzengefühl.",
      },
    ],
  },
  {
    slug: "politikwissenschaft",
    title: "Politikwissenschaft",
    shortDescription:
      "Analyse politischer Prozesse – zwischen Datenauswertung und dem Ringen um Deutungshoheit.",
    kategorie: "geistes-sozialwissenschaft",
    zukunftsausblick:
      "KI wertet politische Texte, Umfragen und Wahldaten heute schnell aus. Die Einordnung, was ein Ereignis politisch bedeutet, und die Fähigkeit, in einer hitzigen Debatte zu überzeugen, bleiben menschliche Fähigkeiten mit hohem Wert.",
    tippsMenschlich: [
      "Eigenständige politische Analyse statt reiner Zusammenfassung üben",
      "Rhetorik und Debattenfähigkeit gezielt trainieren",
      "Kritische Distanz zu KI-generierten Einordnungen bewahren",
    ],
    quellen: [freyOsborne, wef],
    tasks: [
      {
        id: "pol-1",
        title: "Umfragedaten und Wahlergebnisse auswerten",
        description: "Politische Datensätze statistisch analysieren.",
        kiEignung: 77,
        category: "analytisch",
        warum:
          "Statistische Auswertung von Umfrage- und Wahldaten ist eine Stärke aktueller KI-Tools.",
      },
      {
        id: "pol-2",
        title: "Politisches Ereignis einordnen",
        description: "Bedeutung eines aktuellen Ereignisses erklären.",
        kiEignung: 32,
        category: "analytisch",
        warum:
          "Ein Ereignis im richtigen historischen und gesellschaftlichen Kontext zu deuten erfordert mehr als Musterabgleich.",
      },
      {
        id: "pol-3",
        title: "Positionspapier oder Gutachten schreiben",
        description: "Fundierte Argumentation zu einer politischen Frage verfassen.",
        kiEignung: 55,
        category: "kreativ",
        warum:
          "Für den ersten Entwurf hilft KI gut, eine überzeugende eigenständige Argumentationslinie bleibt Fachleistung.",
      },
      {
        id: "pol-4",
        title: "In einer Debatte überzeugend argumentieren",
        description: "Live vor Publikum für eine Position eintreten.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Spontan auf Gegenargumente zu reagieren und ein Publikum zu überzeugen ist menschliche Rhetorik in Echtzeit.",
      },
      {
        id: "pol-5",
        title: "Interviews mit Akteur:innen führen",
        description: "Einschätzungen von Politiker:innen oder Verbänden einholen.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Vertrauen aufzubauen, damit jemand offen spricht, ist eine zwischenmenschliche Fähigkeit.",
      },
      {
        id: "pol-6",
        title: "Literatur- und Quellenrecherche",
        description: "Relevante Studien und Dokumente zu einem Thema finden.",
        kiEignung: 72,
        category: "routine",
        warum:
          "Große Textmengen zu durchsuchen und zusammenzufassen gehört zu den stärksten Fähigkeiten aktueller Sprachmodelle.",
      },
      {
        id: "pol-7",
        title: "Politische Kommunikation strategisch beraten",
        description: "Botschaft und Auftreten für eine Kampagne entwickeln.",
        kiEignung: 30,
        category: "kreativ",
        warum:
          "Was bei einer konkreten Zielgruppe in einem konkreten Moment wirkt, ist strategisches Gespür, kein reines Textproblem.",
      },
    ],
  },
  {
    slug: "kommunikationswissenschaft",
    title: "Kommunikations- & Medienwissenschaft",
    shortDescription:
      "Ausgerechnet der Studiengang, der Medien erforscht, steht mitten im KI-Umbruch der Medienbranche.",
    kategorie: "geistes-sozialwissenschaft",
    zukunftsausblick:
      "Textproduktion und Medienanalyse werden in der Kommunikationsbranche bereits breit KI-unterstützt erledigt – der WEF-Report nennt Redakteur:innen unter den Berufen mit spürbarem Wandel. Strategische Beratung, Krisenkommunikation und der persönliche Kontakt zu Medien bleiben aber menschlich.",
    tippsMenschlich: [
      "Strategisches Denken statt reiner Textproduktion in den Vordergrund stellen",
      "Persönliche Netzwerke zu Journalist:innen und Multiplikator:innen pflegen",
      "Krisenkommunikation und schnelle Entscheidungen unter Druck üben",
    ],
    quellen: [wef, eloundou],
    tasks: [
      {
        id: "kom-1",
        title: "Pressemitteilung oder Social-Media-Post schreiben",
        description: "Standardtext für ein Thema verfassen.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Standardisierte Kommunikationstexte erzeugen KI-Tools heute in Sekunden in brauchbarer Qualität.",
      },
      {
        id: "kom-2",
        title: "Kommunikationsstrategie entwickeln",
        description: "Langfristigen Plan für ein Thema oder eine Marke entwerfen.",
        kiEignung: 35,
        category: "kreativ",
        warum:
          "Welche Strategie zu einer bestimmten Organisation und einem bestimmten Moment passt, erfordert strategisches Urteil.",
      },
      {
        id: "kom-3",
        title: "Medienanalyse durchführen",
        description: "Berichterstattung zu einem Thema systematisch auswerten.",
        kiEignung: 85,
        category: "analytisch",
        warum:
          "Große Mengen an Medienbeiträgen automatisiert auszuwerten ist eine Stärke aktueller KI-Systeme.",
      },
      {
        id: "kom-4",
        title: "In einer Krisensituation kommunizieren",
        description: "Schnell und richtig auf eine akute Krise reagieren.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Unter Zeitdruck die richtige Tonalität zu treffen und Vertrauen zu erhalten bleibt eine hochsensible menschliche Aufgabe.",
      },
      {
        id: "kom-5",
        title: "Persönlichen Kontakt zu Journalist:innen pflegen",
        description: "Beziehungen zu Medienvertreter:innen aufbauen.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Vertrauensvolle Beziehungen zu Medienschaffenden entstehen durch echten, wiederholten menschlichen Kontakt.",
      },
      {
        id: "kom-6",
        title: "Interview vorbereiten und führen",
        description: "Gesprächspartner:in befragen und Antworten einordnen.",
        kiEignung: 20,
        category: "sozial",
        warum:
          "Im Gespräch spontan nachzuhaken und Zwischentöne zu erkennen bleibt eine menschliche Fähigkeit.",
      },
      {
        id: "kom-7",
        title: "Bewegtbild oder Podcast produzieren",
        description: "Multimedialen Inhalt konzipieren und schneiden.",
        kiEignung: 55,
        category: "kreativ",
        warum:
          "Technische Produktion und Schnitt unterstützt KI stark, die kreative Konzeption bleibt menschliche Entscheidung.",
      },
    ],
  },

  // ─── Interdisziplinär ───
  {
    slug: "cognitive-science",
    title: "Cognitive Science",
    shortDescription:
      "Der Studiengang, der KI selbst mit erforscht – aus Psychologie, Informatik, Linguistik und Philosophie.",
    kategorie: "interdisziplinaer",
    zukunftsausblick:
      "Cognitive Science steht in einer besonderen Position: Es ist der Studiengang, dessen Grundlagenforschung KI-Systeme wie neuronale Netze überhaupt erst mit hervorgebracht hat. Programmier- und Analyseaufgaben lassen sich zunehmend KI-gestützt erledigen, das eigenständige Verknüpfen von Erkenntnissen aus ganz unterschiedlichen Disziplinen bleibt aber eine genuin menschliche Stärke – und genau die wird gerade wichtiger, nicht überflüssiger.",
    tippsMenschlich: [
      "Interdisziplinäres Verknüpfen von Wissen als Kernkompetenz aktiv trainieren",
      "Experimentelle Studien mit echten Proband:innen selbst durchführen",
      "Philosophische und ethische Fragen zu KI nicht der KI überlassen",
    ],
    quellen: [eloundou, ilo, freyOsborne],
    tasks: [
      {
        id: "cs-1",
        title: "Verhaltensexperiment programmieren und auswerten",
        description: "Experiment am Rechner umsetzen und Daten analysieren.",
        kiEignung: 72,
        category: "analytisch",
        warum:
          "Standard-Experimentcode und -Auswertung nach bekanntem Muster erstellt KI heute zuverlässig aus einer Beschreibung.",
      },
      {
        id: "cs-2",
        title: "Neuronales Netz oder Rechenmodell des Denkens bauen",
        description: "Kognitive Prozesse computational modellieren.",
        kiEignung: 52,
        category: "analytisch",
        warum:
          "Für Standardmodelle hilft KI stark bei der Umsetzung, welches Modell die richtige Frage beantwortet, bleibt fachliche Entscheidung.",
      },
      {
        id: "cs-3",
        title: "Erkenntnisse aus mehreren Disziplinen verknüpfen",
        description: "Befunde aus Psychologie, Informatik und Linguistik zusammenführen.",
        kiEignung: 25,
        category: "kreativ",
        warum:
          "Scheinbar unzusammenhängende Erkenntnisse aus verschiedenen Fachkulturen zu einer neuen Idee zu verbinden ist Kern menschlicher Kreativität in der Forschung.",
      },
      {
        id: "cs-4",
        title: "Proband:innenstudie durchführen",
        description: "Menschen im Labor durch ein Experiment begleiten.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Menschen im Experiment verständlich anzuleiten und auf Rückfragen einzugehen bleibt zwischenmenschliche Arbeit.",
      },
      {
        id: "cs-5",
        title: "Fachliteratur aus mehreren Feldern zusammenfassen",
        description: "Überblick über interdisziplinären Forschungsstand erstellen.",
        kiEignung: 67,
        category: "routine",
        warum:
          "Zusammenfassen bekannter Literatur gehört zu den zuverlässigsten Fähigkeiten aktueller Sprachmodelle.",
      },
      {
        id: "cs-6",
        title: "Ethische Fragen zu KI-Systemen einordnen",
        description: "Gesellschaftliche Implikationen kognitiver Technologien bewerten.",
        kiEignung: 17,
        category: "analytisch",
        warum:
          "Eine KI kann Argumente zu ihrer eigenen Ethik zusammenfassen, die verantwortliche Abwägung bleibt eine zutiefst menschliche Aufgabe.",
      },
      {
        id: "cs-7",
        title: "Interdisziplinäres Team koordinieren",
        description: "Zusammenarbeit zwischen Psycholog:innen, Informatiker:innen und Linguist:innen organisieren.",
        kiEignung: 10,
        category: "sozial",
        warum:
          "Menschen mit völlig unterschiedlichen Fachsprachen zu einer gemeinsamen Arbeitsweise zu bringen ist anspruchsvolle Beziehungsarbeit.",
      },
    ],
  },
  {
    slug: "data-science",
    title: "Data Science",
    shortDescription:
      "Der Studiengang, der die eigene Automatisierung mitentwickelt – mit interessanten Folgen für sich selbst.",
    kategorie: "interdisziplinaer",
    zukunftsausblick:
      "Kaum ein Feld ist so eng mit dem eigenen Automatisierungswerkzeug verflochten: Modelltraining und Standardanalysen erledigen KI-Assistenten inzwischen selbst weite Strecken. Was bleibt, ist die Frage, die kein Modell sich selbst stellt – ob die Daten überhaupt die richtige Frage beantworten und wem das Ergebnis nützt.",
    tippsMenschlich: [
      "Kritisches Hinterfragen von Daten, Modellen und ihren Grenzen trainieren",
      "Verantwortung für Entscheidungen übernehmen, die auf Modellen basieren",
      "Domänenwissen aufbauen, um Ergebnisse richtig einzuordnen",
    ],
    quellen: [eloundou, wef],
    tasks: [
      {
        id: "ds-1",
        title: "Standardmodell trainieren und evaluieren",
        description: "Gängiges Machine-Learning-Modell auf einen Datensatz anwenden.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Für bekannte Aufgabentypen schlägt KI-gestützte Software heute passende Modelle samt Code weitgehend selbstständig vor.",
      },
      {
        id: "ds-2",
        title: "Daten bereinigen und aufbereiten",
        description: "Rohdaten von Fehlern und Lücken befreien.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Typische Datenqualitätsprobleme erkennt und behebt KI-gestützte Software inzwischen weitgehend automatisch.",
      },
      {
        id: "ds-3",
        title: "Die richtige Fragestellung an die Daten finden",
        description: "Klären, welches Problem mit den Daten eigentlich gelöst werden soll.",
        kiEignung: 25,
        category: "kreativ",
        warum:
          "Zu erkennen, welche Frage für ein Unternehmen oder eine Forschungsfrage wirklich relevant ist, bleibt menschliches Urteil.",
      },
      {
        id: "ds-4",
        title: "Modellergebnis für Entscheider:innen einordnen",
        description: "Erklären, was ein Modell tatsächlich aussagt – und was nicht.",
        kiEignung: 20,
        category: "sozial",
        warum:
          "Verzerrungen, Grenzen und Unsicherheit eines Modells verständlich zu kommunizieren ist Vermittlungsarbeit mit Verantwortung.",
      },
      {
        id: "ds-5",
        title: "Datenpipeline und Infrastruktur aufsetzen",
        description: "Technische Grundlage für laufende Datenverarbeitung bauen.",
        kiEignung: 87,
        category: "routine",
        warum:
          "Für Standard-Infrastruktur nach bekanntem Muster liefert KI-gestützte Entwicklung heute brauchbaren Code.",
      },
      {
        id: "ds-6",
        title: "Verzerrungen und ethische Risiken eines Modells prüfen",
        description: "Modell auf unfaire oder schädliche Effekte untersuchen.",
        kiEignung: 42,
        category: "analytisch",
        warum:
          "Ob ein Modell bestimmte Gruppen benachteiligt und was das gesellschaftlich bedeutet, erfordert menschliche Verantwortung, kein Modell prüft sich selbst hinreichend kritisch.",
      },
      {
        id: "ds-7",
        title: "Ergebnisse mit Fachabteilung diskutieren",
        description: "Analyseergebnisse gemeinsam mit Praktiker:innen einordnen.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Ob eine statistische Auffälligkeit fachlich überhaupt sinnvoll ist, klärt sich im Gespräch mit Menschen vor Ort.",
      },
    ],
  },
  {
    slug: "nachhaltigkeitswissenschaft",
    title: "Nachhaltigkeits- & Umweltwissenschaften",
    shortDescription:
      "Klima, Ökonomie und Politik zusammendenken – in einem der laut WEF am stärksten wachsenden Berufsfelder.",
    kategorie: "interdisziplinaer",
    zukunftsausblick:
      "Der WEF Future of Jobs Report zählt Rollen im Bereich Umwelt und grüner Transformation zu den am stärksten wachsenden Berufsfeldern bis 2030. KI hilft enorm bei Modellierung und Monitoring, die politische Abwägung zwischen ökologischen, wirtschaftlichen und sozialen Interessen bleibt aber eine zutiefst menschliche Aufgabe.",
    tippsMenschlich: [
      "Interessenkonflikte zwischen Ökologie, Wirtschaft und Sozialem moderieren können",
      "Vor Ort mit Betroffenen und Institutionen kommunizieren",
      "Kritische Distanz zu Modellprognosen bewahren",
    ],
    quellen: [wef, ilo],
    tasks: [
      {
        id: "nw-1",
        title: "Klima- oder Umweltdaten modellieren",
        description: "Entwicklung eines Umweltparameters simulieren.",
        kiEignung: 67,
        category: "analytisch",
        warum:
          "Für etablierte Modelltypen liefert KI-gestützte Simulation heute schnelle, brauchbare Ergebnisse.",
      },
      {
        id: "nw-2",
        title: "Messdaten aus Sensoren und Feldstudien auswerten",
        description: "Monitoring-Daten zu Umweltzuständen analysieren.",
        kiEignung: 72,
        category: "analytisch",
        warum:
          "Große Mengen an Sensordaten automatisiert auszuwerten ist eine Stärke aktueller KI-Systeme.",
      },
      {
        id: "nw-3",
        title: "Vor Ort Proben nehmen oder Ökosysteme untersuchen",
        description: "Praktische Feldarbeit in der Natur durchführen.",
        kiEignung: 15,
        category: "physisch",
        warum:
          "Arbeit unter realen, unvorhersehbaren Feldbedingungen bleibt praktische menschliche Tätigkeit.",
      },
      {
        id: "nw-4",
        title: "Interessenkonflikt zwischen Klimaschutz und Wirtschaft moderieren",
        description: "Zwischen widerstreitenden Interessengruppen vermitteln.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "Politische und wirtschaftliche Interessen gegeneinander abzuwägen und Kompromisse zu finden ist Kern menschlicher Verantwortung.",
      },
      {
        id: "nw-5",
        title: "Nachhaltigkeitsbericht für ein Unternehmen erstellen",
        description: "Kennzahlen und Fortschritt strukturiert dokumentieren.",
        kiEignung: 77,
        category: "routine",
        warum:
          "Standardisierte Berichte aus vorhandenen Kennzahlen erzeugt KI-Software heute weitgehend selbstständig.",
      },
      {
        id: "nw-6",
        title: "Mit betroffenen Gemeinden vor Ort kommunizieren",
        description: "Ein Projekt gegenüber Anwohnerschaft erklären und Bedenken aufnehmen.",
        kiEignung: 5,
        category: "sozial",
        warum:
          "Vertrauen bei Menschen vor Ort aufzubauen, deren Lebensraum betroffen ist, gelingt nur im echten Gespräch.",
      },
      {
        id: "nw-7",
        title: "Politikempfehlung zur Klimaanpassung entwickeln",
        description: "Aus Datenlage konkrete Handlungsvorschläge ableiten.",
        kiEignung: 35,
        category: "kreativ",
        warum:
          "Welche Maßnahme politisch und gesellschaftlich tragfähig ist, erfordert Abwägung, die über reine Modellergebnisse hinausgeht.",
      },
    ],
  },
  {
    slug: "digital-humanities",
    title: "Digital Humanities",
    shortDescription:
      "Geisteswissenschaft mit Rechenpower – Texte, Kultur und Geschichte computergestützt erschließen.",
    kategorie: "interdisziplinaer",
    zukunftsausblick:
      "KI beschleunigt die computergestützte Analyse riesiger Textkorpora enorm – Aufgaben, für die früher Jahre manueller Auszeichnung nötig waren, laufen heute automatisiert. Die geisteswissenschaftliche Interpretation, die kuratorische Auswahl und der Umgang mit unvollständigen historischen Quellen bleiben aber eine Fachleistung von Menschen.",
    tippsMenschlich: [
      "Fundierte geisteswissenschaftliche Interpretation nicht an KI delegieren",
      "Quellenkritik bei historischen und kulturellen Materialien schärfen",
      "Programmierkenntnisse als Werkzeug begreifen, nicht als Selbstzweck",
    ],
    quellen: [eloundou, freyOsborne],
    tasks: [
      {
        id: "dh-1",
        title: "Textkorpus digitalisieren und strukturieren",
        description: "Historische oder literarische Texte maschinenlesbar aufbereiten.",
        kiEignung: 90,
        category: "routine",
        warum:
          "Texterkennung und Grundstrukturierung großer Textmengen erledigt KI-gestützte Software heute weitgehend automatisch.",
      },
      {
        id: "dh-2",
        title: "Muster in großen Textmengen computergestützt finden",
        description: "Auffälligkeiten über tausende Dokumente hinweg aufspüren.",
        kiEignung: 85,
        category: "analytisch",
        warum:
          "Statistische Musteranalyse über riesige Textmengen ist eine der Stärken aktueller KI-Systeme.",
      },
      {
        id: "dh-3",
        title: "Historische Quelle kritisch einordnen",
        description: "Herkunft, Verzerrung und Kontext einer Quelle einschätzen.",
        kiEignung: 47,
        category: "analytisch",
        warum:
          "Quellenkritik verlangt Fachwissen über den historischen Kontext, das über reine Textmusteranalyse hinausgeht.",
      },
      {
        id: "dh-4",
        title: "Eigene Forschungsfrage aus einem Fund entwickeln",
        description: "Aus einem überraschenden Textbefund eine neue These ableiten.",
        kiEignung: 30,
        category: "kreativ",
        warum:
          "Aus einem Datenmuster eine kulturhistorisch bedeutsame Interpretation zu entwickeln bleibt geisteswissenschaftliche Kreativarbeit.",
      },
      {
        id: "dh-5",
        title: "Tool oder Datenbank für Forschungszwecke programmieren",
        description: "Eigene Software zur Analyse historischer Daten entwickeln.",
        kiEignung: 82,
        category: "routine",
        warum:
          "Für klar umrissene Analysewerkzeuge liefert KI heute brauchbaren Code als Startpunkt.",
      },
      {
        id: "dh-6",
        title: "Ergebnisse einem Fachpublikum vermitteln",
        description: "Forschungsergebnis auf einer Tagung präsentieren.",
        kiEignung: 15,
        category: "sozial",
        warum:
          "Auf kritische Rückfragen von Fachkolleg:innen einzugehen ist Live-Kommunikation zwischen Menschen.",
      },
      {
        id: "dh-7",
        title: "Kulturelle Sammlung kuratieren",
        description: "Auswahl treffen, was in ein digitales Archiv aufgenommen wird.",
        kiEignung: 25,
        category: "kreativ",
        warum:
          "Was kulturell bedeutsam genug ist, um bewahrt zu werden, ist eine Werturteilsfrage, die Menschen verantworten.",
      },
    ],
  },
];

export function getStudiengang(slug: string): Studiengang | undefined {
  return studiengaenge.find((s) => s.slug === slug);
}

export function getAlleStudiengangSlugs(): string[] {
  return studiengaenge.map((s) => s.slug);
}
