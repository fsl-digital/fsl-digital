export interface EventItem {
  title: string;
  date: string;
  type: 'event' | 'publication' | 'award';
  description: string;
}

export function getUpcomingEvents(lang: 'en' | 'de' = 'en'): EventItem[] {
  return [
    {
      title:
        lang === 'en'
          ? 'Mainz Science Market: Project presentation of the academy project "Early Modern Foreign Language Textbooks in Digital Form."'
          : 'Wissenschaftsmarkt Mainz: Projektpräsentation des Akademieprojekts "Fremdsprachliche Lehrbücher der Frühen Neuzeit digital"',
      date: lang === 'en' ? 'Sept. 2025, Mainz' : 'Sept. 2025, Mainz',
      type: 'event',
      description:
        lang === 'en'
          ? 'Project presentation at the Mainz Science Market With (among others) Klingebeil, Josefine; Hinterholzer, Miriam; Scharrer, Lisa; Volkanovska, Elena; Risch, Falco.'
          : 'Projektpräsentation auf dem Wissenschaftsmarkt Mainz Mit (u. a.) Klingebeil, Josefine; Hinterholzer, Miriam; Scharrer, Lisa; Volkanovska, Elena; Risch, Falco.'
    },
    {
      title:
        lang === 'en'
          ? '17th Annual Conference of the Society for Germanic Linguistic History: Linguistic Diversity Through the Ages: Historical Perspectives on Multilingualism and Language Contact'
          : '17. Jahrestagung der Gesellschaft für germanistische Sprachgeschichte: Sprachenvielfalt im Wandel der Zeit: Historische Perspektiven auf Mehrsprachigkeit und Sprachkontakt',
      date: lang === 'en' ? 'October 8–10, 2025, University of Hamburg' : '8.10.-10.10.2025, Universität Hamburg',
      type: 'event',
      description:
        lang === 'en'
          ? ''
          : ''
    },
    {
      title:
        lang === 'en'
          ? 'Martin Kramer Society. Lecture: "Representation of Social Groups in Historical Foreign Language Textbooks"'
          : "Martin-Kramer-Gesellschaft. Vortrag 'Repräsentation sozialer Gruppen in historischen Fremdsprachlehrwerken'",
      date: lang === 'en' ? 'October 1–3, 2025, Vienna' : '01.-3.10.2025, Wien',
      type: 'event',
      description:
        lang === 'en'
          ? 'Lecture at the Martin Kramer Society in Vienna With Josephine Klingebeil-Schieke, Elena Bandt, and Lisa Scharrer.'
          : 'Vortrag auf der Martin-Kramer-Gesellschaft in Wien Mit Josephine Klingebeil-Schieke, Elena Bandt, Lisa Scharrer.'
    },
    {
      title:
        lang === 'en'
          ? 'Salon Sophie Charlotte at the Berlin-Brandenburg Academy of Sciences and Humanities'
          : 'Salon Sophie Charlotte an der Berlin-Brandenburgischen Akademie der Wissenschaften',
      date: lang === 'en' ? 'January 24, 2026' : '24.01.2026',
      type: 'event',
      description:
        lang === 'en'
          ? ''
          : ''
    }
  ];
}

export function getPastEvents(lang: 'en' | 'de' = 'en'): EventItem[] {
  return [
    {
      title:
        lang === 'en'
          ? 'Lecture series: Affect, Archive & Artificial Intelligence.'
          : 'Lecture Series Affect, Archive & Artificial Intelligence.',
      date: lang === 'en' ? 'March 3, 2025.' : '03.03.2025.',
      type: 'event',
      description:
        lang === 'en'
          ? 'Lecture: "Language history, language attitudes, and everyday communication in the context of multilingualism in early modern Europe: Insights into the FSL project."\nWith Kerstin Roth, Luise Borek, Lisa Scharrer, Natalia Filatkina.'
          : 'Vortrag "Language history, language attitudes and everyday communication in the context of multilingualism in Early Modern Europe: Insights into the FSL-project".\nMit Kerstin Roth, Luise Borek, Lisa Scharrer, Natalia Filatkina.'
    }
  ];
} 