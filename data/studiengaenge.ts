import { STANDARD_QUELLEN } from "@/types";
import type { Studiengang } from "@/types";

const { jobFuturomat, freyOsborne, ilo, wef } = STANDARD_QUELLEN;

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
    quellen: [jobFuturomat, wef],
    tasks: [
      {
        id: "inf-1",
        title: "Standard-Code schreiben",
        description: "Übliche Funktionen, CRUD-Logik, Boilerplate.",
        kiEignung: 85,
        category: "routine",
        warum:
          "Boilerplate, CRUD-Funktionen und Standardalgorithmen generieren Copilot & Co. heute zuverlässig aus einer kurzen Beschreibung.",
      },
      {
        id: "inf-2",
        title: "Systemarchitektur entwerfen",
        description: "Entscheiden, wie ein größeres System aufgebaut wird.",
        kiEignung: 30,
        category: "analytisch",
        warum:
          "Welche Trade-offs für dieses Produkt, dieses Team und dieses Budget richtig sind, erfordert Erfahrung und Kontext, den KI nicht hat.",
      },
      {
        id: "inf-3",
        title: "Bugs in fremdem Code debuggen",
        description: "Ursache eines Fehlers in gewachsenem Code finden.",
        kiEignung: 55,
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
        kiEignung: 75,
        category: "routine",
        warum:
          "Testfälle aus Funktionssignaturen abzuleiten ist ein Musterbeispiel für generative KI.",
      },
      {
        id: "inf-6",
        title: "Code-Review verantworten",
        description: "Eine Änderung zur Freigabe prüfen und unterschreiben.",
        kiEignung: 25,
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
        kiEignung: 65,
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
        kiEignung: 55,
        category: "analytisch",
        warum:
          "Für Standardregelkreise liefert KI-gestützte Software brauchbare Startwerte, Feinschliff bleibt Aufgabe der Ingenieurin.",
      },
      {
        id: "et-5",
        title: "Abnahme nach VDE-Norm verantworten",
        description: "Anlage offiziell zur Nutzung freigeben.",
        kiEignung: 15,
        category: "analytisch",
        warum:
          "Prüfgeräte liefern die Werte automatisch, die gesetzliche Freigabe unterschreibt trotzdem eine Elektrofachkraft mit persönlicher Haftung.",
      },
      {
        id: "et-6",
        title: "Schaltpläne und Dokumentation erstellen",
        description: "Aufbau einer Anlage nachvollziehbar festhalten.",
        kiEignung: 70,
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
        kiEignung: 70,
        category: "analytisch",
        warum:
          "Statistische Auswertung großer Datensätze ist eine der stärksten Domänen aktueller KI-Tools.",
      },
      {
        id: "phy-2",
        title: "Simulationen programmieren",
        description: "Physikalisches Verhalten am Rechner nachbilden.",
        kiEignung: 55,
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
        kiEignung: 20,
        category: "kreativ",
        warum:
          "Ein unerwartetes Messergebnis als Hinweis auf etwas grundlegend Neues zu deuten ist der kreative Kern von Forschung.",
      },
      {
        id: "phy-5",
        title: "Fachliteratur zusammenfassen",
        description: "Überblick über den Stand der Forschung erstellen.",
        kiEignung: 65,
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
        kiEignung: 25,
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
        kiEignung: 65,
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
        kiEignung: 25,
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
        kiEignung: 60,
        category: "routine",
        warum:
          "Aus Gesprächsnotizen einen strukturierten Arztbrief zu erzeugen ist eine der am weitesten verbreiteten KI-Anwendungen in Kliniken.",
      },
      {
        id: "med-7",
        title: "Leitlinien und aktuelle Studienlage einordnen",
        description: "Neue Forschung auf den Einzelfall übertragen.",
        kiEignung: 45,
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
    quellen: [wef, jobFuturomat],
    tasks: [
      {
        id: "bwl-1",
        title: "Finanzkennzahlen berechnen und Reports erstellen",
        description: "Zahlen aufbereiten und in Berichte gießen.",
        kiEignung: 75,
        category: "routine",
        warum:
          "Kennzahlen aus Daten zu berechnen und in Standardformate zu bringen ist einer der am stärksten automatisierten Bürojobs überhaupt.",
      },
      {
        id: "bwl-2",
        title: "Marktanalyse recherchieren",
        description: "Wettbewerb und Marktumfeld zusammentragen.",
        kiEignung: 60,
        category: "analytisch",
        warum:
          "Öffentlich verfügbare Marktdaten zu sammeln und zusammenzufassen erledigt KI heute in einem Bruchteil der Zeit.",
      },
      {
        id: "bwl-3",
        title: "Strategieentscheidung mit Unsicherheit treffen",
        description: "Bei unklarer Datenlage eine Richtung festlegen.",
        kiEignung: 20,
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
        kiEignung: 55,
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
        kiEignung: 70,
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
    quellen: [wef, ilo],
    tasks: [
      {
        id: "jur-1",
        title: "Gesetzestexte und Urteile recherchieren",
        description: "Relevante Rechtsprechung zu einem Fall finden.",
        kiEignung: 70,
        category: "routine",
        warum:
          "KI-gestützte Rechtsdatenbanken durchsuchen Urteile und Gesetze inzwischen deutlich schneller als eine Recherche von Hand.",
      },
      {
        id: "jur-2",
        title: "Standardvertrag aus Textbausteinen erstellen",
        description: "Verträge nach Muster zusammenstellen.",
        kiEignung: 65,
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
        kiEignung: 20,
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
        kiEignung: 40,
        category: "analytisch",
        warum:
          "KI markiert ungewöhnliche Klauseln zuverlässig, die endgültige Risikoeinschätzung für die Mandantschaft bleibt juristisches Urteil.",
      },
      {
        id: "jur-7",
        title: "Ethisch schwierige Güterabwägung entscheiden",
        description: "Zwischen widerstreitenden Interessen abwägen.",
        kiEignung: 10,
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
        kiEignung: 70,
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
        kiEignung: 35,
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
        kiEignung: 55,
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
        kiEignung: 45,
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
        kiEignung: 85,
        category: "routine",
        warum:
          "Zusammenfassen und Korrigieren von Texten gehört zu den zuverlässigsten Fähigkeiten heutiger Sprachmodelle.",
      },
      {
        id: "ger-2",
        title: "Literaturinterpretation mit eigener These entwickeln",
        description: "Einen eigenständigen Deutungsansatz zu einem Werk finden.",
        kiEignung: 25,
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
        kiEignung: 20,
        category: "kreativ",
        warum:
          "Eine erkennbar eigene Stimme und Haltung in einem Text zu entwickeln bleibt schwer nachahmbar, so gut KI-Texte klingen mögen.",
      },
      {
        id: "ger-5",
        title: "Quellenrecherche im Archiv",
        description: "Historische oder seltene Quellen auffinden.",
        kiEignung: 40,
        category: "analytisch",
        warum:
          "Digitalisierte Bestände durchsucht KI gut, unerschlossene oder physische Archivbestände erfordern weiterhin Handarbeit vor Ort.",
      },
      {
        id: "ger-6",
        title: "Sprachliche Nuancen und Ironie erkennen",
        description: "Zwischen den Zeilen lesen.",
        kiEignung: 35,
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
];

export function getStudiengang(slug: string): Studiengang | undefined {
  return studiengaenge.find((s) => s.slug === slug);
}

export function getAlleStudiengangSlugs(): string[] {
  return studiengaenge.map((s) => s.slug);
}
