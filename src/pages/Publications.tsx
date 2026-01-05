import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function parseCSV(text: string) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''));
  return lines.slice(1)
    .map(line => {
      const cells: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') {
          inQuotes = !inQuotes;
        } else if (ch === ',' && !inQuotes) {
          cells.push(current);
          current = '';
        } else {
          current += ch;
        }
      }
      cells.push(current);
      return cells;
    })
    .filter(row => row.length === headers.length && !row.every(cell => cell === 'NONE'))
    .map(row => Object.fromEntries(row.map((cell, i) => [headers[i], cell.replace(/^"|"$/g, '')])));
}

const Publications = ({ lang = 'en', setLang }) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const primaryUrl = `${import.meta.env.BASE_URL}uploads/publications/publications_${lang}.csv`;
    const secondaryUrl = `${import.meta.env.BASE_URL}uploads/publications/publications_${lang === 'en' ? 'de' : 'en'}.csv`;

    fetch(primaryUrl)
      .then(res => res.text())
      .then(async text => {
        const primary = parseCSV(text);
        // If any entries miss title or venue, try to fill from the other language CSV by matching authors+year
        const needsFallback = primary.some(p => !p.title || !p.venue);
        let merged = primary;
        if (needsFallback) {
          try {
            const altText = await fetch(secondaryUrl).then(r => r.text());
            const secondary = parseCSV(altText);
            const key = (r:any) => `${(r.authors||'').trim()}|${(r.year||'').trim()}`;
            const secMap = new Map(secondary.map(r => [key(r), r]));
            merged = primary.map(p => {
              if (p.title && p.venue) return p;
              const k = key(p);
              const s = secMap.get(k);
              return {
                ...p,
                title: p.title || (s?.title || ''),
                venue: p.venue || (s?.venue || ''),
              };
            });
          } catch {}
        }
        const sorted = merged.sort((a, b) => (b.year || '').localeCompare(a.year || ''));
        setItems(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load publications.');
        setLoading(false);
      });
  }, [lang]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">{lang === 'en' ? 'FSL Project Publications' : 'FSL-Projektveröffentlichung'}</h1>
            {loading ? (
              <p className="text-gray-600 text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-600 text-center">{error}</p>
            ) : (
              <ul className="text-lg text-gray-700 list-disc pl-8 max-w-3xl text-left mx-auto space-y-3">
                {items.map((p, idx) => {
                  const title = (p.title || '').trim();
                  const venue = (p.venue || '').trim();
                  const year = p.year ? ` (${p.year})` : '';
                  const note = p.note ? ` ${p.note}` : '';
                  const hasDetail = !!(title || venue || note);
                  const prefix = `${p.authors || ''}${year}${hasDetail ? ':' : ''}`.trim();
                  const detailParts = [] as string[];
                  if (title) detailParts.push(`"${title}"`);
                  if (venue) detailParts.push(venue);
                  const detail = detailParts.join('. ');
                  const htmlLine = [prefix, detail].filter(Boolean).join(' ').trim() + note;
                  const detailEl = (
                    <span dangerouslySetInnerHTML={{ __html: htmlLine }} />
                  );
                  const doiRaw = p.doi?.trim();
                  const doiIsLink = doiRaw ? doiRaw.startsWith('https://doi.org/') : false;
                  return (
                    <li key={idx}>
                      {p.url ? (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-700"
                          dangerouslySetInnerHTML={{ __html: htmlLine }}
                        />
                      ) : (
                        detailEl
                      )}
                      {doiRaw && (
                        <span className="ml-2 text-sm text-gray-500">
                          DOI:{' '}
                          {doiIsLink ? (
                            <a
                              href={doiRaw}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {doiRaw}
                            </a>
                          ) : (
                            doiRaw
                          )}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Publications; 
