import React, { useEffect, useMemo, useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { parseCsv, type CsvRow } from '@/lib/csv';

/* ── Network visualisation (3-layer SVG) ── */
const CORE_COLOR     = '#0072B2'; // Okabe-Ito blue
const EXPANDED_COLOR = '#E69F00'; // Okabe-Ito amber
const BIB_COLOR      = '#999999'; // neutral grey

const NetworkVisualization = ({ lang }: { lang: string }) => {
  const cx = 250, cy = 178;

  // Core corpus nodes — inner ellipse
  const coreNodes = [
    { x: 250, y: 170 }, { x: 228, y: 160 }, { x: 272, y: 158 },
    { x: 236, y: 184 }, { x: 263, y: 184 }, { x: 216, y: 172 },
    { x: 280, y: 172 }, { x: 250, y: 150 },
  ];

  // Expanded corpus nodes — middle ring
  const expAngles = [0, 30, 60, 95, 128, 155, 182, 210, 242, 272, 305, 335];
  const expandedNodes = expAngles.map(a => {
    const r = a * Math.PI / 180;
    return { x: cx + 138 * Math.cos(r), y: cy + 90 * Math.sin(r) };
  });

  // Bibliography nodes — outer ring
  const bibAngles = [5, 22, 42, 58, 76, 95, 112, 132, 150, 168, 184, 200, 220, 242, 262, 282, 308, 330];
  const bibNodes = bibAngles.map((a, i) => {
    const r = a * Math.PI / 180;
    const dist = 198 + (i % 3 === 0 ? 14 : i % 3 === 1 ? -8 : 4);
    return { x: cx + dist * Math.cos(r), y: cy + (dist * 0.655) * Math.sin(r) };
  });

  // Edge definitions
  const coreEdges    = [[0,1],[0,2],[0,3],[0,4],[1,3],[2,4],[1,2],[3,4],[0,5],[0,6],[2,6],[1,5],[7,0],[7,1],[7,2],[5,3]];
  const expCoreEdges = [[0,2],[1,2],[2,4],[3,3],[4,4],[5,3],[6,5],[7,5],[8,3],[9,0],[10,6],[11,1]];
  const expExpEdges  = [[0,1],[1,2],[2,3],[4,5],[6,7],[7,8],[9,10],[10,11],[11,0],[3,4]];
  const bibExpEdges  = [[0,0],[2,1],[4,2],[6,3],[8,5],[10,6],[12,8],[14,9],[16,10],[17,11],[1,0],[3,2],[5,3],[9,7]];

  return (
    <div>
      <svg viewBox="0 0 500 356" className="w-full" style={{ maxWidth: '640px', display: 'block', margin: '0 auto' }}>
        {/* ── Background zones ── */}
        <ellipse cx={cx} cy={cy} rx={218} ry={143} fill="none" stroke="#cccccc" strokeWidth="1" strokeDasharray="6,4" />
        <ellipse cx={cx} cy={cy} rx={158} ry={103} fill="#E69F00" fillOpacity="0.12" />
        <ellipse cx={cx} cy={cy} rx={95}  ry={62}  fill="#0072B2" fillOpacity="0.15" />

        {/* ── Bib → Expanded edges ── */}
        {bibExpEdges.map(([b, e], i) => (
          <line key={`be${i}`}
            x1={bibNodes[b].x} y1={bibNodes[b].y}
            x2={expandedNodes[e].x} y2={expandedNodes[e].y}
            stroke="#d1d5db" strokeWidth="0.8" strokeDasharray="4,3" />
        ))}

        {/* ── Expanded → Expanded edges ── */}
        {expExpEdges.map(([a, b], i) => (
          <line key={`ee${i}`}
            x1={expandedNodes[a].x} y1={expandedNodes[a].y}
            x2={expandedNodes[b].x} y2={expandedNodes[b].y}
            stroke="#E69F00" strokeWidth="1.1" />
        ))}

        {/* ── Expanded → Core edges ── */}
        {expCoreEdges.map(([e, c], i) => (
          <line key={`ec${i}`}
            x1={expandedNodes[e].x} y1={expandedNodes[e].y}
            x2={coreNodes[c].x} y2={coreNodes[c].y}
            stroke="#0072B2" strokeWidth="1.2" />
        ))}

        {/* ── Core → Core edges ── */}
        {coreEdges.map(([a, b], i) => (
          <line key={`cc${i}`}
            x1={coreNodes[a].x} y1={coreNodes[a].y}
            x2={coreNodes[b].x} y2={coreNodes[b].y}
            stroke={CORE_COLOR} strokeWidth="1.8" />
        ))}

        {/* ── Nodes: bibliography ── */}
        {bibNodes.map((n, i) => <circle key={`bn${i}`} cx={n.x} cy={n.y} r="5" fill={BIB_COLOR} />)}

        {/* ── Nodes: expanded ── */}
        {expandedNodes.map((n, i) => <circle key={`en${i}`} cx={n.x} cy={n.y} r="7" fill={EXPANDED_COLOR} />)}

        {/* ── Nodes: core ── */}
        {coreNodes.map((n, i) => <circle key={`cn${i}`} cx={n.x} cy={n.y} r="9" fill={CORE_COLOR} />)}
      </svg>

      {/* ── Legend with colour boxes ── */}
      <div className="flex flex-wrap justify-center gap-6 mt-5">
        {[
          { color: CORE_COLOR,     label: lang === 'de' ? 'Kernkorpus'          : 'Core corpus' },
          { color: EXPANDED_COLOR, label: lang === 'de' ? 'Erweitertes Korpus'  : 'Expanded corpus' },
          { color: BIB_COLOR,      label: lang === 'de' ? 'Bibliographie'       : 'Bibliography' },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CORPUS_TOTAL  = 1000;
const INITIAL_CORPUS_ROWS = 10;
const NUM_TICKS     = 90;
const PRIMARY       = 'hsl(215,71%,19%)';
const SECONDARY     = '#166534';

type CorpusSortColumn = 'Autor einheitl.' | 'Vollständiger Titel' | 'Druckjahr' | 'Verlagsort' | 'Link zum Digitalisat';
type SortDirection = 'asc' | 'desc';

/* ── Animated gauge ── */
const GaugeChart = ({ loaded, total, size = 140 }: { loaded: number; total: number; size?: number }) => {
  const [animPct, setAnimPct] = useState(0);
  const raf = useRef<number>(0);
  const targetPct = total > 0 ? Math.round((loaded / total) * 100) : 0;

  useEffect(() => {
    if (loaded === 0) return;
    const duration = 1600;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setAnimPct(Math.round(targetPct * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [loaded, targetPct]);

  const filled = Math.round((animPct / 100) * NUM_TICKS);
  const cx = 70, cy = 70, r = 55, innerR = r - 10;
  const ticks = Array.from({ length: NUM_TICKS }, (_, i) => {
    const rad = ((i / NUM_TICKS) * 360 - 90) * (Math.PI / 180);
    return {
      x1: cx + innerR * Math.cos(rad), y1: cy + innerR * Math.sin(rad),
      x2: cx + r * Math.cos(rad),      y2: cy + r * Math.sin(rad),
      filled: i < filled,
    };
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 140 140">
        {ticks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            strokeWidth="3" strokeLinecap="round" stroke={t.filled ? SECONDARY : '#e5e7eb'} />
        ))}
        <text x="70" y="70" textAnchor="middle" dominantBaseline="middle" fontSize="34" fontWeight="700" fill={PRIMARY} fontFamily="inherit">{animPct}%</text>
      </svg>
      <div className="mt-1 text-center text-gray-500">
        <p className="text-base font-semibold tabular-nums">
          {loaded.toLocaleString()} / {total.toLocaleString()}
        </p>
        <p className="text-xs">entries</p>
      </div>
    </div>
  );
};

/* ── Animated counter ── */
const AnimCounter = ({ target, useGrouping = true }: { target: number; useGrouping?: boolean }) => {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (target === 0) return;
    const duration = 1400;
    let start = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target]);
  return <>{val.toLocaleString(undefined, { useGrouping })}</>;
};

/* ── SVG Timeline ── */
const CorpusTimeline = ({ lang }: { lang: string }) => {
  const milestones = [
    { year: 2024, x: 60,  dot: false, label: null },
    {
      year: 2026, x: 220,
      dot: true, current: true,
      above: lang === 'de' ? 'Jetzt (Jahr 3)' : 'Now (Year 3)',
      below: lang === 'de' ? 'Aufbau des\nProjektkorpus' : 'Development of\nthe Project Corpus',
    },
    {
      year: 2028, x: 350,
      dot: true, current: false,
      below: lang === 'de' ? 'Erste Veröffentlichung\ndes Projektkorpus' : 'First Publication\nof the Project Corpus',
    },
    { year: 2034, x: 500, dot: false, label: null },
    { year: 2042, x: 580, dot: false, label: null },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg viewBox="0 0 660 200" className="w-full" style={{ minWidth: '480px', maxWidth: '700px', margin: '0 auto', display: 'block' }}>
        {/* Track (light) */}
        <line x1="50" y1="100" x2="220" y2="100" stroke="#c7d2fe" strokeWidth="6" strokeLinecap="round" />
        {/* Track (filled / past) */}
        <line x1="220" y1="100" x2="600" y2="100" stroke={PRIMARY} strokeWidth="6" strokeLinecap="round" />
        {/* Arrowhead */}
        <polygon points="600,93 618,100 600,107" fill={PRIMARY} />

        {/* Year labels */}
        {milestones.map(m => (
          <text key={m.year} x={m.x} y="130" textAnchor="middle" fontSize="13" fill="#374151" fontFamily="inherit">
            {m.year}
          </text>
        ))}

        {/* Current milestone: 2026 */}
        <line x1="220" y1="60" x2="220" y2="100" stroke={PRIMARY} strokeWidth="1.5" strokeDasharray="4,3" />
        <circle cx="220" cy="100" r="8" fill={PRIMARY} />
        <text x="220" y="52" textAnchor="middle" fontSize="12" fontWeight="700" fill={PRIMARY} fontFamily="inherit">
          {lang === 'de' ? 'Jetzt (Jahr 3)' : 'Now (Year 3)'}
        </text>
        <text x="220" y="155" textAnchor="middle" fontSize="11" fill={PRIMARY} fontFamily="inherit">
          {lang === 'de' ? 'Aufbau des' : 'Development of'}
        </text>
        <text x="220" y="170" textAnchor="middle" fontSize="11" fill={PRIMARY} fontFamily="inherit">
          {lang === 'de' ? 'Projektkorpus' : 'the Project Corpus'}
        </text>

        {/* Future milestone: 2028 */}
        <line x1="350" y1="100" x2="350" y2="120" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4,3" />
        <circle cx="350" cy="100" r="6" fill="white" stroke="#9ca3af" strokeWidth="2" />
        <text x="350" y="155" textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="inherit">
          {lang === 'de' ? 'Erste Veröffentlichung' : 'First Publication'}
        </text>
        <text x="350" y="170" textAnchor="middle" fontSize="11" fill="#6b7280" fontFamily="inherit">
          {lang === 'de' ? 'des Projektkorpus' : 'of the Project Corpus'}
        </text>
      </svg>
      <p className="text-xs text-center text-gray-400 mt-2 italic">
        {lang === 'de'
          ? 'Zeitachse zur Entwicklung des Projektkorpus und zum Publikationsplan'
          : 'Timeline of the project corpus development and publication schedule'}
      </p>
    </div>
  );
};

/* ── Page ── */
const Corpus = ({ lang = 'en', setLang }) => {
  const [corpusRows, setCorpusRows] = useState<CsvRow[]>([]);
  const [corpusLoading, setCorpusLoading] = useState(true);
  const [corpusError, setCorpusError] = useState(false);
  const [corpusSearch, setCorpusSearch] = useState('');
  const [showAllCorpusRows, setShowAllCorpusRows] = useState(false);
  const [sortColumn, setSortColumn] = useState<CorpusSortColumn>('Druckjahr');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    let active = true;

    fetch(`${import.meta.env.BASE_URL}uploads/corpus/corpus.csv`, { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error(`Corpus CSV request failed: ${response.status}`);
        return response.text();
      })
      .then((text) => {
        if (active) setCorpusRows(parseCsv(text));
      })
      .catch(() => {
        if (active) setCorpusError(true);
      })
      .finally(() => {
        if (active) setCorpusLoading(false);
      });

    return () => { active = false; };
  }, []);

  const sortedCorpusRows = useMemo(() => [...corpusRows].sort((a, b) => {
    let comparison: number;

    if (sortColumn === 'Druckjahr') {
      const aYear = Number.parseInt(a[sortColumn], 10);
      const bYear = Number.parseInt(b[sortColumn], 10);
      if (Number.isNaN(aYear) && Number.isNaN(bYear)) comparison = 0;
      else if (Number.isNaN(aYear)) comparison = 1;
      else if (Number.isNaN(bYear)) comparison = -1;
      else comparison = aYear - bYear;
    } else {
      comparison = (a[sortColumn] || '').localeCompare(b[sortColumn] || '', lang, {
        numeric: true,
        sensitivity: 'base',
      });
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  }), [corpusRows, lang, sortColumn, sortDirection]);

  const newCorpusRows = useMemo(
    () => sortedCorpusRows.filter((row) => row['Entry type'].trim().toLowerCase() === 'new'),
    [sortedCorpusRows],
  );

  const searchedCorpusRows = useMemo(() => {
    const query = corpusSearch.trim().toLocaleLowerCase(lang);
    if (!query) return sortedCorpusRows;

    const searchableColumns: CorpusSortColumn[] = [
      'Autor einheitl.',
      'Vollständiger Titel',
      'Druckjahr',
      'Verlagsort',
      'Link zum Digitalisat',
    ];

    return sortedCorpusRows.filter((row) => searchableColumns.some((column) =>
      (row[column] || '').toLocaleLowerCase(lang).includes(query),
    ));
  }, [corpusSearch, lang, sortedCorpusRows]);

  const visibleCorpusRows = showAllCorpusRows
    ? searchedCorpusRows
    : searchedCorpusRows.slice(0, INITIAL_CORPUS_ROWS);
  const canToggleCorpusRows = searchedCorpusRows.length > INITIAL_CORPUS_ROWS;
  const years = corpusRows
    .map((row) => Number.parseInt(row.Druckjahr, 10))
    .filter((year) => Number.isFinite(year));
  const earliestYear = years.length ? Math.min(...years) : 0;
  const latestYear = years.length ? Math.max(...years) : 0;
  const digitisedCount = corpusRows.filter((row) => row['Link zum Digitalisat']).length;
  const dashboardCards = [
    { label: lang === 'de' ? 'Veröffentlicht' : 'Published', value: corpusRows.length, color: 'bg-blue-50 text-blue-700', isYear: false },
    { label: lang === 'de' ? 'Neue Einträge' : 'New entries', value: newCorpusRows.length, color: 'bg-green-50 text-green-700', isYear: false },
    { label: lang === 'de' ? 'Digitalisate' : 'Digital copies', value: digitisedCount, color: 'bg-purple-50 text-purple-700', isYear: false },
    { label: lang === 'de' ? 'Frühestes Jahr' : 'Earliest year', value: earliestYear, color: 'bg-orange-50 text-orange-700', isYear: true },
    { label: lang === 'de' ? 'Spätestes Jahr' : 'Latest year', value: latestYear, color: 'bg-amber-50 text-amber-700', isYear: true },
    { label: lang === 'de' ? 'Verbleibend' : 'Remaining', value: Math.max(CORPUS_TOTAL - corpusRows.length, 0), color: 'bg-red-50 text-red-700', isYear: false },
  ];

  const changeSort = (column: CorpusSortColumn) => {
    if (column === sortColumn) {
      setSortDirection((direction) => direction === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortIndicator = (column: CorpusSortColumn) => {
    if (column !== sortColumn) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const content = {
    en: {
      title: 'FSL Corpus',
      description: 'The FSL corpus comprises a collection of multilingual textbooks from the period between the 15th and the end of the 17th century. These sources are characterised by the following criteria:',
      criteria: [
        'They contain German as one of the languages (object or meta language) and are located in the centre of Europe, which connects German language variants with borders to other European languages (Romance, Germanic, Slavic).',
        'They are not theory-based or language preservation-oriented works, but practical and orality-oriented teaching materials for language instruction.',
        'The works are not purely grammar or dictionary texts, but combine at least two elements such as prefaces, pronunciation or orthography lessons, grammar, glossaries and sample dialogues.',
      ],
      structureTitle: 'The project corpus is structured by an extensive database in which all sources are bibliographically recorded. It consists of two parts.',
      projectCorpus: 'The FSL-digital corpus comprises a collection of multilingual foreign language textbooks from the period between the 15th and the end of the 17th century. The selected sources are organised into two corpus levels, each characterised by the following criteria:',
      coreCorpus: 'Contains all first editions of FSL with a complete representation of the work-part structure central to oral language use (preface, grammar, glossary, sample dialogues). These works are prototypical for the source group. The core corpus is annotated in depth and forms the gold standard for the automatic indexing of the expanded corpus.',
      expandedCorpus: 'Supplements the core corpus with works relevant to lines of tradition. These include further editions of core corpus works as well as works with an incomplete work-part structure in which the characteristics of everyday language practice remain clearly recognisable. In addition, only works from the 18th century that are revised versions of earlier textbooks or follow in their tradition are included in order to ensure comparability and contextual relevance.',
      networkCaption: 'Network visualisation of the lines of tradition across the various corpus levels (centre → outside: blue = core corpus, amber = expanded corpus, grey = bibliography)',
      networkText: 'In order to make the lines of tradition visible beyond the FSL-digital corpus, foreign language textbooks that do not meet the project criteria (e.g. because they contain no German content) but can be regarded as key models and influential reference works for the corpus authors are also bibliographically recorded as part of the corpus work. These works are not at the centre of the project\'s interest and are therefore only considered supplementarily; no claim to completeness is made. The aim is to document the state of transmission and make it accessible to research, in the spirit of basic research and with a view to a continuum of textbook traditions.\n\nOverall, the FSL corpus provides a sound basis for philological analyses and makes it possible to trace and further investigate the development of foreign language teaching in Europe during the early modern period.',
      shapenote: 'The project corpus is currently still under construction. The information provided in the following section is based on the current conceptual and structural state of work and gives an initial overview. It is a continuously updated and further developed extract that currently covers around 400 of a total of 1,000 planned textbooks. The gradual publication is intended to enable early access to the underlying sources.\n\nFor specific questions about the corpus structure or the current state of work, please contact the Hamburg office.',
    },
    de: {
      title: 'FSL Korpus',
      description: 'Das FSL Korpus umfasst eine Sammlung mehrsprachiger Lehrwerke aus dem Zeitraum vom 15. bis zum Ende des 17. Jahrhunderts. Diese Quellen zeichnen sich durch die folgenden Kriterien aus:',
      criteria: [
        'Sie enthalten Deutsch als eine der Sprachen (Objekt- oder Metasprache) und stehen im Zentrum Europas, was deutsche Sprachvarianten mit Grenzen zu anderen europäischen Sprachen (Romanisch, Germanisch, Slawisch) verbindet.',
        'Es handelt sich nicht um theoriebasierte oder sprachpflegerische Werke, sondern um praktische und mündlichkeitsnahe Lehrmaterialien für die Sprachvermittlung.',
        'Die Werke sind keine reinen Grammatik- oder Wörterbuchtexte, sondern kombinieren mindestens zwei Elemente wie Vorreden, Aussprache- oder Orthographielehren, Grammatik, Glossare und Musterdialoge.',
      ],
      structureTitle: 'Das Projektkorpus wird durch eine umfangreiche Datenbank strukturiert, in der alle Quellen bibliographisch erfasst sind. Es besteht aus zwei Teilen.',
      projectCorpus: 'Das FSL-digital-Korpus umfasst eine Sammlung mehrsprachiger Fremdsprachenlehrwerke aus dem Zeitraum vom 15. bis zum Ende des 17. Jahrhunderts. Die ausgewählten Quellen sind in zwei Korpusebenen gegliedert und zeichnen sich jeweils durch folgende Kriterien aus:',
      coreCorpus: 'Enthält alle Erstauflagen der FSL mit vollständiger Darstellung der für den mündlichen Sprachgebrauch zentralen Werkteilstruktur (Vorrede, Grammatik, Glossar, Musterdialoge). Diese Werke repräsentieren prototypisch die Quellengruppe. Das Kernkorpus wird tiefenphilologisch annotiert und bildet den Goldstandard für die automatische Erschließung des erweiterten Korpus.',
      expandedCorpus: 'Ergänzt das Kernkorpus durch traditionslinienrelevante Werke. Dazu zählen sowohl weitere Auflagen der Kernkorpuswerke als auch Werke mit unvollständiger Werkteilstruktur, in denen die Merkmale der alltäglichen Gebrauchspraxis weiterhin deutlich erkennbar sind. Zudem werden aus dem 18. Jahrhundert nur die Werke aufgenommen, die überarbeitete Fassungen früherer Lehrwerke oder in deren Tradition stehen, um Vergleichbarkeit und Kontextbezug zu gewährleisten.',
      networkCaption: 'Netzwerkvisualisierung der Traditionslinien über die verschiedenen Korpusebenen (von innen nach außen: blau = Kernkorpus, bernstein = Erweitertes Korpus, grau = Bibliographie)',
      networkText: 'Um die Traditionslinien über das FSL-digital-Korpus hinaus sichtbar zu machen, werden im Rahmen der Korpusarbeit auch Fremdsprachenlehrwerke bibliographisch erfasst, die nicht den Projektkriterien entsprechen (etwa weil sie keine deutschen Inhalte aufweisen), jedoch als zentrale Vorbilder und einflussreiche Referenzwerke für die Korpusautor:innen gelten können. Diese Werke stehen nicht im Zentrum des Projektinteresses und werden daher ausschließlich ergänzend berücksichtigt; ein Anspruch auf Vollständigkeit besteht nicht. Ziel ist es, im Sinne der Grundlagenforschung sowie im Blick auf ein Kontinuum an Lehrwerkstraditionen die Überlieferungslage zu dokumentieren und der Forschung zugänglich zu machen.\n\nInsgesamt bietet das FSL-Korpus eine fundierte Grundlage für philologische Analysen und ermöglicht es, die Entwicklung des Fremdsprachenunterrichts in Europa während der Frühen Neuzeit nachzuvollziehen und weiterführend zu untersuchen.',
      shapenote: 'Das Projektkorpus befindet sich derzeit noch im Aufbau. Die in dem folgenden Abschnitt bereitgestellten Informationen beruhen auf dem gegenwärtigen konzeptionellen und strukturellen Arbeitsstand und geben einen ersten Überblick. Es handelt sich dabei um einen fortlaufend aktualisierten und weiterentwickelten Auszug, der aktuell rund 400 von insgesamt anvisierten 1000 Lehrwerken umfasst. Die schrittweise Veröffentlichung soll eine frühzeitige Einsicht in die zugrunde liegenden Quellen ermöglichen.\n\nBei konkreten Fragen zum Korpusaufbau oder zum aktuellen Arbeitsstand wenden Sie sich gerne an die Arbeitsstelle Hamburg.',
    },
  };

  const c = content[lang] || content.en;

  return (
    <div className="min-h-screen">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">

            <h1 className="text-4xl font-bold text-center mb-12">{c.title}</h1>

            {/* Disclaimer / intro */}
            <div className="bg-gray-50 border-l-4 border-primary p-8 mb-12 rounded-r-lg">
              <p className="text-lg text-gray-700 leading-relaxed">{c.description}</p>
            </div>

            {/* ── Methodological Framework ── */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {lang === 'en' ? 'Methodological Framework' : 'Methodischer Rahmen'}
              </h2>
              <div className="space-y-6">
                {c.criteria.map((criterion, i) => (
                  <div key={i} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 ${i === 1 ? 'bg-red-600' : 'bg-primary'} text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                        {i + 1}
                      </div>
                      <p className="flex-1 text-gray-700 leading-relaxed text-lg">{criterion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Corpus Architecture ── */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {lang === 'en' ? 'Corpus Architecture' : 'Korpus-Architektur'}
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center italic">
                {c.structureTitle}
              </p>

              {/* Projektkorpus note */}
              <div className="bg-gray-50 border-l-4 border-primary p-6 mb-8 rounded-r-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {lang === 'en' ? 'Project Corpus' : 'Projektkorpus'}
                </h3>
                <p className="text-gray-700 leading-relaxed">{c.projectCorpus}</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Core Corpus */}
                <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {lang === 'en' ? 'Core Corpus' : 'Kernkorpus'}
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">{c.coreCorpus}</p>
                  </div>
                </div>

                {/* Expanded Corpus */}
                <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {lang === 'en' ? 'Expanded Corpus' : 'Erweitertes Korpus'}
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">{c.expandedCorpus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Network Visualisation ── */}
            <div className="mb-12">
              <div className="rounded-xl overflow-hidden border border-gray-200 shadow-md bg-white p-6">
                <NetworkVisualization lang={lang} />
              </div>
              <p className="text-sm text-center text-gray-500 mt-3 italic">{c.networkCaption}</p>

              <div className="mt-8 bg-gray-50 border-l-4 border-primary p-8 rounded-r-lg">
                {c.networkText.split('\n\n').map((para, i) => (
                  <p key={i} className={`text-gray-700 leading-relaxed text-lg ${i > 0 ? 'mt-4' : ''}`}>{para}</p>
                ))}
              </div>
            </div>

            {/* ── Corpus data dashboard and table ── */}
            <div className="mb-8 bg-white p-6">
              <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">
                {lang === 'de' ? 'Korpusübersicht' : 'Corpus Overview'}
              </h2>
              <div className="mx-auto grid w-full max-w-3xl items-center gap-6 md:grid-cols-[180px_230px_180px] md:justify-center md:gap-5">
                <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
                  {dashboardCards.slice(0, 3).map((card) => (
                    <div key={card.label} className={`rounded-xl px-5 py-4 text-center ${card.color}`}>
                      <div className="text-2xl font-bold tabular-nums"><AnimCounter target={card.value} useGrouping={!card.isYear} /></div>
                      <div className="text-xs mt-1 opacity-80 leading-tight">{card.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center md:order-none -order-1">
                  <GaugeChart loaded={corpusRows.length} total={CORPUS_TOTAL} size={210} />
                </div>
                <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
                  {dashboardCards.slice(3).map((card) => (
                    <div key={card.label} className={`rounded-xl px-5 py-4 text-center ${card.color}`}>
                      <div className="text-2xl font-bold tabular-nums"><AnimCounter target={card.value} useGrouping={!card.isYear} /></div>
                      <div className="text-xs mt-1 opacity-80 leading-tight">{card.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {lang === 'de' ? 'Korpus Einträge' : 'Corpus Entries'}
              </h2>

              {corpusLoading && (
                <p className="text-center text-gray-500 py-8">{lang === 'de' ? 'Korpusdaten werden geladen …' : 'Loading corpus data…'}</p>
              )}
              {corpusError && (
                <p className="text-center text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">
                  {lang === 'de' ? 'Die Korpusdaten konnten nicht geladen werden.' : 'The corpus data could not be loaded.'}
                </p>
              )}
              {!corpusLoading && !corpusError && (
                <>
                  <div className="mb-6 flex flex-col items-center gap-2">
                      <div className="relative w-full max-w-lg">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          type="search"
                          value={corpusSearch}
                          onChange={(event) => {
                            setCorpusSearch(event.target.value);
                            setShowAllCorpusRows(false);
                          }}
                          placeholder={lang === 'de' ? 'Suche in allen Feldern…' : 'Search all fields…'}
                          aria-label={lang === 'de' ? 'Korpuseinträge durchsuchen' : 'Search corpus entries'}
                          className="w-full rounded-xl border border-gray-300 py-2.5 pl-10 pr-4 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <span className="text-xs text-gray-400">
                        {searchedCorpusRows.length} {lang === 'de' ? 'Einträge' : 'entries'}
                        {corpusSearch && ` ${lang === 'de' ? 'gefunden' : 'found'}`}
                      </span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full min-w-[850px] border-collapse bg-white text-left text-sm">
                      <thead className="bg-primary text-white">
                        <tr>
                          {([
                            ['Autor einheitl.', lang === 'de' ? 'Autor' : 'Author'],
                            ['Vollständiger Titel', lang === 'de' ? 'Vollständiger Titel' : 'Full title'],
                            ['Druckjahr', lang === 'de' ? 'Druckjahr' : 'Publication year'],
                            ['Verlagsort', lang === 'de' ? 'Verlagsort' : 'Publication place'],
                            ['Link zum Digitalisat', lang === 'de' ? 'Digitalisat' : 'Digital copy'],
                          ] as [CorpusSortColumn, string][]).map(([column, label]) => (
                            <th
                              key={column}
                              className="px-4 py-3 text-center font-semibold whitespace-nowrap"
                              aria-sort={sortColumn === column ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                            >
                              <button
                                type="button"
                                onClick={() => changeSort(column)}
                                className="flex w-full items-center justify-center gap-2 whitespace-nowrap text-center hover:text-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                              >
                                <span>{label}</span>
                                <span aria-hidden="true" className="text-xs opacity-80">{sortIndicator(column)}</span>
                              </button>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {visibleCorpusRows.map((row, index) => {
                          const link = row['Link zum Digitalisat'];
                          const safeLink = /^https?:\/\//i.test(link) ? link : '';
                          return (
                            <tr key={`${row['Vollständiger Titel']}-${row.Druckjahr}-${index}`} className="border-t border-gray-200 even:bg-gray-50 align-top">
                              <td className="px-4 py-3 text-gray-700">{row['Autor einheitl.'] || '—'}</td>
                              <td className="px-4 py-3 text-justify text-gray-900">{row['Vollständiger Titel'] || '—'}</td>
                              <td className="px-4 py-3 text-gray-700 tabular-nums">{row.Druckjahr || '—'}</td>
                              <td className="px-4 py-3 text-gray-700">{row.Verlagsort || '—'}</td>
                              <td className="px-4 py-3">
                                {safeLink ? (
                                  <a href={safeLink} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900">
                                    {lang === 'de' ? 'Öffnen' : 'Open'}
                                  </a>
                                ) : '—'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {canToggleCorpusRows && (
                    <div className="mt-5 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setShowAllCorpusRows((showAll) => !showAll)}
                        aria-expanded={showAllCorpusRows}
                        className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        {showAllCorpusRows
                          ? (lang === 'de' ? 'Weniger anzeigen' : 'Show less')
                          : (lang === 'de' ? 'Mehr anzeigen' : 'Show more')}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Shapenote / Status note ── */}
            <div className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="space-y-3">
                  {c.shapenote.split('\n\n').map((para, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Timeline ── */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {lang === 'de' ? 'Zeitachse' : 'Timeline'}
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                <CorpusTimeline lang={lang} />
              </div>
            </div>

          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Corpus;
