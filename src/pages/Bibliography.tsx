import React, { useEffect, useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HumanGate from '@/components/HumanGate';
import { useHumanVerified } from '@/hooks/useHumanVerified';
import { parseCsv, sanitizeText } from '@/lib/csv';

const CSV_FILES = [
  'export-data_1.csv',
  'export-data_2.csv',
  'export-data_3.csv',
  'export-data_4.csv',
];

const PREVIEW_ROWS = 10;

const COLUMNS = [
  { key: 'Author',            label: { en: 'Author',            de: 'Autor' } },
  { key: 'Publication Year',  label: { en: 'Publication Year',  de: 'Jahr' } },
  { key: 'Title',             label: { en: 'Title',             de: 'Titel' } },
  { key: 'Editor',            label: { en: 'Editor',            de: 'Herausgeber' } },
  { key: 'Publication Title', label: { en: 'Publication Title', de: 'Publikationstitel' } },
  { key: 'Pages',             label: { en: 'Pages',             de: 'Seiten' } },
  { key: 'Issue',             label: { en: 'Issue',             de: 'Heft' } },
  { key: 'Volume',            label: { en: 'Volume',            de: 'Band' } },
  { key: 'Place',             label: { en: 'Place',             de: 'Ort' } },
  { key: 'DOI',               label: { en: 'DOI',               de: 'DOI' } },
];

/* ── Helpers ── */
const getDoiHref = (doi: string) => {
  if (!doi) return '';
  const cleaned = doi.replace(/^DOI:\s*/i, '').trim();
  if (!cleaned) return '';
  return cleaned.startsWith('http') ? cleaned : `https://doi.org/${cleaned}`;
};

const getDoiText = (doi: string) =>
  doi.replace(/^DOI:\s*/i, '').replace(/https?:\/\/(dx\.)?doi\.org\//i, '').trim();

const renderNameList = (names: string) => {
  if (!names) return <span className="text-gray-400">—</span>;
  return (
    <>
      {names.split(';').map((p, i) => (
        <span key={i} className="block">{sanitizeText(p.trim())}</span>
      ))}
    </>
  );
};

const SortIcon = ({ col, sortKey, sortDir }: { col: string; sortKey: string; sortDir: string }) => (
  <span className={`ml-1 text-xs ${sortKey === col ? 'opacity-100' : 'opacity-30'}`}>
    {sortKey === col ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
  </span>
);

/* ── Page ── */
const Bibliography = ({ lang = 'en', setLang }) => {
  const [entries,  setEntries]  = useState<any[]>([]);
  const [sortKey,  setSortKey]  = useState('Publication Year');
  const [sortDir,  setSortDir]  = useState<'asc' | 'desc'>('desc');
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');
  const [search,   setSearch]   = useState('');
  const [showAll,  setShowAll]  = useState(false);
  const { verified, verify } = useHumanVerified('fsl-table-verified');

  useEffect(() => {
    if (!verified) return;
    setLoading(true);
    setError('');
    const base = `${import.meta.env.BASE_URL}uploads/bibliography/zotero/`;
    Promise.all(
      CSV_FILES.map(f =>
        fetch(base + f)
          .then(r => (r.ok ? r.text() : Promise.reject(f)))
          .then(text => parseCsv(text))
          .catch(() => [] as any[])
      )
    ).then(results => {
      const seen = new Set<string>();
      const merged: any[] = [];
      for (const rows of results) {
        for (const row of rows) {
          const key = row['Key'] || JSON.stringify(row);
          if (!seen.has(key)) { seen.add(key); merged.push(row); }
        }
      }
      setEntries(merged);
      setLoading(false);
    }).catch(() => {
      setError(lang === 'de' ? 'Bibliographie konnte nicht geladen werden.' : 'Failed to load bibliography.');
      setLoading(false);
    });
  }, [verified]);

  const requestSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return entries;
    const q = search.toLowerCase();
    return entries.filter(row => COLUMNS.some(c => (row[c.key] || '').toString().toLowerCase().includes(q)));
  }, [entries, search]);

  const sorted = useMemo(() => {
    const dir = sortDir === 'asc' ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = sortKey === 'Publication Year' ? parseInt(a[sortKey], 10) || 0 : (a[sortKey] || '').toString().toLowerCase();
      const bv = sortKey === 'Publication Year' ? parseInt(b[sortKey], 10) || 0 : (b[sortKey] || '').toString().toLowerCase();
      if (av === '' || av === 0) return 1;
      if (bv === '' || bv === 0) return -1;
      if (typeof av === 'number') return (av - (bv as number)) * dir;
      return (av as string).localeCompare(bv as string) * dir;
    });
  }, [filtered, sortKey, sortDir]);

  const visibleRows = showAll ? sorted : sorted.slice(0, PREVIEW_ROWS);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">

          {/* ── Header ── */}
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">
              {lang === 'de' ? 'Projektbibliographie' : 'Project Bibliography'}
            </h1>

            <div className="mt-8 mb-10 bg-gray-50 border-l-4 border-primary p-8 rounded-r-lg text-left">
              <p className="text-lg leading-relaxed text-gray-700">
                {lang === 'de' ? (
                  <>
                    Eine kuratierte Übersicht relevanter Literatur zu historischen Fremdsprachenlehrwerken, deren Rezeptionsgeschichte und Traditionslinien. Sie dient als Einstiegspunkt für vertiefende Recherche und dokumentiert zentrale Quellen und Studien zu Sprachgeschichte, Sprachvorstellungen und Alltagskommunikation im Kontext der Mehrsprachigkeit im Europa der Frühen Neuzeit. Eine Bibliographie der Titel aus der folgenden Tabelle steht{' '}
                    <a href={`${import.meta.env.BASE_URL}uploads/bibliography/FSLdigital_Sekundärliteratur_202606.pdf`} download className="text-red-600 font-semibold underline underline-offset-2 hover:text-red-800">hier</a>
                    {' '}zum Download zur Verfügung.
                  </>
                ) : (
                  <>
                    A curated overview of relevant literature on historical foreign language textbooks, their reception history, and their intellectual traditions. It serves as a starting point for further research and documents key sources and studies on the history of language, conceptions of language, and everyday communication in the context of multilingualism in early modern Europe. A bibliography of the titles listed in the table below is available for download{' '}
                    <a href={`${import.meta.env.BASE_URL}uploads/bibliography/FSLdigital_Sekundärliteratur_202606.pdf`} download className="text-red-600 font-semibold underline underline-offset-2 hover:text-red-800">here</a>.
                  </>
                )}
              </p>
            </div>

          </div>

          {/* ── Table section (full width) ── */}
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {!verified ? (
              <HumanGate
                lang={lang}
                onVerify={verify}
                message={{
                  en: 'Please confirm you are not an automated tool to view the table.',
                  de: 'Bitte bestätigen Sie, dass Sie kein automatisiertes Programm sind, um die Tabelle anzuzeigen.',
                }}
              />
            ) : loading ? (
              <p className="text-gray-600 text-center py-12">{lang === 'de' ? 'Wird geladen…' : 'Loading…'}</p>
            ) : error ? (
              <p className="text-red-600 text-center py-12">{error}</p>
            ) : (
              <div className="w-full">

                {/* ── Centered search ── */}
                <div className="flex flex-col items-center gap-2 mb-6">
                  <div className="relative w-full max-w-lg">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input
                      type="search"
                      value={search}
                      onChange={e => { setSearch(e.target.value); setShowAll(false); }}
                      placeholder={lang === 'de' ? 'Suche in allen Feldern…' : 'Search all fields…'}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    {sorted.length} {lang === 'de' ? 'Einträge' : 'entries'}
                    {search && ` ${lang === 'de' ? 'gefunden' : 'found'}`}
                  </span>
                </div>

                {/* ── Table ── */}
                <div className="overflow-auto rounded-xl shadow border border-gray-200" style={{ maxHeight: '75vh' }}>
                  <table className="w-full bg-white divide-y divide-gray-200 text-sm" style={{ minWidth: '1250px' }}>
                    <colgroup>
                      <col style={{ width: '160px' }} />
                      <col style={{ width: '80px' }} />
                      <col style={{ width: '260px' }} />
                      <col style={{ width: '160px' }} />
                      <col style={{ width: '180px' }} />
                      <col style={{ width: '90px' }} />
                      <col style={{ width: '60px' }} />
                      <col style={{ width: '70px' }} />
                      <col style={{ width: '110px' }} />
                      <col style={{ width: '90px' }} />
                    </colgroup>
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        {COLUMNS.map(col => (
                          <th
                            key={col.key}
                            onClick={() => requestSort(col.key)}
                            className="px-4 py-3 text-left font-semibold text-gray-700 cursor-pointer select-none whitespace-nowrap hover:bg-gray-100 border-b border-gray-200"
                            aria-sort={sortKey === col.key ? sortDir : 'none'}
                          >
                            {col.label[lang as 'en' | 'de']}
                            <SortIcon col={col.key} sortKey={sortKey} sortDir={sortDir} />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sorted.length === 0 ? (
                        <tr>
                          <td colSpan={COLUMNS.length} className="px-4 py-8 text-center text-gray-400">
                            {lang === 'de' ? 'Keine Einträge gefunden.' : 'No entries found.'}
                          </td>
                        </tr>
                      ) : visibleRows.map((entry, idx) => {
                        const doi     = sanitizeText(entry['DOI'] || '');
                        const doiHref = getDoiHref(doi);
                        const doiText = getDoiText(doi);
                        return (
                          <tr key={idx} className={`align-top ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors`}>
                            <td className="px-4 py-3 text-gray-800">{renderNameList(sanitizeText(entry['Author'] || ''))}</td>
                            <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                              {sanitizeText(entry['Publication Year'] || '') || <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-justify text-gray-900 break-words">
                              {sanitizeText(entry['Title'] || '') || <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-800">{renderNameList(sanitizeText(entry['Editor'] || ''))}</td>
                            <td className="px-4 py-3 text-gray-700 break-words">
                              {sanitizeText(entry['Publication Title'] || '') || <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                              {sanitizeText(entry['Pages'] || '') || <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                              {sanitizeText(entry['Issue'] || '') || <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                              {sanitizeText(entry['Volume'] || '') || <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              {sanitizeText(entry['Place'] || '')
                                ? sanitizeText(entry['Place']).split(',').map((p, i) => (
                                    <span key={i} className="block">{p.trim()}</span>
                                  ))
                                : <span className="text-gray-300">—</span>}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {doiHref ? (
                                <a
                                  href={doiHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={doiText}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-medium transition-colors"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                  DOI
                                </a>
                              ) : (
                                <span className="text-gray-300">—</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* ── Show full table button ── */}
                {!showAll && sorted.length > PREVIEW_ROWS && (
                  <div className="flex flex-col items-center mt-6 gap-2">
                    <p className="text-sm text-gray-500">
                      {lang === 'de'
                        ? `Zeige ${PREVIEW_ROWS} von ${sorted.length} Einträgen`
                        : `Showing ${PREVIEW_ROWS} of ${sorted.length} entries`}
                    </p>
                    <button
                      onClick={() => setShowAll(true)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold shadow hover:opacity-90 transition-opacity"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                      {lang === 'de' ? 'Gesamte Tabelle anzeigen' : 'Show Full Table'}
                    </button>
                  </div>
                )}

                {showAll && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => { setShowAll(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-sm text-gray-500 hover:text-primary underline underline-offset-2"
                    >
                      {lang === 'de' ? '↑ Weniger anzeigen' : '↑ Show less'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Bibliography;
