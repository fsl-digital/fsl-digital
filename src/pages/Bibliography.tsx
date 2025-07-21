import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Improved CSV parser to handle quoted fields with commas
function parseCSV(text: string) {
  const lines = text.trim().split('\n');
  // Strip quotes from header names
  const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''));
  return lines.slice(1)
    .map(line => {
      // Split by comma, but ignore commas inside quotes
      const cells = [];
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}lovable-uploads/bibliography/zotero/bibliography.csv`)
      .then(res => res.text())
      .then(text => {
        console.log('CSV raw text:', text); // Debug
        const parsed = parseCSV(text);
        console.log('Parsed CSV:', parsed); // Debug
        setEntries(parsed);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load bibliography.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="flex-1 flex flex-col items-center justify-center py-16">
        <h1 className="text-4xl font-bold text-center mb-12">{lang === 'de' ? 'Bibliographie' : 'Bibliography'}</h1>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : entries.length === 0 ? (
          <p className="text-gray-600">No bibliography entries found.</p>
        ) : (
          <div className="overflow-x-auto w-full max-w-4xl mx-auto">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Author</th>
                  <th className="border px-4 py-2">Year</th>
                  <th className="border px-4 py-2">Title</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{entry.author}</td>
                    <td className="border px-4 py-2">{entry.year}</td>
                    <td className="border px-4 py-2">{entry.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Bibliography; 