import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Improved CSV parser to handle quoted fields with commas
function parseCSV(text: string) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''));
  return lines.slice(1)
    .map(line => {
      const cells: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          cells.push(current);
          current = '';
        } else {
          current += char;
        }
      }
      cells.push(current);
      return cells;
    })
    .filter(row => row.length === headers.length && !row.every(cell => cell === 'NONE'))
    .map(row => Object.fromEntries(row.map((cell, i) => [headers[i], cell.replace(/^"|"$/g, '')])));
}

const Bibliography = ({ lang = 'en', setLang }) => {
  const [entries, setEntries] = useState<any[]>([]);
  const [sortKey, setSortKey] = useState<string>('Author');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [maskLinks, setMaskLinks] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError('');
    const file = `bibliography_${lang}.csv`;
    fetch(`${import.meta.env.BASE_URL}uploads/bibliography/zotero/${file}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.text();
      })
      .then(text => {
        const parsed = parseCSV(text);
        setEntries(parsed);
        setLoading(false);
      })
      .catch(() => {
        setError(lang === 'de' ? 'Bibliographie konnte nicht geladen werden.' : 'Failed to load bibliography.');
        setLoading(false);
      });
  }, [lang]);

  const labels = lang === 'de'
    ? { author: 'Autor', year: 'Publikationsjahr', title: 'Titel', doi: 'DOI', url: 'URL', mask: 'DOI/URL verbergen', show: 'DOI/URL anzeigen', openDoi: 'DOI öffnen', openUrl: 'Link öffnen' }
    : { author: 'Author', year: 'Publication Year', title: 'Title', doi: 'DOI', url: 'URL', mask: 'Hide DOI/URL', show: 'Show DOI/URL', openDoi: 'Open DOI', openUrl: 'Open Link' };

  const getDoiLink = (doi: string) => {
    if (!doi) return '';
    const cleaned = doi.replace(/^DOI:\s*/i, '').trim();
    if (!cleaned) return '';
    // If it already looks like a URL, use it; otherwise prefix with doi.org
    return cleaned.startsWith('http') ? cleaned : `https://doi.org/${cleaned}`;
  };

  const getDoiText = (doi: string) => {
    if (!doi) return '';
    return doi
      .replace(/^DOI:\s*/i, '')
      .replace(/https?:\/\/(dx\.)?doi\.org\//i, '')
      .trim();
  };

  const renderAuthors = (author: string) => {
    if (!author) return '';
    const parts = author.split(';');
    return (
      <span className="whitespace-pre-wrap">
        {parts.map((p, i) => (
          <span key={i}>
            {p.trim()}
            {i < parts.length - 1 ? <><br /></> : null}
          </span>
        ))}
      </span>
    );
  };

  const requestSort = (key: string) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        return prev;
      }
      setSortDir('asc');
      return key;
    });
  };

  const getCellValue = (row: any, key: string) => {
    if (key === 'Publication Year') {
      const n = parseInt(row[key], 10);
      return isNaN(n) ? null : n;
    }
    return (row[key] || '').toString().toLowerCase();
  };

  const sortedEntries = React.useMemo(() => {
    const data = [...entries];
    const dir = sortDir === 'asc' ? 1 : -1;
    return data.sort((a, b) => {
      const av = getCellValue(a, sortKey);
      const bv = getCellValue(b, sortKey);

      const aEmpty = av === '' || av === null;
      const bEmpty = bv === '' || bv === null;
      if (aEmpty && !bEmpty) return 1;
      if (!aEmpty && bEmpty) return -1;
      if (aEmpty && bEmpty) return 0;

      if (typeof av === 'number' && typeof bv === 'number') {
        return (av - bv) * dir;
      }
      return (av as string).localeCompare(bv as string) * dir;
    });
  }, [entries, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: string }) => (
    <span className={`ml-1 inline-block text-xs ${sortKey === col ? 'opacity-100' : 'opacity-40'}`}>
      {sortKey === col ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">
              {lang === 'de' ? 'Projektbibliographie' : 'Project Bibliography'}
            </h1>
            {loading ? (
              <p className="text-gray-600 text-center mb-6">Loading...</p>
            ) : error ? (
              <p className="text-red-600 text-center mb-6">{error}</p>
            ) : entries.length === 0 ? (
              <p className="text-gray-600 text-center mb-6">No bibliography entries found.</p>
            ) : (
              <div className="w-full max-w-6xl mx-auto">
                <div className="flex items-center justify-end mb-3 px-1">
                  <button
                    type="button"
                    onClick={() => setMaskLinks(v => !v)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                    aria-pressed={!maskLinks}
                    aria-label={maskLinks ? labels.show : labels.mask}
                  >
                    <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: maskLinks ? '#6B7280' : '#10B981' }} />
                    {maskLinks ? labels.show : labels.mask}
                  </button>
                </div>
                <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
                  <table className="min-w-full table-fixed bg-white divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none w-64 whitespace-nowrap" onClick={() => requestSort('Author')} aria-sort={sortKey === 'Author' ? sortDir : 'none'}>
                          {labels.author}<SortIcon col="Author" />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none w-28 whitespace-nowrap" onClick={() => requestSort('Publication Year')} aria-sort={sortKey === 'Publication Year' ? sortDir : 'none'}>
                          {labels.year}<SortIcon col="Publication Year" />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none w-1/2 whitespace-nowrap" onClick={() => requestSort('Title')} aria-sort={sortKey === 'Title' ? sortDir : 'none'}>
                          {labels.title}<SortIcon col="Title" />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none w-36 whitespace-nowrap" onClick={() => requestSort('DOI')} aria-sort={sortKey === 'DOI' ? sortDir : 'none'}>
                          {labels.doi}<SortIcon col="DOI" />
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none w-36 whitespace-nowrap" onClick={() => requestSort('Url')} aria-sort={sortKey === 'Url' ? sortDir : 'none'}>
                          {labels.url}<SortIcon col="Url" />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {sortedEntries.map((entry, idx) => {
                        const author = entry['Author'] || '';
                        const year = entry['Publication Year'] || '';
                        const title = entry['Title'] || '';
                        const doi = entry['DOI'] || '';
                        const url = entry['Url'] || '';
                        const doiHref = getDoiLink(doi);
                        const doiText = getDoiText(doi);
                        return (
                        <tr key={idx} className="align-top hover:bg-gray-50">
                          <td className="px-4 py-3 text-gray-800 w-64">{renderAuthors(author)}</td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap w-28">{year}</td>
                          <td className="px-4 py-3 text-gray-900 whitespace-pre-wrap break-words w-1/2">{title}</td>
                          <td className="px-4 py-3 w-36">
                            {doiHref ? (
                              maskLinks ? (
                                <a href={doiHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2 py-1 text-sm rounded bg-blue-50 text-blue-700 hover:bg-blue-100">
                                  {labels.openDoi}
                                </a>
                              ) : (
                                <a href={doiHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2 py-1 text-sm rounded bg-blue-50 text-blue-700 hover:bg-blue-100 break-all">
                                  {doiText}
                                </a>
                              )
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3 w-36">
                            {url ? (
                              maskLinks ? (
                                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2 py-1 text-sm rounded bg-green-50 text-green-700 hover:bg-green-100">
                                  {labels.openUrl}
                                </a>
                              ) : (
                                <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2 py-1 text-sm rounded bg-green-50 text-green-700 hover:bg-green-100 break-all">
                                  {url}
                                </a>
                              )
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
