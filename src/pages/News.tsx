import React, { useEffect, useState } from 'react';
import { Calendar, Users, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { parseCsv, sanitizeText } from '@/lib/csv';
// import { getUpcomingEvents, getPastEvents } from '@/data/events';

interface NewsItemProps {
  title: string;
  date: string;
  type: 'event' | 'publication' | 'award';
  description: string;
  link?: string;
  showMoreText?: string;
  isPast?: boolean;
}

const NewsItem = ({ title, date, type, description, link, showMoreText = 'Show more', isPast = false }: NewsItemProps) => {
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
    <div className={`border-b border-gray-200 pb-6 mb-6 last:border-0 ${isPast ? 'text-gray-500' : ''}`}>
      <div className="flex items-center space-x-2 mb-2">
        {getIcon()}
        <span className={`text-sm ${isPast ? 'text-gray-400' : 'text-gray-500'}`}>{date}</span>
      </div>
      <h3 className={`text-xl font-bold mb-2 whitespace-pre-line ${isPast ? 'text-gray-600' : ''}`}>{title}</h3>
      <p className={`whitespace-pre-line ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>{description}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-primary underline hover:text-secondary mt-2"
        >
          {showMoreText}
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
  setLang?: (lang: 'en' | 'de') => void;
}

const News = ({ lang = 'en', setLang }: NewsProps) => {
  const [upcomingEvents, setUpcoming] = useState<any[]>([]);
  const [pastEvents, setPast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}uploads/news/news_${lang}.csv`)
      .then(res => res.text())
      .then(text => {
        const rows = parseCsv(text);
        const today = new Date().toISOString().slice(0,10);
        const upcoming = rows.filter(r => (r.start_date || '') >= today)
          .sort((a,b) => (a.start_date||'').localeCompare(b.start_date||''));
        const past = rows.filter(r => (r.start_date || '') < today)
          .sort((a,b) => (b.start_date||'').localeCompare(a.start_date||''));
        setUpcoming(upcoming.map(r => ({
          title: sanitizeText(r.title),
          date: r.display_date || r.start_date,
          type: r.type as any,
          description: sanitizeText(r.desc || ''),
          link: sanitizeText(r.link || '').trim(),
        })));
        setPast(past.map(r => ({
          title: sanitizeText(r.title),
          date: r.display_date || r.start_date,
          type: r.type as any,
          description: sanitizeText(r.desc || ''),
          link: sanitizeText(r.link || '').trim(),
        })));
        setLoading(false);
      })
      .catch(() => { setError('Failed to load news.'); setLoading(false); });
  }, [lang]);

  const showMoreText = lang === 'en' ? 'Show more' : 'Mehr erfahren';
  const pageText = {
    en: {
      title: 'News & Events',
      intro:
        'Current announcements, talks, workshops, project presentations, and event reports from the FSL digital network. This page provides an overview of upcoming dates and documents recent activities from the project context.',
      upcoming: 'Upcoming FSL Events',
      past: 'Past Events',
    },
    de: {
      title: 'Neuigkeiten & Veranstaltungen',
      intro:
        'Ankündigungen zum Vorhaben – von Veranstaltungen über neue Kooperationen bis zu technischen Entwicklungen. Hier informieren wir regelmäßig über Neuigkeiten, Termine und Fortschritte aus der Forschung und unserem Netzwerk.',
      upcoming: 'Kommende FSL-Veranstaltungen',
      past: 'Vergangene Veranstaltungen',
    },
  } as const;
  const currentText = pageText[lang];

  return (
    <div className="min-h-screen">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">
              {currentText.title}
            </h1>

            <div className="bg-gray-50 border-l-4 border-primary p-8 mb-12 rounded-r-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentText.intro}
              </p>
            </div>

            {loading ? (
              <p className="text-gray-600 text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-600 text-center">{error}</p>
            ) : (
              <>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    {currentText.upcoming}
                  </h2>
                  <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                    {upcomingEvents.length ? (
                      upcomingEvents.map((item, index) => (
                        <NewsItem
                          key={`upcoming-${index}`}
                          title={item.title}
                          date={item.date}
                          type={item.type}
                          description={item.description}
                          link={item.link}
                          showMoreText={showMoreText}
                        />
                      ))
                    ) : (
                      <p className="text-gray-600 text-center">
                        {lang === 'en' ? 'No upcoming events.' : 'Keine kommenden Veranstaltungen.'}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    {currentText.past}
                  </h2>
                  <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                    {pastEvents.length ? (
                      pastEvents.map((item, index) => (
                        <NewsItem
                          key={`past-${index}`}
                          title={item.title}
                          date={item.date}
                          type={item.type}
                          description={item.description}
                          isPast={true}
                          link={item.link}
                          showMoreText={showMoreText}
                        />
                      ))
                    ) : (
                      <p className="text-gray-600 text-center">
                        {lang === 'en' ? 'No past events.' : 'Keine vergangenen Veranstaltungen.'}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default News; 
