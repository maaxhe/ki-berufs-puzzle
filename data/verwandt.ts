/**
 * Kuratierte Verwandtschaften: Welche Berufe/Studiengänge liegen thematisch
 * nah beieinander? Wird auf den Detailseiten angezeigt und ergänzt die Suche.
 */
export interface Verwandte {
  berufe?: string[];
  studiengaenge?: string[];
}

export const verwandtBerufe: Record<string, Verwandte> = {
  pflegefachkraft: { berufe: ["medizinische-fachangestellte", "notfallsanitaeter", "physiotherapeut"], studiengaenge: ["medizin"] },
  "medizinische-fachangestellte": { berufe: ["pflegefachkraft", "zahnmedizinische-fachangestellte", "notfallsanitaeter"], studiengaenge: ["medizin", "pharmazie"] },
  "zahnmedizinische-fachangestellte": { berufe: ["medizinische-fachangestellte", "pflegefachkraft"], studiengaenge: ["medizin"] },
  notfallsanitaeter: { berufe: ["pflegefachkraft", "medizinische-fachangestellte", "polizeivollzugsbeamter"], studiengaenge: ["medizin"] },
  physiotherapeut: { berufe: ["pflegefachkraft", "medizinische-fachangestellte"], studiengaenge: ["medizin", "psychologie"] },
  erzieher: { berufe: ["lehrer"], studiengaenge: ["paedagogik", "soziale-arbeit"] },
  lehrer: { berufe: ["erzieher"], studiengaenge: ["paedagogik", "psychologie"] },
  softwareentwickler: { berufe: ["fachinformatiker-anwendungsentwicklung", "fachinformatiker-systemintegration"], studiengaenge: ["informatik", "data-science"] },
  "fachinformatiker-anwendungsentwicklung": { berufe: ["softwareentwickler", "fachinformatiker-systemintegration"], studiengaenge: ["informatik", "wirtschaftsinformatik"] },
  "fachinformatiker-systemintegration": { berufe: ["fachinformatiker-anwendungsentwicklung", "softwareentwickler"], studiengaenge: ["informatik", "elektrotechnik"] },
  grafikdesigner: { berufe: ["mediengestalter"], studiengaenge: ["kommunikationswissenschaft"] },
  mediengestalter: { berufe: ["grafikdesigner"], studiengaenge: ["kommunikationswissenschaft"] },
  bankkaufmann: { berufe: ["steuerfachangestellte", "industriekaufmann", "immobilienkaufmann"], studiengaenge: ["betriebswirtschaftslehre", "volkswirtschaftslehre"] },
  steuerfachangestellte: { berufe: ["bankkaufmann", "kaufmann-bueromanagement"], studiengaenge: ["betriebswirtschaftslehre"] },
  "kaufmann-bueromanagement": { berufe: ["industriekaufmann", "steuerfachangestellte", "personaldienstleistungskaufmann"], studiengaenge: ["betriebswirtschaftslehre"] },
  industriekaufmann: { berufe: ["kaufmann-bueromanagement", "bankkaufmann"], studiengaenge: ["betriebswirtschaftslehre", "wirtschaftsingenieurwesen"] },
  personaldienstleistungskaufmann: { berufe: ["kaufmann-bueromanagement", "industriekaufmann"], studiengaenge: ["betriebswirtschaftslehre", "psychologie"] },
  rechtsanwaltsfachangestellte: { berufe: ["steuerfachangestellte", "kaufmann-bueromanagement"], studiengaenge: ["jura"] },
  immobilienkaufmann: { berufe: ["bankkaufmann", "maurer"], studiengaenge: ["betriebswirtschaftslehre", "architektur"] },
  einzelhandelskaufmann: { berufe: ["fachkraft-lagerlogistik", "industriekaufmann"], studiengaenge: ["betriebswirtschaftslehre"] },
  tourismuskaufmann: { berufe: ["hotelfachmann", "koch"], studiengaenge: ["betriebswirtschaftslehre"] },
  hotelfachmann: { berufe: ["koch", "tourismuskaufmann"], studiengaenge: ["betriebswirtschaftslehre"] },
  koch: { berufe: ["hotelfachmann"], studiengaenge: [] },
  friseur: { berufe: ["einzelhandelskaufmann"], studiengaenge: [] },
  industriemechaniker: { berufe: ["kfz-mechatroniker", "anlagenmechaniker-shk", "elektroniker-energie-gebaeudetechnik"], studiengaenge: ["maschinenbau", "wirtschaftsingenieurwesen"] },
  "kfz-mechatroniker": { berufe: ["industriemechaniker", "elektroniker-energie-gebaeudetechnik", "berufskraftfahrer"], studiengaenge: ["maschinenbau", "elektrotechnik"] },
  "elektroniker-energie-gebaeudetechnik": { berufe: ["anlagenmechaniker-shk", "industriemechaniker"], studiengaenge: ["elektrotechnik"] },
  "anlagenmechaniker-shk": { berufe: ["elektroniker-energie-gebaeudetechnik", "maurer"], studiengaenge: ["maschinenbau"] },
  tischler: { berufe: ["maurer", "maler-lackierer"], studiengaenge: ["architektur"] },
  maurer: { berufe: ["tischler", "maler-lackierer", "anlagenmechaniker-shk"], studiengaenge: ["architektur"] },
  "maler-lackierer": { berufe: ["maurer", "tischler"], studiengaenge: ["architektur"] },
  landwirt: { berufe: [], studiengaenge: ["nachhaltigkeitswissenschaft", "biologie"] },
  berufskraftfahrer: { berufe: ["fachkraft-lagerlogistik", "kfz-mechatroniker"], studiengaenge: ["wirtschaftsingenieurwesen"] },
  "fachkraft-lagerlogistik": { berufe: ["berufskraftfahrer", "einzelhandelskaufmann"], studiengaenge: ["wirtschaftsingenieurwesen"] },
  polizeivollzugsbeamter: { berufe: ["notfallsanitaeter"], studiengaenge: ["jura", "politikwissenschaft"] },
};

export const verwandtStudiengaenge: Record<string, Verwandte> = {
  medizin: { berufe: ["pflegefachkraft", "medizinische-fachangestellte", "notfallsanitaeter", "physiotherapeut"], studiengaenge: ["pharmazie", "biologie", "psychologie"] },
  pharmazie: { berufe: ["medizinische-fachangestellte"], studiengaenge: ["medizin", "chemie", "biologie"] },
  jura: { berufe: ["rechtsanwaltsfachangestellte", "polizeivollzugsbeamter"], studiengaenge: ["politikwissenschaft", "betriebswirtschaftslehre"] },
  psychologie: { berufe: ["physiotherapeut", "personaldienstleistungskaufmann"], studiengaenge: ["cognitive-science", "soziale-arbeit", "medizin"] },
  informatik: { berufe: ["softwareentwickler", "fachinformatiker-anwendungsentwicklung", "fachinformatiker-systemintegration"], studiengaenge: ["data-science", "wirtschaftsinformatik", "cognitive-science"] },
  "data-science": { berufe: ["softwareentwickler"], studiengaenge: ["informatik", "cognitive-science", "volkswirtschaftslehre"] },
  wirtschaftsinformatik: { berufe: ["fachinformatiker-anwendungsentwicklung"], studiengaenge: ["informatik", "betriebswirtschaftslehre"] },
  architektur: { berufe: ["maurer", "tischler", "immobilienkaufmann"], studiengaenge: ["maschinenbau", "nachhaltigkeitswissenschaft"] },
  maschinenbau: { berufe: ["industriemechaniker", "kfz-mechatroniker"], studiengaenge: ["elektrotechnik", "wirtschaftsingenieurwesen"] },
  elektrotechnik: { berufe: ["elektroniker-energie-gebaeudetechnik"], studiengaenge: ["maschinenbau", "informatik", "physik"] },
  physik: { berufe: [], studiengaenge: ["elektrotechnik", "chemie", "informatik"] },
  chemie: { berufe: [], studiengaenge: ["biologie", "pharmazie", "physik"] },
  biologie: { berufe: ["landwirt"], studiengaenge: ["chemie", "medizin", "nachhaltigkeitswissenschaft"] },
  betriebswirtschaftslehre: { berufe: ["bankkaufmann", "industriekaufmann", "kaufmann-bueromanagement"], studiengaenge: ["volkswirtschaftslehre", "wirtschaftsingenieurwesen", "wirtschaftsinformatik"] },
  volkswirtschaftslehre: { berufe: ["bankkaufmann"], studiengaenge: ["betriebswirtschaftslehre", "politikwissenschaft", "data-science"] },
  wirtschaftsingenieurwesen: { berufe: ["industriekaufmann", "fachkraft-lagerlogistik"], studiengaenge: ["betriebswirtschaftslehre", "maschinenbau"] },
  "soziale-arbeit": { berufe: ["erzieher"], studiengaenge: ["paedagogik", "psychologie", "politikwissenschaft"] },
  paedagogik: { berufe: ["lehrer", "erzieher"], studiengaenge: ["soziale-arbeit", "psychologie"] },
  politikwissenschaft: { berufe: ["polizeivollzugsbeamter"], studiengaenge: ["jura", "volkswirtschaftslehre", "kommunikationswissenschaft"] },
  kommunikationswissenschaft: { berufe: ["grafikdesigner", "mediengestalter"], studiengaenge: ["germanistik", "politikwissenschaft", "digital-humanities"] },
  germanistik: { berufe: [], studiengaenge: ["kommunikationswissenschaft", "digital-humanities"] },
  "cognitive-science": { berufe: [], studiengaenge: ["psychologie", "informatik", "data-science"] },
  nachhaltigkeitswissenschaft: { berufe: ["landwirt"], studiengaenge: ["biologie", "architektur", "politikwissenschaft"] },
  "digital-humanities": { berufe: [], studiengaenge: ["germanistik", "informatik", "kommunikationswissenschaft"] },
};
