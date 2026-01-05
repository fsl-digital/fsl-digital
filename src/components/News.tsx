import React, { useEffect, useState } from 'react';
import { Calendar, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItemProps {
  title: string;
  date: string;
  type: 'event' | 'publication' | 'award';
  description: string;
  link?: string;
  showMoreText?: string;
}

const NewsItem = ({ title, date, type, description, link, showMoreText }: NewsItemProps) => {
  const getIcon = () => {
    switch (type) {
      case 'event':
        return <Calendar className="text-secondary" size={20} />;
      case 'publication':
        return <BookIcon className="text-secondary" size={20} />;
      case 'award':
        return <Award className="text-secondary" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-0">
      <div className="flex items-center space-x-2 mb-2">
        {getIcon()}
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-primary underline hover:text-secondary mt-2"
        >
          {showMoreText ?? 'Show more'}
        </a>
      )}
    </div>
  );
};

const BookIcon = (props: React.ComponentProps<typeof Users>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

interface NewsProps {
  lang?: 'en' | 'de';
}

const News = ({ lang = 'en' }: NewsProps) => {
  const [upcomingEvents, setUpcoming] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const showMoreText = lang === 'en' ? 'Show more' : 'Mehr erfahren';

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}uploads/news/news_${lang}.csv`)
      .then(res => res.text())
      .then(text => {
        const sanitize = (s: string) => (s || '')
          .replace(/\\"/g, '"')
          .replace(/^"|"$/g, '')
          .replace(/\\n/g, '\n')
          .replace(/\\r/g, '\r');
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/^"|"$/g, ''));
        const rows = lines.slice(1).map(line => {
          const cells: string[] = []; let cur = ''; let q = false;
          for (let i = 0; i < line.length; i++) { const ch = line[i]; if (ch === '"') q = !q; else if (ch === ',' && !q) { cells.push(cur); cur = ''; } else { cur += ch; } }
          cells.push(cur);
          return Object.fromEntries(cells.map((c, i) => [headers[i], sanitize(c)]));
        });
        const today = new Date().toISOString().slice(0,10);
        const upcoming = rows.filter(r => (r.start_date || '') >= today)
          .sort((a,b) => (a.start_date||'').localeCompare(b.start_date||''))
          .slice(0, 2)
          .map(r => ({
            title: sanitize(r.title),
            date: r.display_date || r.start_date,
            type: r.type as any,
            description: sanitize(r.desc || ''),
            link: sanitize(r.link || '').trim()
          }));
        setUpcoming(upcoming);
        setLoading(false);
      })
      .catch(() => { setError('Failed to load news.'); setLoading(false); });
  }, [lang]);

  return (
    <section id="news" className="py-20">
      <div className="container-custom">
        <h2 className="section-title text-center">{lang === 'en' ? 'News' : 'Ankündigung'}</h2>
        <p className="section-subtitle text-center mx-auto">
          {lang === 'en' 
            ? (<span>Follow us on <a href="https://www.instagram.com/fsl_digital/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-secondary">Instagram</a> for more news</span>)
            : 'Bleiben Sie auf dem Laufenden über unsere kommenden Veranstaltungen'}
        </p>
        
        <div className="max-w-3xl mx-auto mt-12">
          {loading ? (
            <p className="text-gray-600 text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : (
            upcomingEvents.map((item, index) => (
              <NewsItem
                key={index}
                title={item.title}
                date={item.date}
                type={item.type}
                description={item.description}
                link={item.link}
                showMoreText={showMoreText}
              />
            ))
          )}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/news" className="btn-outline">
            {lang === 'en' ? 'View All Events' : 'Alle Veranstaltungen anzeigen'}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default News;
