import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cleanCsvRows, parseCsv, sanitizeInlineFormatting, sanitizeText } from '@/lib/csv';

function normalizeAuthorSortKey(authors: string | undefined) {
  return (authors || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLocaleLowerCase();
}

function normalizePublicationDashes(value: string) {
  return value
    // Non-breaking spaces from the CSV export prevent wrapping
    .replace(/\u00a0/g, ' ')
    .replace(/(\s)--(\s)/g, '$1–$2')
    .replace(/(\s)-(\s)/g, '$1–$2');
}

// Formats an author list as "Last, First; Last, First & Last, First", keeping a trailing "(eds.)"/"(Hg.)"
function formatAuthors(authors: string) {
  const match = authors.trim().match(/^(.*?)\s*(\([^)]*\))?$/);
  const list = match?.[1] || '';
  const suffix = match?.[2] || '';

  const names: string[] = [];
  list.split(/\s*[;&]\s*/).filter(Boolean).forEach((part) => {
    const pieces = part.split(/\s*,\s*/).filter(Boolean);
    if (pieces.length >= 2) {
      // "Last, First" optionally followed by ", First Last" co-authors
      names.push(`${pieces[0]}, ${pieces[1]}`);
      pieces.slice(2).forEach((name) => names.push(name));
    } else {
      names.push(part);
    }
  });

  const inverted = names.map((name) => {
    if (name.includes(',')) return name;
    const words = name.split(/\s+/);
    if (words.length < 2) return name;
    return `${words[words.length - 1]}, ${words.slice(0, -1).join(' ')}`;
  });

  const joined = inverted.length > 1
    ? `${inverted.slice(0, -1).join('; ')} & ${inverted[inverted.length - 1]}`
    : inverted[0] || '';
  return suffix ? `${joined} ${suffix}` : joined;
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
        const primary = cleanCsvRows(parseCsv(text));
        // If any entries miss title or venue, try to fill from the other language CSV by matching authors+year
        const needsFallback = primary.some(p => !p.title || !p.venue);
        let merged = primary;
        if (needsFallback) {
          try {
            const altText = await fetch(secondaryUrl).then(r => r.text());
            const secondary = cleanCsvRows(parseCsv(altText));
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
        const collator = new Intl.Collator(lang === 'de' ? 'de' : 'en', {
          numeric: true,
          sensitivity: 'base',
        });

        const sorted = merged.sort((a, b) => {
          const yearCompare = collator.compare(b.year || '', a.year || '');
          if (yearCompare !== 0) return yearCompare;

          const authorCompare = collator.compare(
            normalizeAuthorSortKey(a.authors),
            normalizeAuthorSortKey(b.authors),
          );
          if (authorCompare !== 0) return authorCompare;

          return collator.compare(a.title || '', b.title || '');
        });
        setItems(sorted);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load publications.');
        setLoading(false);
      });
  }, [lang]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">{lang === 'en' ? 'FSL Project Publications' : 'FSL-Projektveröffentlichungen'}</h1>
            {lang === 'en' && (
              <div className="mt-8 mb-12 bg-gray-50 border-l-4 border-primary p-8 rounded-r-lg text-left">
                <p className="text-lg leading-relaxed text-gray-700">
                  Academic publications from the FSL network in digital format: articles, anthologies, presentations, and project reports. This page provides an overview of publications presenting research findings from the project context.
                </p>
              </div>
            )}
            {lang === 'de' && (
              <div className="mt-8 mb-12 bg-gray-50 border-l-4 border-primary p-8 rounded-r-lg text-left">
                <p className="text-lg leading-relaxed text-gray-700">
                  Wissenschaftliche Beiträge aus dem Netzwerk von FSL digital: Aufsätze, Sammelbände, Vorträge und Projektberichte. Die Seite bietet einen Überblick über Veröffentlichungen von Forschungsergebnissen aus dem Projektkontext.
                </p>
              </div>
            )}
            {loading ? (
              <p className="text-gray-600 text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-600 text-center">{error}</p>
            ) : (
              <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                {items.map((p, idx) => {
                  const title = normalizePublicationDashes((p.title || '').trim());
                  const venue = normalizePublicationDashes((p.venue || '').trim());
                  const note = normalizePublicationDashes((p.note || '').trim());
                  const noteSuffix = note ? ` ${note}` : '';
                  const detailParts = [] as string[];
                  if (title) detailParts.push(title);
                  if (venue) detailParts.push(venue);
                  const detail = sanitizeInlineFormatting(`${detailParts.join('. ')}${noteSuffix}`.trim());
                  const doiRaw = sanitizeText(p.doi);
                  const urlRaw = sanitizeText(p.url);
                  // Only link real web addresses; anything else would route to a broken page
                  const url = /^https?:\/\//i.test(urlRaw) ? urlRaw : '';
                  const doiIsLink = doiRaw ? doiRaw.startsWith('https://doi.org/') : false;
                  return (
                    <article
                      key={idx}
                      className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0"
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-sm text-gray-500">
                        {p.year && <span>{sanitizeText(p.year)}</span>}
                        {p.authors && <span className="text-gray-700 font-medium whitespace-pre-line">{formatAuthors(sanitizeText(p.authors))}</span>}
                      </div>
                      <div className="text-lg text-gray-700 leading-relaxed break-words">
                        {url ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-700"
                            dangerouslySetInnerHTML={{ __html: detail }}
                          >
                          </a>
                        ) : (
                          <span dangerouslySetInnerHTML={{ __html: detail }} />
                        )}
                      </div>
                      {doiRaw && (
                        <div className="mt-3 text-sm text-gray-500 break-words">
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
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Publications; 
