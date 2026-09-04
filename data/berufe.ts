import type { Beruf } from "@/types";
import { STANDARD_QUELLEN } from "@/types";

const { jobFuturomat, iabKurzbericht, freyOsborne, ilo } = STANDARD_QUELLEN;

/**
 * Die KI-Eignungswerte sind didaktische Schätzwerte zur Diskussionsanregung,
 * keine wissenschaftlichen Prognosen. Der Durchschnitt je Beruf ist grob an
 * zwei realen Datenquellen kalibriert:
 *  - Frey & Osborne (2013): Wahrscheinlichkeit der Computerisierung (USA, vor
 *    generativer KI – daher bei IT/Kreativberufen bewusst nach oben korrigiert).
 *  - IAB Job-Futuromat / Dengler & Matthes: Substituierbarkeitspotenzial je
 *    Beruf in Deutschland (Stand 2022, Kurzbericht 5|2024).
 * Die konkreten Vergleichswerte stehen in den `quellen`-Einträgen.
 */
export const berufe: Beruf[] = [
  // ─────────────────────────── Gesundheit & Soziales ───────────────────────────
  {
    slug: "pflegefachkraft",
    title: "Pflegefachkraft",
    shortDescription:
      "Betreut und versorgt kranke, alte oder pflegebedürftige Menschen im Klinik- oder Pflegealltag.",
    kategorie: "gesundheit-soziales",
    zukunftsausblick:
      "Pflege bleibt stark von direktem menschlichem Kontakt geprägt. KI kann bei Dokumentation, Medikamentenlogik und Frühwarnsystemen entlasten, ersetzt aber weder die körperliche Versorgung noch die Beziehungsarbeit. Der Bedarf an Pflegekräften wächst weiter.",
    tippsMenschlich: [
      "Empathie und echte Gespräche mit Patient:innen und Angehörigen",
      "Verantwortung in Notfällen und schnelles Handeln unter Druck",
      "Körperliche Versorgung und feinfühlige Pflege am Menschen",
    ],
    quellen: [
      { ...freyOsborne, wert: "Registered Nurses: 0,9 %" },
      { ...iabKurzbericht, wert: "Gesundheits-/Pflegeberufe: unterdurchschnittlich" },
      jobFuturomat,
    ],
    tasks: [
      { id: "pf-1", title: "Medikamente vorbereiten und dosieren", description: "Nach ärztlichem Plan Medikamente richten und kontrollieren.", kiEignung: 40, category: "routine", warum: "Die Dosis nach Plan ausrechnen kann Software – die letzte Kontrolle am Bett, richtige Person, richtige Pille, bleibt Handarbeit." },
      { id: "pf-2", title: "Patient:innen waschen und pflegen", description: "Körperpflege, Ankleiden und Unterstützung im Alltag.", kiEignung: 10, category: "physisch", warum: "Ein Körper, der gewaschen und bewegt werden muss, im richtigen Moment und mit Gefühl – da hilft kein Bildschirm." },
      { id: "pf-3", title: "Blutdruck und Vitalwerte messen", description: "Regelmäßige Kontrolle von Puls, Blutdruck und Temperatur.", kiEignung: 60, category: "routine", warum: "Blutdruck misst längst ein Gerät, oft automatisch. Die Zahl ablesen und weitergeben ist der kleinere Teil." },
      { id: "pf-4", title: "Pflegedokumentation schreiben", description: "Maßnahmen, Beobachtungen und Verläufe schriftlich festhalten.", kiEignung: 70, category: "analytisch", warum: "Standardsätze aus Stichpunkten formulieren können Sprachmodelle gut. Die Beobachtung dahinter kommt aber von dir." },
      { id: "pf-5", title: "Patientengespräche führen", description: "Zuhören, beruhigen und über den Behandlungsverlauf sprechen.", kiEignung: 15, category: "sozial", warum: "Zuhören, beruhigen und merken, wenn jemand mehr sagt als er sagt – das lässt sich nicht an eine App abgeben." },
      { id: "pf-6", title: "Notfallsituationen erkennen und handeln", description: "Verschlechterungen früh bemerken und sofort reagieren.", kiEignung: 5, category: "analytisch", warum: "Wenn es kippt, zählt Erfahrung im Raum und schnelles Handeln am Menschen. Keine Zeit für ein Tool." },
      { id: "pf-7", title: "Ärztliche Anweisungen umsetzen", description: "Verordnete Maßnahmen fachgerecht durchführen.", kiEignung: 50, category: "routine", warum: "Die Anweisung steht digital fest, die Ausführung findet am Bett statt – halb Papier, halb Handarbeit." },
      { id: "pf-8", title: "Angehörige beraten", description: "Familien über Pflege zu Hause und Hilfsangebote informieren.", kiEignung: 20, category: "sozial", warum: "Eine verunsicherte Familie braucht jemanden, der ihre Lage versteht – kein Merkblatt aus dem Automaten." },
      { id: "pf-9", title: "Lagerungswechsel zur Dekubitusprophylaxe", description: "Bettlägerige Menschen regelmäßig umlagern, um Druckstellen zu vermeiden.", kiEignung: 10, category: "physisch", warum: "Jemanden alle zwei Stunden richtig umlagern ist körperliche Arbeit am Menschen. Nichts davon passiert am PC." },
      { id: "pf-10", title: "Schichtübergabe im Team besprechen", description: "Wichtige Infos zu jeder Patientin und jedem Patienten weitergeben.", kiEignung: 25, category: "sozial", warum: "KI kann Notizen sortieren. Das Wichtige über zwölf Menschen in fünf Minuten weiterzugeben, kann sie nicht." },
    ],
  },
  {
    slug: "medizinische-fachangestellte",
    title: "Medizinische:r Fachangestellte:r",
    shortDescription:
      "Organisiert eine Arztpraxis, assistiert bei Behandlungen und betreut Patient:innen an Empfang und Labor.",
    kategorie: "gesundheit-soziales",
    zukunftsausblick:
      "Der Verwaltungsteil – Termine, Abrechnung, Karteiführung – ist stark automatisierbar und wird es zunehmend. Die Assistenz am Menschen, das Beruhigen ängstlicher Patient:innen und Handgriffe wie Blutabnahme bleiben. Der Beruf verschiebt sich Richtung Patientenbegleitung und Praxiskoordination.",
    tippsMenschlich: [
      "Ängstliche oder kranke Menschen freundlich durch den Praxisbesuch führen",
      "Sicheres, ruhiges Arbeiten bei Blutabnahme und Assistenz",
      "Den Überblick behalten, wenn Wartezimmer und Telefon gleichzeitig voll sind",
    ],
    quellen: [
      { ...freyOsborne, wert: "Medical Assistants: 30 %, Medical Secretaries: 81 %" },
      jobFuturomat,
    ],
    tasks: [
      { id: "mfa-1", title: "Termine und Praxisorganisation koordinieren", description: "Sprechstunde planen, Wartezeiten steuern, Rückrufe managen.", kiEignung: 80, category: "routine", warum: "Termine takten, Wartezeiten steuern, Rückrufe managen – Regeln und Kalender, das schafft Software fast allein." },
      { id: "mfa-2", title: "Patient:innen empfangen und aufnehmen", description: "Begrüßen, Versichertenkarte einlesen, Anliegen aufnehmen.", kiEignung: 35, category: "sozial", warum: "Die Karte einlesen ist Technik. Die Begrüßung und das erste „Was führt Sie her?“ macht ein Mensch." },
      { id: "mfa-3", title: "Blut abnehmen und Verbände anlegen", description: "Kleine medizinische Eingriffe sicher am Menschen durchführen.", kiEignung: 15, category: "physisch", warum: "Eine Nadel in die Vene setzen und einen Verband anlegen ist Handwerk am Körper – da kommt keine Maschine hin." },
      { id: "mfa-4", title: "Abrechnung mit Krankenkassen erstellen", description: "Leistungen nach EBM/GOÄ erfassen und quartalsweise abrechnen.", kiEignung: 85, category: "routine", warum: "Leistungen nach festem Katalog erfassen und abrechnen ist reine Regelarbeit auf digitalen Daten." },
      { id: "mfa-5", title: "Laborproben vorbereiten und versenden", description: "Proben beschriften, dokumentieren und ans Labor weiterleiten.", kiEignung: 60, category: "routine", warum: "Beschriften und dokumentieren läuft digital. Das Abnehmen und Verpacken der Probe nicht." },
      { id: "mfa-6", title: "Ärzt:innen bei Untersuchungen assistieren", description: "Instrumente reichen, Patient:innen lagern, Abläufe unterstützen.", kiEignung: 20, category: "physisch", warum: "Instrumente reichen, Patient:innen lagern, im richtigen Moment zupacken – körperliche Assistenz im Raum." },
      { id: "mfa-7", title: "Patient:innen zu Vorsorge und Abläufen informieren", description: "Erklären, wie eine Untersuchung abläuft oder worauf zu achten ist.", kiEignung: 30, category: "sozial", warum: "Wie eine Untersuchung abläuft, kann ein Text erklären. Ob dein Gegenüber es verstanden hat, merkt nur ein Mensch." },
      { id: "mfa-8", title: "Karteikarten und Befunde digital pflegen", description: "Befunde einscannen, zuordnen und in der Praxissoftware ablegen.", kiEignung: 75, category: "analytisch", warum: "Befunde einscannen, zuordnen, ablegen – strukturierte Ablage ist ein Heimspiel für Software." },
    ],
  },
  {
    slug: "erzieher",
    title: "Erzieher:in",
    shortDescription:
      "Begleitet und fördert Kinder in Kita oder Hort – im Spiel, im Alltag und in ihrer Entwicklung.",
    kategorie: "gesundheit-soziales",
    zukunftsausblick:
      "Pädagogische Arbeit lebt von Beziehung, Beobachtung und spontanem Reagieren – das lässt sich kaum automatisieren. KI kann bei Entwicklungsberichten und Planung unterstützen. Der Bedarf an Fachkräften ist hoch und steigt.",
    tippsMenschlich: [
      "Bindung aufbauen und Kinder emotional sicher begleiten",
      "Im Moment reagieren, wenn im Gruppenalltag etwas passiert",
      "Eltern als Partner:innen in der Erziehung gewinnen",
    ],
    quellen: [
      { ...freyOsborne, wert: "Preschool Teachers: ~1 %, Childcare Workers: 8 %" },
      jobFuturomat,
    ],
    tasks: [
      { id: "erz-1", title: "Kinder beim Spielen begleiten und fördern", description: "Spielsituationen aufgreifen und Lernanlässe daraus machen.", kiEignung: 5, category: "sozial", warum: "Aus dem, was ein Kind gerade spielt, im Moment einen Lernanlass machen – das geht nur mit einem Menschen daneben." },
      { id: "erz-2", title: "Konflikte zwischen Kindern schlichten", description: "Streit begleiten und Kindern helfen, Lösungen zu finden.", kiEignung: 5, category: "sozial", warum: "Zwei streitende Kinder brauchen jemanden, der beide ernst nimmt und vermittelt. Kein Programm." },
      { id: "erz-3", title: "Elterngespräche führen", description: "Über Entwicklung, Auffälligkeiten und Alltag der Kinder sprechen.", kiEignung: 10, category: "sozial", warum: "Über die Entwicklung eines Kindes zu sprechen ist Vertrauenssache, kein automatischer Report." },
      { id: "erz-4", title: "Entwicklungsberichte schreiben", description: "Beobachtungen strukturiert für Portfolio und Gespräche festhalten.", kiEignung: 45, category: "analytisch", warum: "Beobachtungen in Sätze gießen kann KI unterstützen. Gesehen haben musst du das Kind selbst." },
      { id: "erz-5", title: "Tagesablauf und Ausflüge planen", description: "Wochenplan, Angebote und Ausflüge organisieren.", kiEignung: 25, category: "analytisch", warum: "Einen Wochenplan bauen geht mit Vorlagen. Die Rücksicht auf genau diese Gruppe kommt von dir." },
      { id: "erz-6", title: "Bastel- und Bewegungsangebote gestalten", description: "Kreative und motorische Angebote für die Gruppe vorbereiten.", kiEignung: 20, category: "kreativ", warum: "Ideen liefert KI reichlich. Ob sie zu dieser Gruppe an diesem Tag passen, entscheidet ein Mensch." },
      { id: "erz-7", title: "Kinder trösten und bei Ängsten begleiten", description: "Nähe geben, wenn ein Kind weint, wütend oder überfordert ist.", kiEignung: 5, category: "sozial", warum: "Ein weinendes Kind braucht Nähe und eine Person, die bleibt. Das ist der Kern des Berufs." },
      { id: "erz-8", title: "Anwesenheit und Dokumentation pflegen", description: "Anwesenheitslisten, Vorfälle und Formalitäten festhalten.", kiEignung: 45, category: "routine", warum: "Anwesenheit und Vorfälle festhalten ist Formkram – der lässt sich weitgehend automatisieren." },
    ],
  },
  {
    slug: "lehrer",
    title: "Lehrer:in",
    shortDescription:
      "Unterrichtet, begleitet und bewertet Schüler:innen – vom Stundenplan bis zum Elterngespräch.",
    kategorie: "gesundheit-soziales",
    zukunftsausblick:
      "Übungsaufgaben, Korrekturen und individuelle Übungspläne kann KI schon heute gut unterstützen – das entlastet spürbar bei der Vorbereitung. Eine Klasse führen, für einen Streit sensibel bleiben oder merken, wenn es einem Kind gerade nicht gut geht, bleibt an einer Person im Raum hängen. Der Beruf wird sich stärker in Richtung Begleitung und weniger reine Wissensvermittlung verschieben.",
    tippsMenschlich: [
      "Eine Klasse als Gruppe führen und für Ruhe und Fairness sorgen",
      "Merken, wenn es einem Kind nicht gut geht, auch ohne dass es das sagt",
      "Vertrauen aufbauen, das über ein Schuljahr trägt",
    ],
    quellen: [
      { ...freyOsborne, wert: "Postsecondary Teachers: 3 %" },
      { ...iabKurzbericht, wert: "Lehrberufe: deutlich unterdurchschnittlich" },
      jobFuturomat,
    ],
    tasks: [
      { id: "leh-1", title: "Unterricht vorbereiten", description: "Stundenverlauf, Materialien und Übungsaufgaben zusammenstellen.", kiEignung: 65, category: "analytisch", warum: "Ein Sprachmodell liefert in Minuten einen Entwurf. Ob er zu genau dieser Klasse passt, entscheidest du." },
      { id: "leh-2", title: "Vor der Klasse unterrichten", description: "Inhalte erklären, Fragen beantworten, auf Reaktionen eingehen.", kiEignung: 20, category: "sozial", warum: "Live auf 25 unterschiedliche Reaktionen gleichzeitig eingehen ist etwas anderes als ein Video abzuspielen." },
      { id: "leh-3", title: "Klassenarbeiten und Hausaufgaben korrigieren", description: "Ergebnisse bewerten und Fehler nachvollziehbar markieren.", kiEignung: 55, category: "routine", warum: "Multiple-Choice und Rechtschreibung prüft Software zuverlässig. Bei Aufsätzen und Argumenten bleibt die Einschätzung schwieriger." },
      { id: "leh-4", title: "Konflikte in der Klasse schlichten", description: "Streit zwischen Schüler:innen ansprechen und lösen helfen.", kiEignung: 5, category: "sozial", warum: "Wer im Streit recht hat und wie man beide wieder ins Gespräch bringt, entscheidet niemand aus der Ferne." },
      { id: "leh-5", title: "Individuelle Förderpläne erstellen", description: "Übungen und Tempo an einzelne Schüler:innen anpassen.", kiEignung: 50, category: "analytisch", warum: "Adaptive Lernsoftware schlägt passende Übungen vor. Ob sie beim Kind ankommen, siehst nur du im Unterricht." },
      { id: "leh-6", title: "Elterngespräche führen", description: "Über Leistung, Verhalten und Entwicklung des Kindes sprechen.", kiEignung: 10, category: "sozial", warum: "Ein schwieriges Gespräch mit besorgten Eltern führen ist Vertrauensarbeit, kein Bericht zum Vorlesen." },
      { id: "leh-7", title: "Noten und Zeugnisse verwalten", description: "Bewertungen erfassen und Zeugnistexte formulieren.", kiEignung: 70, category: "routine", warum: "Noten eintragen und Standardformulierungen erzeugen ist genau das, was Verwaltungssoftware übernimmt." },
      { id: "leh-8", title: "Auf schwierige Situationen im Klassenzimmer reagieren", description: "Störungen, Überforderung oder Mobbing im Moment erkennen und handeln.", kiEignung: 5, category: "sozial", warum: "Im Moment merken, dass gerade etwas kippt, und richtig reagieren – das ist Präsenz, die kein Tool ersetzt." },
    ],
  },

  // ─────────────────────────── Technik & Handwerk ───────────────────────────
  {
    slug: "industriemechaniker",
    title: "Industriemechaniker:in",
    shortDescription:
      "Baut, wartet und repariert Maschinen und Produktionsanlagen in der Industrie.",
    kategorie: "technik-handwerk",
    zukunftsausblick:
      "Routineprüfung und Programmierung werden zunehmend von Software und Automatisierung übernommen. Diagnose komplexer Störungen, Handarbeit an schwer zugänglichen Stellen und Improvisation bei ungeplanten Ausfällen bleiben menschlich. Der Beruf verschiebt sich Richtung Anlagenüberwachung und Instandhaltung.",
    tippsMenschlich: [
      "Störungen an realen Maschinen mit Erfahrung und Gespür diagnostizieren",
      "Handwerkliches Geschick bei Montage und Reparatur vor Ort",
      "Pragmatische Lösungen finden, wenn Pläne in der Praxis nicht passen",
    ],
    quellen: [
      { ...freyOsborne, wert: "Industrial Machinery Mechanics: 67 %, Machinists: 65 %" },
      { ...iabKurzbericht, wert: "Fertigungsberufe: höchstes Potenzial aller Segmente" },
      jobFuturomat,
    ],
    tasks: [
      { id: "im-1", title: "Bauteile nach technischer Zeichnung fertigen", description: "Werkstücke durch Fräsen, Drehen und Bohren herstellen.", kiEignung: 60, category: "analytisch", warum: "Fräsen und Drehen laufen längst über Programme und Maschinen. Einrichtung und Kontrolle bleiben beim Menschen." },
      { id: "im-2", title: "Maschinen warten und instand halten", description: "Verschleißteile prüfen, schmieren und austauschen.", kiEignung: 35, category: "physisch", warum: "Verschleißteile prüfen und tauschen heißt hinlangen, oft an schwer zugängliche Stellen. Da kommt kein Roboter hin." },
      { id: "im-3", title: "Störungen an Anlagen diagnostizieren", description: "Fehlerursachen an laufenden Produktionslinien eingrenzen.", kiEignung: 50, category: "analytisch", warum: "Software schlägt Fehlerquellen vor. Das Eingrenzen an der laufenden Anlage braucht Erfahrung vor Ort." },
      { id: "im-4", title: "Werkstücke von Hand entgraten und montieren", description: "Kanten säubern und Baugruppen millimetergenau zusammenbauen.", kiEignung: 30, category: "physisch", warum: "Kanten säubern und Teile millimetergenau zusammenfügen ist Handarbeit mit Gefühl." },
      { id: "im-5", title: "CNC-Programme einrichten", description: "Fertigungsprogramme laden, Werkzeuge einmessen, Nullpunkt setzen.", kiEignung: 70, category: "analytisch", warum: "Programm laden, Werkzeuge einmessen, Nullpunkt setzen – strukturierte Schritte, die Maschinen zunehmend selbst übernehmen." },
      { id: "im-6", title: "Qualität mit Messmitteln prüfen", description: "Maße mit Messschieber und Lehren gegen die Toleranz prüfen.", kiEignung: 70, category: "routine", warum: "Maße gegen Toleranzen abgleichen macht ein Messautomat schneller und genauer als jede Hand." },
      { id: "im-7", title: "Ersatzteile bestellen und Lager verwalten", description: "Bestände überwachen und Nachschub rechtzeitig auslösen.", kiEignung: 80, category: "routine", warum: "Bestände überwachen und rechtzeitig nachbestellen ist ein klassischer Fall für Software." },
      { id: "im-8", title: "Arbeitsschritte dokumentieren", description: "Wartungen und Reparaturen für die Nachvollziehbarkeit festhalten.", kiEignung: 75, category: "routine", warum: "Was gemacht wurde in Textform bringen – genau das können Sprachmodelle gut." },
      { id: "im-9", title: "Auszubildende anleiten", description: "Handgriffe zeigen, Fragen beantworten, Sicherheit vermitteln.", kiEignung: 15, category: "sozial", warum: "Einem Menschen einen Handgriff beibringen, inklusive „nicht so, sondern so“, macht ein Mensch." },
      { id: "im-10", title: "Prototypen mit der Konstruktion verbessern", description: "Aus der Fertigungspraxis Vorschläge für bessere Bauteile einbringen.", kiEignung: 35, category: "kreativ", warum: "Aus der Praxis heraus sagen, warum ein Bauteil nervt, ist Erfahrungswissen – KI kann nur ergänzen." },
    ],
  },
  {
    slug: "kfz-mechatroniker",
    title: "Kraftfahrzeugmechatroniker:in",
    shortDescription:
      "Wartet, diagnostiziert und repariert Fahrzeuge – von der Bremse bis zum Steuergerät.",
    kategorie: "technik-handwerk",
    zukunftsausblick:
      "Diagnosegeräte und Hersteller-Software geben immer mehr vor, wo der Fehler liegt. Die eigentliche Reparatur am Fahrzeug, das Prüfen widersprüchlicher Symptome und der Kundenkontakt bleiben. Mit E-Autos und Assistenzsystemen verschiebt sich der Beruf Richtung Elektronik und Software.",
    tippsMenschlich: [
      "Am realen Fahrzeug schrauben, dort wo kein Roboter hinkommt",
      "Aus mehreren Fehlerbildern die tatsächliche Ursache herausfiltern",
      "Kund:innen verständlich erklären, was gemacht werden muss und warum",
    ],
    quellen: [
      { ...freyOsborne, wert: "Automotive Service Technicians and Mechanics: 59 %" },
      jobFuturomat,
    ],
    tasks: [
      { id: "kfz-1", title: "Fahrzeuge nach Fehlerspeicher diagnostizieren", description: "Steuergeräte auslesen und Fehlercodes interpretieren.", kiEignung: 55, category: "analytisch", warum: "Der Fehlerspeicher liefert Codes, die Software deutet. Trotzdem musst du entscheiden, was davon wirklich stimmt." },
      { id: "kfz-2", title: "Verschleißteile wie Bremsen und Reifen wechseln", description: "Standardarbeiten fachgerecht und sicher ausführen.", kiEignung: 25, category: "physisch", warum: "Radwechsel und Bremsen sind Standard, aber eben Schrauben am Auto. Nichts davon am Bildschirm." },
      { id: "kfz-3", title: "Motor und Getriebe reparieren", description: "Komplexe mechanische Baugruppen zerlegen und instand setzen.", kiEignung: 20, category: "physisch", warum: "Eine Baugruppe zerlegen und wieder zum Laufen bringen ist Handwerk, oft mit Improvisieren." },
      { id: "kfz-4", title: "Software-Updates und Steuergeräte codieren", description: "Fahrzeugsoftware aktualisieren und neue Teile anlernen.", kiEignung: 70, category: "analytisch", warum: "Steuergeräte flashen und Teile anlernen ist selbst schon fast reine Software." },
      { id: "kfz-5", title: "Hauptuntersuchung vorbereiten", description: "Fahrzeug nach Prüfkatalog kontrollieren und Mängel beheben.", kiEignung: 55, category: "routine", warum: "Nach Prüfkatalog abhaken ist strukturiert. Das Beheben der Mängel danach nicht." },
      { id: "kfz-6", title: "Kund:innen Reparaturen erklären und beraten", description: "Notwendige Arbeiten und Alternativen nachvollziehbar darstellen.", kiEignung: 20, category: "sozial", warum: "Erklären, warum eine Reparatur 800 Euro kostet, und dabei Vertrauen aufbauen – das macht ein Mensch." },
      { id: "kfz-7", title: "Kostenvoranschläge erstellen", description: "Arbeitswerte und Teilepreise zu einem Angebot zusammenstellen.", kiEignung: 80, category: "routine", warum: "Arbeitswerte und Teilepreise zu einem Angebot zusammenrechnen ist Tabellenarbeit." },
      { id: "kfz-8", title: "Elektrik und Bordnetz prüfen", description: "Kabelbäume, Sensoren und Verbraucher systematisch durchmessen.", kiEignung: 50, category: "analytisch", warum: "Diagnosegeräte helfen beim Durchmessen. Das Suchen am echten Kabelbaum bleibt Handarbeit." },
    ],
  },
  {
    slug: "berufskraftfahrer",
    title: "Berufskraftfahrer:in",
    shortDescription:
      "Transportiert Güter im Straßenverkehr und ist für Ladung, Fahrzeug und Termine verantwortlich.",
    kategorie: "technik-handwerk",
    zukunftsausblick:
      "Frey & Osborne schätzten das Automatisierungsrisiko sehr hoch ein – autonome LKW kommen aber deutlich langsamer als erwartet. Routenplanung und Papierkram sind schon heute stark digitalisiert; Beladen, Ladungssicherung und Reagieren in kniffligen Verkehrslagen bleiben menschlich.",
    tippsMenschlich: [
      "In unübersichtlichen Verkehrs- und Baustellensituationen sicher entscheiden",
      "Ladung fachgerecht sichern und Verantwortung für die Fracht übernehmen",
      "Flexibel umplanen, wenn Rampe, Wetter oder Kunde nicht mitspielen",
    ],
    quellen: [
      { ...freyOsborne, wert: "Heavy and Tractor-Trailer Truck Drivers: 79 %" },
      { ...iabKurzbericht, wert: "Verkehrs-/Logistikberufe: überdurchschnittlich" },
      jobFuturomat,
    ],
    tasks: [
      { id: "bkf-1", title: "Güter auf festen Routen transportieren", description: "Planbare Strecken zwischen Depots und Kunden abfahren.", kiEignung: 45, category: "routine", warum: "Planbare Strecken sind das erklärte Ziel autonomer Systeme – im echten Straßenverkehr sitzt heute aber noch fast überall ein Mensch am Steuer." },
      { id: "bkf-2", title: "Lenk- und Ruhezeiten dokumentieren", description: "Fahrtenschreiber bedienen und gesetzliche Zeiten einhalten.", kiEignung: 80, category: "routine", warum: "Der Fahrtenschreiber erledigt das ohnehin fast von allein." },
      { id: "bkf-3", title: "Fahrzeug beladen und Ladung sichern", description: "Gewicht verteilen, zurren, gegen Verrutschen sichern.", kiEignung: 40, category: "physisch", warum: "Gewicht verteilen und zurren ist körperliche Arbeit mit Verantwortung – ob es hält oder eben nicht." },
      { id: "bkf-4", title: "Route bei Stau und Sperrung anpassen", description: "Kurzfristig umplanen und Kunden über Verzug informieren.", kiEignung: 55, category: "analytisch", warum: "Bei Stau umplanen können Navi und Software. Der Anruf beim Kunden kommt von dir." },
      { id: "bkf-5", title: "Abfahrtkontrolle am Fahrzeug durchführen", description: "Reifen, Licht, Bremsen und Flüssigkeiten vor Fahrtantritt prüfen.", kiEignung: 45, category: "routine", warum: "Reifen, Licht, Bremsen checken ist Routine, aber am Fahrzeug, nicht am Schreibtisch." },
      { id: "bkf-6", title: "Lieferpapiere und Zollformalitäten abwickeln", description: "Frachtbriefe, Zoll- und Ablieferbelege bearbeiten.", kiEignung: 78, category: "routine", warum: "Frachtbriefe und Zollbelege sind Formulararbeit auf digitalen Daten." },
      { id: "bkf-7", title: "Ware beim Kunden übergeben", description: "Abladen, Abnahme klären, Reklamationen vor Ort aufnehmen.", kiEignung: 25, category: "sozial", warum: "Abladen, Abnahme klären, eine Reklamation vor Ort aufnehmen – da steht ein Mensch am anderen Ende." },
      { id: "bkf-8", title: "In schwierigen Verkehrssituationen sicher reagieren", description: "Enge Zufahrten, Baustellen und plötzliche Gefahren meistern.", kiEignung: 30, category: "analytisch", warum: "Enge Baustelle, plötzliche Gefahr – hier entscheidet der Mensch am Steuer noch immer schneller und sicherer." },
    ],
  },
  {
    slug: "elektroniker-energie-gebaeudetechnik",
    title: "Elektroniker:in für Energie- und Gebäudetechnik",
    shortDescription:
      "Installiert und wartet elektrische Anlagen in Gebäuden – von der Verkabelung bis zur Photovoltaikanlage.",
    kategorie: "technik-handwerk",
    zukunftsausblick:
      "Verkabeln, Klemmen und Prüfen vor Ort bleibt körperliche Arbeit, die kein Roboter im engen Altbau oder auf dem Dach übernimmt. Planungssoftware und automatische Fehlerdiagnose entlasten zunehmend – der Umgang mit Smart-Home- und PV-Technik wird wichtiger, die Handarbeit an der Anlage bleibt.",
    tippsMenschlich: [
      "Handwerkliches Geschick bei Verkabelung und Montage unter beengten Bedingungen",
      "Verantwortung für Sicherheit – ein Fehler kann Brände oder Stromschläge verursachen",
      "Beratung von Kund:innen zu Smart Home, PV und Fördermöglichkeiten",
    ],
    quellen: [
      { ...freyOsborne, wert: "Electricians: 15 %" },
      { ...iabKurzbericht, wert: "Elektroberufe: leicht überdurchschnittlich" },
      jobFuturomat,
    ],
    tasks: [
      { id: "eg-1", title: "Elektroinstallationen verlegen", description: "Kabel, Leitungen und Verteiler in Neubau oder Bestand einbauen.", kiEignung: 15, category: "physisch", warum: "Kabel durch Wände und Decken ziehen ist Handarbeit an einem konkreten Gebäude – nichts davon läuft am Bildschirm." },
      { id: "eg-2", title: "Schaltpläne lesen und umsetzen", description: "Technische Zeichnungen in reale Verkabelung übersetzen.", kiEignung: 45, category: "analytisch", warum: "Software kann Pläne generieren. Sie vor Ort korrekt umzusetzen, mit allen Abweichungen im echten Gebäude, bleibt Handwerk." },
      { id: "eg-3", title: "Fehler in der Elektrik diagnostizieren", description: "Störungen mit Messgeräten eingrenzen und beheben.", kiEignung: 40, category: "analytisch", warum: "Diagnosegeräte schlagen Ursachen vor. Das Nachprüfen im echten Sicherungskasten bleibt beim Menschen." },
      { id: "eg-4", title: "Photovoltaikanlagen installieren", description: "Module montieren, verkabeln und ans Netz anschließen.", kiEignung: 15, category: "physisch", warum: "Module aufs Dach montieren und sicher verkabeln ist körperliche Arbeit in der Höhe – da hilft keine Software." },
      { id: "eg-5", title: "Smart-Home-Systeme einrichten", description: "Steuerungen für Licht, Heizung und Sicherheit programmieren.", kiEignung: 55, category: "analytisch", warum: "Standard-Konfigurationen kann Software zunehmend selbst vorschlagen. Die Einrichtung im echten Haus bleibt Handarbeit." },
      { id: "eg-6", title: "Anlagen auf Sicherheit prüfen (VDE-Prüfung)", description: "Vorgeschriebene Prüfungen durchführen und protokollieren.", kiEignung: 45, category: "routine", warum: "Prüfgeräte liefern die Werte automatisch. Die Freigabe unterschreibt gesetzlich trotzdem die Elektrofachkraft – mit persönlicher Haftung." },
      { id: "eg-7", title: "Kund:innen zu Energielösungen beraten", description: "Fördermöglichkeiten und passende Technik erklären.", kiEignung: 30, category: "sozial", warum: "Fördertöpfe kann ein Chatbot auflisten. Welche Lösung zu diesem Haus und Budget passt, wägt ein Mensch ab." },
      { id: "eg-8", title: "Wartungsprotokolle dokumentieren", description: "Durchgeführte Arbeiten und Messwerte digital festhalten.", kiEignung: 75, category: "routine", warum: "Messwerte und Stichpunkte in ein Protokoll bringen ist strukturierte Textarbeit – ein Fall für Software." },
    ],
  },

  // ─────────────────────────── Büro & Verwaltung ───────────────────────────
  {
    slug: "steuerfachangestellte",
    title: "Steuerfachangestellte:r",
    shortDescription:
      "Erstellt Buchführung und Steuererklärungen und betreut Mandant:innen einer Steuerkanzlei.",
    kategorie: "buero-verwaltung",
    zukunftsausblick:
      "Buchung, Belegerfassung und Standard-Steuererklärungen sind stark automatisierbar und werden es zunehmend. Was bleibt, ist die Beratung in unklaren Fällen, das Einordnen individueller Lebens- und Geschäftslagen und das Vertrauensverhältnis zu Mandant:innen. Der Beruf verschiebt sich von Erfassung zu Beratung.",
    tippsMenschlich: [
      "Mandant:innen ihre steuerliche Lage verständlich erklären",
      "Gestaltungsspielräume für individuelle Situationen abwägen",
      "Verantwortung übernehmen und mit dem Finanzamt verhandeln",
    ],
    quellen: [
      { ...freyOsborne, wert: "Tax Preparers: 99 %, Bookkeeping Clerks: 98 %, Accountants: 94 %" },
      { ...ilo, wert: "Büro-/Sachbearbeitungsberufe: höchste GenAI-Exposition" },
      jobFuturomat,
    ],
    tasks: [
      { id: "st-1", title: "Steuererklärungen vorbereiten", description: "Angaben zusammenstellen und Formulare vorausfüllen.", kiEignung: 88, category: "analytisch", warum: "Belege und Angaben in die Formulare bringen ist strukturierte Arbeit auf digitalen Daten – ein Heimspiel für Software." },
      { id: "st-2", title: "Buchungen erfassen", description: "Belege kontieren und in der Finanzbuchhaltung verbuchen.", kiEignung: 92, category: "routine", warum: "Belege kontieren und verbuchen läuft nach festen Regeln und wird schon heute weitgehend automatisch erledigt." },
      { id: "st-3", title: "Mandantengespräche führen", description: "Rückfragen klären und Ergebnisse persönlich besprechen.", kiEignung: 30, category: "sozial", warum: "Rückfragen klären und ein Ergebnis persönlich erklären ist Vertrauensarbeit." },
      { id: "st-4", title: "Steuerbescheide prüfen", description: "Bescheide des Finanzamts mit den eigenen Berechnungen abgleichen.", kiEignung: 82, category: "analytisch", warum: "Bescheid gegen eigene Berechnung abgleichen ist ein Soll-Ist-Vergleich – genau das, was Software zuverlässig macht." },
      { id: "st-5", title: "Gesetzesänderungen recherchieren", description: "Neue Regelungen und Urteile auf Relevanz für Mandate prüfen.", kiEignung: 85, category: "analytisch", warum: "Neue Regeln finden und auf Relevanz prüfen geht mit KI deutlich schneller als per Handbuch." },
      { id: "st-6", title: "Individuelle Steuerstrategien entwickeln", description: "Gestaltungsmöglichkeiten für konkrete Lebenslagen abwägen.", kiEignung: 35, category: "kreativ", warum: "Für eine konkrete Lebenslage den besten Weg abwägen ist Beratung mit Verantwortung. KI liefert nur Bausteine." },
      { id: "st-7", title: "Betriebsprüfungen vorbereiten", description: "Unterlagen sortieren und mögliche Streitpunkte antizipieren.", kiEignung: 78, category: "analytisch", warum: "Das Sortieren der Unterlagen kann Software. Das Ahnen der Streitpunkte kommt aus Erfahrung." },
      { id: "st-8", title: "Mandant:innen beraten", description: "Bei Entscheidungen zu Rechtsform, Investitionen und Fristen unterstützen.", kiEignung: 25, category: "sozial", warum: "Bei Rechtsform oder Investition raten heißt, den Menschen und sein Risiko einzuschätzen. Das bleibt beim Menschen." },
      { id: "st-9", title: "Umsatzsteuer-Voranmeldung erstellen", description: "Monatliche Meldungen berechnen und fristgerecht übermitteln.", kiEignung: 92, category: "routine", warum: "Monatliche Meldung berechnen und übermitteln ist reine Routine nach festem Schema." },
      { id: "st-10", title: "Lohnabrechnungen durchführen", description: "Gehälter, Abzüge und Sozialabgaben monatlich abrechnen.", kiEignung: 90, category: "routine", warum: "Gehälter, Abzüge und Sozialabgaben nach Tabellen abrechnen – dafür gibt es längst Programme." },
    ],
  },
  {
    slug: "kaufmann-bueromanagement",
    title: "Kaufmann/-frau für Büromanagement",
    shortDescription:
      "Hält den Bürobetrieb am Laufen: Korrespondenz, Termine, Rechnungen, Organisation.",
    kategorie: "buero-verwaltung",
    zukunftsausblick:
      "Sachbearbeitung, Terminlogistik und Textarbeit gehören zu den am stärksten von generativer KI betroffenen Tätigkeiten überhaupt. Persönliche Betreuung, das Priorisieren zwischen widersprüchlichen Anfragen und das Zusammenhalten eines Teams bleiben. Der Beruf wandelt sich Richtung Koordination und Assistenz.",
    tippsMenschlich: [
      "Zwischen vielen gleichzeitigen Anfragen sinnvoll priorisieren",
      "Kolleg:innen, Kund:innen und Chef:innen persönlich zusammenbringen",
      "Verstehen, was gemeint ist – nicht nur, was geschrieben steht",
    ],
    quellen: [
      { ...freyOsborne, wert: "Office Clerks, General: 96 %, Secretaries: 96 %" },
      { ...ilo, wert: "Clerical support workers: höchste Exposition aller Gruppen" },
      jobFuturomat,
    ],
    tasks: [
      { id: "bm-1", title: "E-Mails und Post bearbeiten", description: "Eingang sichten, zuordnen, beantworten oder weiterleiten.", kiEignung: 82, category: "routine", warum: "Eingang sichten, zuordnen, Standardantworten schreiben – genau das können Assistenzsysteme heute." },
      { id: "bm-2", title: "Termine und Besprechungen organisieren", description: "Kalender abstimmen, Räume buchen, Unterlagen bereitstellen.", kiEignung: 75, category: "routine", warum: "Kalender abstimmen und Räume buchen ist Regelarbeit, die Software fast allein schafft." },
      { id: "bm-3", title: "Rechnungen erstellen und prüfen", description: "Ausgangsrechnungen schreiben, Eingangsrechnungen kontieren.", kiEignung: 88, category: "routine", warum: "Rechnungen schreiben und Eingänge kontieren läuft nach festem Muster." },
      { id: "bm-4", title: "Präsentationen und Serienbriefe erstellen", description: "Aus Stichpunkten fertige Dokumente und Folien bauen.", kiEignung: 80, category: "analytisch", warum: "Aus Stichpunkten fertige Folien und Briefe bauen ist eine Paradedisziplin von Sprachmodellen." },
      { id: "bm-5", title: "Reisen buchen und abrechnen", description: "Verbindungen und Hotels organisieren, Reisekosten abrechnen.", kiEignung: 85, category: "routine", warum: "Verbindung suchen, Hotel buchen, Reisekosten abrechnen – strukturiert und digital von Anfang bis Ende." },
      { id: "bm-6", title: "Telefonate annehmen und weiterleiten", description: "Anliegen erfassen und an die richtige Stelle vermitteln.", kiEignung: 55, category: "sozial", warum: "Ein Anliegen aufnehmen und weiterleiten schaffen Sprachbots zunehmend. Bei allem Untypischen übernimmt ein Mensch." },
      { id: "bm-7", title: "Kolleg:innen und Kund:innen persönlich betreuen", description: "Am Empfang und im Alltag ansprechbar sein und helfen.", kiEignung: 25, category: "sozial", warum: "Am Empfang ansprechbar sein und im Alltag helfen ist Präsenz, die kein Bot ersetzt." },
      { id: "bm-8", title: "Daten in Tabellen auswerten", description: "Listen pflegen, Kennzahlen zusammenstellen, Berichte vorbereiten.", kiEignung: 78, category: "analytisch", warum: "Listen pflegen und Kennzahlen zusammenstellen ist Tabellenarbeit." },
    ],
  },
  {
    slug: "bankkaufmann",
    title: "Bankkaufmann/-frau",
    shortDescription:
      "Betreut Kund:innen in Geldangelegenheiten: Konten, Zahlungsverkehr, Kredite, Anlage.",
    kategorie: "buero-verwaltung",
    zukunftsausblick:
      "Zahlungsverkehr, Kontoführung und Standardkredite laufen weitgehend automatisch, Filialen und Schaltergeschäft gehen zurück. Was bleibt, ist die Beratung bei größeren Entscheidungen, das Einschätzen von Menschen und Situationen und der Umgang mit Beschwerden. Der Beruf verschiebt sich klar Richtung Beratung.",
    tippsMenschlich: [
      "Vertrauen aufbauen, wenn es um das Geld anderer Menschen geht",
      "Bei Anlage und Finanzierung die Lebenssituation wirklich verstehen",
      "In Beschwerde- und Konfliktgesprächen souverän bleiben",
    ],
    quellen: [
      { ...freyOsborne, wert: "Tellers: 98 %, Loan Officers: 98 %, Personal Financial Advisors: 58 %" },
      jobFuturomat,
    ],
    tasks: [
      { id: "bk-1", title: "Überweisungen und Daueraufträge bearbeiten", description: "Zahlungsaufträge erfassen, prüfen und ausführen.", kiEignung: 90, category: "routine", warum: "Zahlungsaufträge erfassen und ausführen ist vollständig digitalisierbar und großteils schon automatisch." },
      { id: "bk-2", title: "Konten eröffnen und verwalten", description: "Neukunden anlegen, Stammdaten und Vollmachten pflegen.", kiEignung: 82, category: "routine", warum: "Neukunden anlegen und Stammdaten pflegen ist Formulararbeit." },
      { id: "bk-3", title: "Standardkredite prüfen und bewilligen", description: "Ratenkredite anhand von Score und Regeln entscheiden.", kiEignung: 75, category: "analytisch", warum: "Ratenkredite nach Score und Regeln entscheiden macht Software schneller und gleichmäßiger." },
      { id: "bk-4", title: "Kund:innen zu Geldanlage beraten", description: "Anlageziele klären und passende Produkte empfehlen.", kiEignung: 30, category: "sozial", warum: "Anlageziele klären heißt, den Menschen und seine Ängste zu verstehen – das bleibt Beratung von Mensch zu Mensch." },
      { id: "bk-5", title: "Bonität und Risiken bewerten", description: "Unterlagen sichten und die Rückzahlungsfähigkeit einschätzen.", kiEignung: 65, category: "analytisch", warum: "Kennzahlen prüfen kann Software. Das Gesamtbild einer Person einzuschätzen nur teilweise." },
      { id: "bk-6", title: "Beschwerden persönlich klären", description: "Verärgerte Kund:innen anhören und Lösungen aushandeln.", kiEignung: 25, category: "sozial", warum: "Verärgerte Kund:innen anhören und eine Lösung aushandeln ist Beziehungsarbeit." },
      { id: "bk-7", title: "Bargeld am Schalter aus- und einzahlen", description: "Kassengeschäfte abwickeln und Kasse führen.", kiEignung: 70, category: "routine", warum: "Ein- und Auszahlen übernehmen Automaten längst. Der Schalter wird seltener." },
      { id: "bk-8", title: "Vertragsunterlagen erstellen", description: "Konto-, Kredit- und Depotverträge aufsetzen und erläutern.", kiEignung: 85, category: "routine", warum: "Verträge aus Bausteinen aufsetzen ist Textarbeit nach Vorlage." },
    ],
  },
  {
    slug: "personaldienstleistungskaufmann",
    title: "Personaldienstleistungskaufmann/-frau",
    shortDescription:
      "Vermittelt zwischen Unternehmen und Bewerber:innen – von der Stellenausschreibung bis zum Vertragsabschluss.",
    kategorie: "buero-verwaltung",
    zukunftsausblick:
      "KI-Systeme sichten heute schon einen Großteil eingehender Bewerbungen vor – das spart Zeit, birgt aber ein bekanntes Risiko: Wenn die Trainingsdaten verzerrt sind, sortiert das System systematisch bestimmte Gruppen aus, oft unbemerkt. Genau deshalb bleibt eine Person nötig, die Vorauswahlen gegenprüft und im Gespräch entscheidet, wen sie wirklich vorschlägt.",
    tippsMenschlich: [
      "Automatisierte Vorauswahlen kritisch gegenprüfen, statt sie blind zu übernehmen",
      "Im persönlichen Gespräch einschätzen, ob jemand ins Team passt",
      "Verhandeln zwischen den Interessen von Unternehmen und Bewerber:innen",
    ],
    quellen: [
      { ...freyOsborne, wert: "HR Assistants: 73 %" },
      { ...iabKurzbericht, wert: "Kaufmännische Verwaltungsberufe: überdurchschnittlich" },
      ilo,
    ],
    tasks: [
      { id: "pdk-1", title: "Stellenanzeigen formulieren", description: "Anforderungsprofile in ansprechende Ausschreibungen übersetzen.", kiEignung: 80, category: "routine", warum: "Aus Stichpunkten eine Anzeige formulieren ist Textarbeit, die Sprachmodelle heute zuverlässig übernehmen." },
      { id: "pdk-2", title: "Bewerbungen vorsortieren", description: "Eingehende Unterlagen nach Kriterien filtern und einordnen.", kiEignung: 75, category: "analytisch", warum: "Software filtert Hunderte Unterlagen in Sekunden nach Kriterien – nur läuft dabei bekanntermaßen Bias mit, den jemand gegenprüfen muss." },
      { id: "pdk-3", title: "Vorstellungsgespräche führen", description: "Bewerber:innen persönlich kennenlernen und einschätzen.", kiEignung: 15, category: "sozial", warum: "Ob jemand ins Team passt, entscheidet sich im Gespräch – ein Zwischenmenschliches, das kein Score ersetzt." },
      { id: "pdk-4", title: "Zeugnisse und Referenzen prüfen", description: "Angaben auf Plausibilität und Echtheit kontrollieren.", kiEignung: 60, category: "analytisch", warum: "Formale Prüfung auf Vollständigkeit und Plausibilität kann Software gut vorfiltern." },
      { id: "pdk-5", title: "Gehalt und Vertragskonditionen verhandeln", description: "Zwischen den Interessen von Unternehmen und Bewerber:in vermitteln.", kiEignung: 20, category: "sozial", warum: "Verhandeln heißt, Interessen beider Seiten abzuwägen und im Moment auf Reaktionen einzugehen." },
      { id: "pdk-6", title: "Vertragsunterlagen erstellen", description: "Arbeitsverträge nach Vorlage aufsetzen und anpassen.", kiEignung: 85, category: "routine", warum: "Verträge aus Textbausteinen zusammensetzen ist strukturierte Arbeit nach festen Regeln." },
      { id: "pdk-7", title: "Bewerber:innen zu Absagen und Feedback beraten", description: "Entscheidungen nachvollziehbar und wertschätzend kommunizieren.", kiEignung: 30, category: "sozial", warum: "Eine Absage so zu formulieren, dass sie fair ankommt, ist Fingerspitzengefühl, kein Textbaustein." },
      { id: "pdk-8", title: "Personalstatistiken auswerten", description: "Fluktuation, Bewerbungszahlen und Trends analysieren.", kiEignung: 75, category: "analytisch", warum: "Zahlen aus dem System ziehen und Trends erkennen ist klassische Datenauswertung." },
    ],
  },

  // ─────────────────────────── IT & Medien ───────────────────────────
  {
    slug: "softwareentwickler",
    title: "Softwareentwickler:in",
    shortDescription:
      "Entwirft, schreibt und wartet Software – von der Idee über den Code bis zum laufenden Betrieb.",
    kategorie: "it-medien",
    zukunftsausblick:
      "Frey & Osborne stuften den Beruf 2013 als kaum gefährdet ein – generative KI hat das verändert und schreibt heute große Teile des Routinecodes, erzeugt Tests und erklärt fremden Code. Architektur, das Klären unscharfer Anforderungen, Abwägen von Trade-offs und Verantwortung für Sicherheit bleiben menschlich. Der Beruf verschiebt sich vom Tippen zum Entscheiden und Prüfen.",
    tippsMenschlich: [
      "Unklare Wünsche in tragfähige Anforderungen übersetzen",
      "Architektur- und Trade-off-Entscheidungen verantworten",
      "Im Team Lösungswege aushandeln und Code kritisch prüfen",
    ],
    quellen: [
      { ...freyOsborne, wert: "Software Developers, Applications: 4 % (Schätzung von 2013, vor generativer KI)" },
      { ...ilo, wert: "Professionals: mittlere Aufgaben-Exposition" },
      jobFuturomat,
    ],
    tasks: [
      { id: "sw-1", title: "Wiederkehrenden Code schreiben", description: "Standard-Bausteine (Boilerplate) für neue Features anlegen.", kiEignung: 85, category: "routine", warum: "Standard-Bausteine tippen ist das Erste, was KI wirklich besser und schneller kann als ein Mensch." },
      { id: "sw-2", title: "Automatisierte Tests erstellen", description: "Unit- und Integrationstests für bestehende Funktionen schreiben.", kiEignung: 70, category: "analytisch", warum: "Tests für bestehende Funktionen sind ein dankbares Feld für Codegeneratoren." },
      { id: "sw-3", title: "Bugs in bestehendem Code finden", description: "Fehlermeldungen nachvollziehen und Ursachen eingrenzen.", kiEignung: 55, category: "analytisch", warum: "KI schlägt Ursachen vor. Das Nachvollziehen im echten System bleibt oft Kopfarbeit." },
      { id: "sw-4", title: "Software-Architektur entwerfen", description: "Module, Schnittstellen und Datenflüsse eines Systems festlegen.", kiEignung: 35, category: "kreativ", warum: "Module und Datenflüsse festlegen heißt abwägen und verantworten – das bleibt beim Menschen." },
      { id: "sw-5", title: "Anforderungen mit Kundschaft klären", description: "Wünsche hinterfragen und in umsetzbare Aufgaben übersetzen.", kiEignung: 20, category: "sozial", warum: "Herausfinden, was jemand wirklich will statt was er sagt, ist ein Gespräch – kein Prompt." },
      { id: "sw-6", title: "Code im Team reviewen", description: "Änderungen von Kolleg:innen auf Qualität und Risiken prüfen.", kiEignung: 45, category: "analytisch", warum: "KI findet Muster. Ob eine Änderung fürs Team tragbar ist, entscheidet ein Mensch." },
      { id: "sw-7", title: "Dokumentation schreiben", description: "Funktionen, Setup und Entscheidungen nachvollziehbar festhalten.", kiEignung: 75, category: "routine", warum: "Funktionen und Setup in Worte fassen – eine der nervigen Aufgaben, die KI gut abnimmt." },
      { id: "sw-8", title: "Bibliotheken und Frameworks auswählen", description: "Werkzeuge nach Reife, Wartung und Passung bewerten.", kiEignung: 50, category: "analytisch", warum: "Werkzeuge nach Reife und Wartung bewerten geht mit KI-Recherche. Die Entscheidung trägst du." },
      { id: "sw-9", title: "Legacy-System verstehen und umbauen", description: "Alten, schlecht dokumentierten Code sicher weiterentwickeln.", kiEignung: 40, category: "analytisch", warum: "Alten, undokumentierten Code sicher ändern ist Detektivarbeit, bei der KI nur assistiert." },
      { id: "sw-10", title: "Im Team über Lösungswege diskutieren", description: "Ansätze vergleichen und sich auf einen Weg einigen.", kiEignung: 25, category: "sozial", warum: "Im Team Ansätze vergleichen und sich einigen ist Aushandeln zwischen Menschen." },
    ],
  },
  {
    slug: "fachinformatiker-systemintegration",
    title: "Fachinformatiker:in Systemintegration",
    shortDescription:
      "Plant, richtet ein und betreibt IT-Systeme, Netzwerke und Server – und hilft, wenn es klemmt.",
    kategorie: "it-medien",
    zukunftsausblick:
      "Standard-Setups, Monitoring und Skripte übernehmen viel Routine, Cloud-Dienste reduzieren eigene Serverarbeit. Vor-Ort-Support an Hardware, das Zusammendenken vieler Systeme und der geduldige Umgang mit ratlosen Nutzer:innen bleiben. Der Beruf verschiebt sich Richtung Cloud, Automatisierung und Sicherheit.",
    tippsMenschlich: [
      "Nutzer:innen ohne IT-Wissen ruhig und ohne Fachjargon helfen",
      "Bei Ausfällen unter Zeitdruck den Überblick über viele Systeme behalten",
      "Vor Ort an Geräten und Verkabelung anpacken",
    ],
    quellen: [
      { ...freyOsborne, wert: "Computer Support Specialists: 65 %, Network/Systems Administrators: 3 %" },
      jobFuturomat,
    ],
    tasks: [
      { id: "fi-1", title: "Standard-Software installieren und konfigurieren", description: "Arbeitsplätze und Server nach Vorgabe einrichten.", kiEignung: 65, category: "routine", warum: "Standard-Setups nach Vorgabe lassen sich per Skript und zunehmend per KI ausrollen." },
      { id: "fi-2", title: "Nutzeranfragen im 1st-Level-Support lösen", description: "Tickets aufnehmen, einordnen und häufige Probleme beheben.", kiEignung: 55, category: "analytisch", warum: "Häufige Probleme erkennt und löst ein Assistent oft selbst. Der Rest landet beim Menschen." },
      { id: "fi-3", title: "Server und Netzwerke überwachen", description: "Auslastung und Störungen im Monitoring im Blick behalten.", kiEignung: 50, category: "analytisch", warum: "Monitoring meldet Auffälligkeiten automatisch. Das Deuten und Reagieren bleibt teils bei dir." },
      { id: "fi-4", title: "Backups einrichten und Wiederherstellung testen", description: "Sicherungen automatisieren und regelmäßig prüfen.", kiEignung: 55, category: "routine", warum: "Sicherungen automatisieren ist Routine. Der ernste Wiederherstellungsfall braucht einen kühlen Kopf." },
      { id: "fi-5", title: "Störungen vor Ort an Hardware beheben", description: "Defekte Geräte, Kabel und Peripherie austauschen.", kiEignung: 20, category: "physisch", warum: "Ein defektes Gerät tauschen und Kabel ziehen passiert im Serverraum, nicht am Bildschirm." },
      { id: "fi-6", title: "IT-Sicherheitsvorfälle analysieren", description: "Verdächtige Ereignisse untersuchen und Gegenmaßnahmen einleiten.", kiEignung: 35, category: "analytisch", warum: "KI hilft beim Sichten der Logs. Die Bewertung und die Reaktion trägt ein Mensch." },
      { id: "fi-7", title: "Systeme dokumentieren", description: "Netzpläne, Konfigurationen und Abläufe schriftlich festhalten.", kiEignung: 70, category: "routine", warum: "Netzpläne und Konfigurationen aufschreiben – genau das, was Sprachmodelle gut können." },
      { id: "fi-8", title: "Anwender:innen schulen", description: "Neue Tools und Sicherheitsregeln verständlich erklären.", kiEignung: 20, category: "sozial", warum: "Menschen ohne IT-Wissen etwas geduldig erklären ist ein Gespräch." },
    ],
  },
  {
    slug: "grafikdesigner",
    title: "Grafikdesigner:in",
    shortDescription:
      "Gestaltet visuelle Kommunikation – Logos, Layouts, Anzeigen, Social-Media- und Printmedien.",
    kategorie: "it-medien",
    zukunftsausblick:
      "Frey & Osborne sahen hier fast kein Risiko – Bildgeneratoren haben das Bild stark verändert und liefern in Sekunden Varianten, Freisteller und Reinzeichnungen. Konzept, Markenverständnis, Kundenführung und der geschmackssichere letzte Schliff bleiben. Der Beruf verschiebt sich vom Ausführen zum Kuratieren und Konzipieren.",
    tippsMenschlich: [
      "Aus einem vagen Briefing die eigentliche Gestaltungsaufgabe herausarbeiten",
      "Eine Marke über viele Medien hinweg konsistent halten",
      "Entscheiden, welcher von hundert KI-Entwürfen wirklich trägt",
    ],
    quellen: [
      { ...freyOsborne, wert: "Graphic Designers: 8 % (Schätzung von 2013, vor Bildgeneratoren)" },
      { ...ilo, wert: "Kreativ-/Medienberufe: durch generative KI neu betroffen" },
      jobFuturomat,
    ],
    tasks: [
      { id: "gd-1", title: "Bildvarianten und Moodboards erzeugen", description: "Schnell viele visuelle Richtungen zur Auswahl erstellen.", kiEignung: 70, category: "kreativ", warum: "In Sekunden viele Richtungen erzeugen ist genau das, wofür Bildgeneratoren gebaut sind." },
      { id: "gd-2", title: "Layouts für Print und Web umsetzen", description: "Inhalte in Raster, Typografie und Format bringen.", kiEignung: 55, category: "analytisch", warum: "Inhalte in Raster und Format bringen geht zunehmend automatisch. Der Feinschliff nicht." },
      { id: "gd-3", title: "Logos und Corporate Design entwickeln", description: "Eine tragfähige visuelle Identität für eine Marke erarbeiten.", kiEignung: 35, category: "kreativ", warum: "Eine tragfähige Markenidentität erarbeiten heißt verstehen, wofür eine Firma steht – das bleibt beim Menschen." },
      { id: "gd-4", title: "Fotos freistellen und retuschieren", description: "Bilder ausschneiden, Farben und Makel korrigieren.", kiEignung: 80, category: "routine", warum: "Ausschneiden und Korrigieren macht KI heute mit einem Klick." },
      { id: "gd-5", title: "Mit Kund:innen Briefings klären", description: "Ziele, Zielgruppe und Geschmack im Gespräch herausarbeiten.", kiEignung: 15, category: "sozial", warum: "Ziel, Zielgruppe und Geschmack im Gespräch herausarbeiten ist Menschenarbeit." },
      { id: "gd-6", title: "Konzept und Gestaltungsidee entwickeln", description: "Die inhaltliche Leitidee hinter der Gestaltung festlegen.", kiEignung: 25, category: "kreativ", warum: "Die Leitidee hinter der Gestaltung festlegen ist der kreative Kern. KI liefert nur Material." },
      { id: "gd-7", title: "Reinzeichnung und Druckdaten vorbereiten", description: "Farbräume, Beschnitt und Formate druckfertig machen.", kiEignung: 65, category: "routine", warum: "Farbräume, Beschnitt und Formate druckfertig machen ist regelbasiert." },
      { id: "gd-8", title: "Illustrationen anfertigen", description: "Eigene Bildmotive passend zum Projekt zeichnen.", kiEignung: 55, category: "kreativ", warum: "KI zeichnet Motive auf Zuruf. Ob es zur Marke passt, entscheidet der Mensch." },
    ],
  },

  // ─────────────────────────── Handel & Dienstleistung ───────────────────────────
  {
    slug: "einzelhandelskaufmann",
    title: "Kaufmann/-frau im Einzelhandel",
    shortDescription:
      "Verkauft Waren, berät Kund:innen und organisiert Sortiment, Lager und Kasse im Handel.",
    kategorie: "handel-dienstleistung",
    zukunftsausblick:
      "Kasse, Bestellwesen und Auswertungen werden weitgehend automatisiert, Selbstbedienungskassen breiten sich aus. Persönliche Beratung, das Lösen von Konflikten an der Ladentheke und das Gestalten eines einladenden Ladens bleiben menschlich. Der stationäre Handel setzt verstärkt auf Erlebnis und Servicequalität.",
    tippsMenschlich: [
      "Kund:innen echt beraten und auf ihre Situation eingehen",
      "Reklamationen und schwierige Gespräche freundlich lösen",
      "Ein Gespür dafür haben, was sich im Laden gut präsentiert",
    ],
    quellen: [
      { ...freyOsborne, wert: "Retail Salespersons: 92 %, Cashiers: 97 %" },
      { ...iabKurzbericht, wert: "Kassierer:innen: 100 % Substituierbarkeit" },
      jobFuturomat,
    ],
    tasks: [
      { id: "eh-1", title: "Waren einräumen und Regale auffüllen", description: "Lieferungen auspacken, einsortieren und Präsentation pflegen.", kiEignung: 35, category: "physisch", warum: "Bestände planen kann Software gut. Das Auspacken und Einräumen im Regal ist bis heute fast überall Handarbeit." },
      { id: "eh-2", title: "Kund:innen persönlich beraten", description: "Bedürfnisse erfragen und passende Produkte empfehlen.", kiEignung: 20, category: "sozial", warum: "Auf die Situation eines Menschen eingehen und wirklich beraten kann kein Automat." },
      { id: "eh-3", title: "Kasse bedienen und abrechnen", description: "Zahlungen abwickeln und den Kassenbestand abschließen.", kiEignung: 90, category: "routine", warum: "Kassieren übernehmen Selbstbedienungskassen längst." },
      { id: "eh-4", title: "Warenbestand kontrollieren und nachbestellen", description: "Lücken im Sortiment erkennen und Nachschub ordern.", kiEignung: 85, category: "routine", warum: "Lücken erkennen und nachordern ist ein klassischer Fall für Software." },
      { id: "eh-5", title: "Reklamationen bearbeiten", description: "Beschwerden aufnehmen und kulante Lösungen finden.", kiEignung: 35, category: "sozial", warum: "Eine Beschwerde aufnehmen und kulant lösen ist Beziehungsarbeit." },
      { id: "eh-6", title: "Werbeaktionen und Schaufenster gestalten", description: "Aktionsflächen und Auslagen ansprechend aufbauen.", kiEignung: 45, category: "kreativ", warum: "Ideen liefert KI. Das Gespür fürs Aufbauen im echten Raum kommt vom Menschen." },
      { id: "eh-7", title: "Verkaufszahlen auswerten", description: "Umsätze und Renner-Penner-Listen analysieren.", kiEignung: 80, category: "analytisch", warum: "Umsätze und Renner-Penner-Listen analysieren ist Tabellenarbeit." },
      { id: "eh-8", title: "Preise auszeichnen", description: "Etiketten erstellen und Preisänderungen im Regal umsetzen.", kiEignung: 88, category: "routine", warum: "Etiketten erzeugen und Preise pflegen ist reine Routine, oft schon per elektronischem Preisschild." },
      { id: "eh-9", title: "Diebstahl vorbeugen", description: "Im Laden aufmerksam bleiben und Auffälligkeiten bemerken.", kiEignung: 35, category: "physisch", warum: "Im Laden aufmerksam sein und Auffälliges bemerken ist Präsenz vor Ort." },
      { id: "eh-10", title: "Team für die Schicht einteilen", description: "Personal nach Stoßzeiten und Aufgaben planen.", kiEignung: 60, category: "analytisch", warum: "Personal nach Stoßzeiten planen kann Software vorschlagen. Die Rücksicht aufs Team kommt von dir." },
    ],
  },
  {
    slug: "friseur",
    title: "Friseur:in",
    shortDescription:
      "Schneidet, färbt und stylt Haare und berät Kund:innen rund um Frisur und Pflege.",
    kategorie: "handel-dienstleistung",
    zukunftsausblick:
      "Die eigentliche Arbeit ist Handwerk am Menschen – Schneiden, Färben, Föhnen lassen sich nicht automatisieren. Nur die Organisation (Termine, Kasse, Warenwirtschaft) ist digitalisierbar. Persönlicher Kontakt und Vertrauen machen den Beruf krisenfest.",
    tippsMenschlich: [
      "Mit ruhiger Hand am Kopf der Kund:innen arbeiten",
      "Aus Wünschen und Haartyp eine machbare Frisur ableiten",
      "Durch Gespräch und Atmosphäre Stammkundschaft binden",
    ],
    quellen: [
      { ...freyOsborne, wert: "Hairdressers, Hairstylists, and Cosmetologists: 11 %" },
      jobFuturomat,
    ],
    tasks: [
      { id: "fr-1", title: "Haare schneiden und stylen", description: "Schnitt und Finish handwerklich am Menschen umsetzen.", kiEignung: 10, category: "physisch", warum: "Ein Schnitt entsteht mit der Hand am Kopf, in Echtzeit. Da hilft keine Software." },
      { id: "fr-2", title: "Kund:innen zu Frisur und Pflege beraten", description: "Passende Schnitte, Farben und Produkte empfehlen.", kiEignung: 20, category: "sozial", warum: "Aus Wunsch und Haartyp eine machbare Frisur ableiten ist Erfahrung im Gespräch." },
      { id: "fr-3", title: "Farben und Tönungen anmischen und auftragen", description: "Coloration nach Rezeptur mischen und präzise auftragen.", kiEignung: 15, category: "physisch", warum: "Coloration mischen und präzise auftragen ist Handwerk am Menschen." },
      { id: "fr-4", title: "Termine und Kasse verwalten", description: "Terminbuch führen, abrechnen, Tagesabschluss machen.", kiEignung: 80, category: "routine", warum: "Terminbuch und Kasse führen ist der einzige Teil, der ohnehin am Bildschirm läuft." },
      { id: "fr-5", title: "Kopfhaut- und Haaranalyse durchführen", description: "Haarzustand beurteilen und Behandlung darauf abstimmen.", kiEignung: 40, category: "analytisch", warum: "Den Haarzustand beurteilen kann Technik unterstützen. Das Anfassen und Einschätzen bleibt beim Menschen." },
      { id: "fr-6", title: "Small Talk und Kundenbindung pflegen", description: "Während der Behandlung Beziehung und Wohlfühlatmosphäre schaffen.", kiEignung: 10, category: "sozial", warum: "Die halbe Stunde Gespräch am Stuhl ist der Grund, warum Leute wiederkommen." },
      { id: "fr-7", title: "Produkte im Salon verkaufen", description: "Pflegeprodukte passend zur Behandlung anbieten.", kiEignung: 35, category: "sozial", warum: "Ein passendes Pflegeprodukt empfehlen ist ein Verkaufsgespräch von Mensch zu Mensch." },
      { id: "fr-8", title: "Arbeitsplatz reinigen und Hygiene sichern", description: "Werkzeuge desinfizieren, Platz für die nächste Kundin herrichten.", kiEignung: 30, category: "physisch", warum: "Werkzeug desinfizieren und den Platz herrichten ist körperliche Arbeit im Salon." },
    ],
  },
  {
    slug: "koch",
    title: "Koch/Köchin",
    shortDescription:
      "Bereitet Speisen zu, entwickelt Gerichte und hält den Küchenbetrieb organisiert.",
    kategorie: "handel-dienstleistung",
    zukunftsausblick:
      "Kalkulation, Bestellung und Standardisierung sind digitalisierbar, in der Systemgastronomie ist vieles vorgefertigt. Das Kochen selbst, das Abschmecken, das Anrichten und das Koordinieren im Stress bleiben menschlich. In der gehobenen Küche zählt Kreativität mehr denn je.",
    tippsMenschlich: [
      "Nach Geschmack abschmecken statt nur nach Rezept kochen",
      "Im Service-Stress ein Team und viele Bestellungen koordinieren",
      "Eigene Gerichte und Menüs mit Handschrift entwickeln",
    ],
    quellen: [
      { ...freyOsborne, wert: "Cooks, Restaurant: 96 %, Chefs and Head Cooks: 10 %" },
      jobFuturomat,
    ],
    tasks: [
      { id: "ko-1", title: "Speisen nach Rezept zubereiten", description: "Komponenten vorbereiten, garen und würzen.", kiEignung: 30, category: "physisch", warum: "Kochen heißt schneiden, garen, abschmecken – Handarbeit am Herd, kaum automatisierbar." },
      { id: "ko-2", title: "Gerichte anrichten und garnieren", description: "Teller ansprechend und gleichmäßig präsentieren.", kiEignung: 25, category: "physisch", warum: "Einen Teller gleichmäßig und schön anrichten macht die Hand, nicht der Rechner." },
      { id: "ko-3", title: "Neue Gerichte und Menüs entwickeln", description: "Saisonale Karten und eigene Kreationen erarbeiten.", kiEignung: 20, category: "kreativ", warum: "Eine Karte mit Handschrift entwickeln ist der kreative Kern – KI kann höchstens Ideen zuspielen." },
      { id: "ko-4", title: "Waren bestellen und Lager verwalten", description: "Bedarf planen, bestellen, Verfall und Bestand kontrollieren.", kiEignung: 80, category: "routine", warum: "Bedarf planen und bestellen ist ein Fall für die Warenwirtschaft." },
      { id: "ko-5", title: "Speisekarten kalkulieren", description: "Wareneinsatz und Preise pro Gericht berechnen.", kiEignung: 75, category: "analytisch", warum: "Wareneinsatz und Preise pro Gericht ausrechnen ist Tabellenarbeit." },
      { id: "ko-6", title: "Küche reinigen und HACCP-Hygiene dokumentieren", description: "Temperaturen, Reinigung und Kühlketten protokollieren.", kiEignung: 55, category: "routine", warum: "Temperaturen und Reinigung protokollieren lässt sich weitgehend automatisch erfassen." },
      { id: "ko-7", title: "Küchenteam während des Service koordinieren", description: "Bestellungen takten, Posten abstimmen, Ausgabe steuern.", kiEignung: 25, category: "sozial", warum: "Im Service-Stress Bestellungen takten und Posten abstimmen ist Führung im Moment." },
      { id: "ko-8", title: "Lebensmittelqualität bei Anlieferung prüfen", description: "Frische, Temperatur und Menge der Ware kontrollieren.", kiEignung: 45, category: "analytisch", warum: "Frische und Temperatur bei der Anlieferung checken heißt anfassen und riechen." },
    ],
  },
  {
    slug: "tourismuskaufmann",
    title: "Tourismuskaufmann/-frau",
    shortDescription:
      "Berät zu Reisen, bucht Leistungen und stellt Reisepakete für Kund:innen zusammen.",
    kategorie: "handel-dienstleistung",
    zukunftsausblick:
      "Kaum ein Ausbildungsberuf ist so stark unter Druck wie dieser: Buchungsplattformen und KI-Chatbots übernehmen längst, was früher am Schalter passierte – Preise vergleichen, Flüge buchen, Standardreisen zusammenstellen. Das klassische Reisebüro ist dadurch real geschrumpft. Wer bleibt, verschiebt sich in Richtung komplexer, individueller Beratung und Krisenmanagement, wo ein Mensch am anderen Ende noch einen echten Unterschied macht.",
    tippsMenschlich: [
      "Komplexe, individuelle Wünsche verstehen, die keine Suchmaske erfasst",
      "In Krisen (Ausfälle, Naturkatastrophen, Insolvenzen) schnell und verantwortlich reagieren",
      "Vertrauen aufbauen bei Menschen, die viel Geld für ihren Urlaub ausgeben",
    ],
    quellen: [
      { ...freyOsborne, wert: "Travel Agents: 96 %" },
      { ...iabKurzbericht, wert: "Reiseverkehrsberufe: deutlich überdurchschnittlich" },
      jobFuturomat,
    ],
    tasks: [
      { id: "tk-1", title: "Standardreisen zusammenstellen", description: "Pauschalreisen aus Flug, Hotel und Transfer buchen.", kiEignung: 90, category: "routine", warum: "Flug, Hotel und Transfer zu einem Paket kombinieren ist genau das, was Buchungsplattformen längst automatisch machen." },
      { id: "tk-2", title: "Preise und Verfügbarkeiten vergleichen", description: "Angebote verschiedener Anbieter gegenüberstellen.", kiEignung: 90, category: "routine", warum: "Preise über Anbieter hinweg vergleichen ist eine Datenbankabfrage, keine Beratungsleistung." },
      { id: "tk-3", title: "Individuelle Reisewünsche beraten", description: "Ungewöhnliche oder komplexe Reiseziele passend planen.", kiEignung: 40, category: "sozial", warum: "Wenn Wünsche vage oder widersprüchlich sind, hilft Nachfragen und Erfahrung – mehr als eine Suchmaske leisten kann." },
      { id: "tk-4", title: "Reiseunterlagen und Buchungen abwickeln", description: "Tickets, Vouchers und Bestätigungen erstellen und versenden.", kiEignung: 92, category: "routine", warum: "Dokumente aus Buchungsdaten generieren läuft heute fast vollständig automatisch." },
      { id: "tk-5", title: "Bei Reiseproblemen vor Ort helfen", description: "Ausfälle, Umbuchungen oder Notfälle während der Reise klären.", kiEignung: 20, category: "sozial", warum: "Wenn ein Flug gestrichen wird und jemand am Flughafen feststeckt, zählt ein Mensch, der wirklich hilft, nicht ein FAQ." },
      { id: "tk-6", title: "Reiseversicherungen und Zusatzleistungen erklären", description: "Bedingungen und Sinnhaftigkeit verständlich vermitteln.", kiEignung: 65, category: "analytisch", warum: "Standardbedingungen erklären kann ein Chatbot inzwischen ordentlich." },
      { id: "tk-7", title: "Reklamationen nach der Reise bearbeiten", description: "Beschwerden prüfen und Entschädigungen aushandeln.", kiEignung: 45, category: "sozial", warum: "Eine verärgerte Kundschaft ernst nehmen und fair verhandeln ist mehr als ein Formular abzuarbeiten." },
      { id: "tk-8", title: "Reisetrends und Zielgebiete recherchieren", description: "Neue Angebote und Destinationen für das Portfolio sichten.", kiEignung: 60, category: "analytisch", warum: "Trends aus Daten und Berichten zusammenfassen kann KI heute schon unterstützend leisten." },
    ],
  },
];

export function getBeruf(slug: string): Beruf | undefined {
  return berufe.find((b) => b.slug === slug);
}

export function getAlleSlugs(): string[] {
  return berufe.map((b) => b.slug);
}
