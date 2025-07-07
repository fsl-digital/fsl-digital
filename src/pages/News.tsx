import React, { useEffect } from 'react';
import { Calendar, Users, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getUpcomingEvents, getPastEvents } from '@/data/events';

interface NewsItemProps {
  title: string;
  date: string;
  type: 'event' | 'publication' | 'award';
  description: string;
  isPast?: boolean;
}

const NewsItem = ({ title, date, type, description, isPast = false }: NewsItemProps) => {
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
      <h3 className={`text-xl font-bold mb-2 ${isPast ? 'text-gray-600' : ''}`}>{title}</h3>
      <p className={`${isPast ? 'text-gray-500' : 'text-gray-600'}`}>{description}</p>
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const upcomingEvents = getUpcomingEvents(lang);
  const pastEvents = getPastEvents(lang);

  return (
    <div className="min-h-screen">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">
              {lang === 'en' ? 'News & Events' : 'Nachrichten & Veranstaltungen'}
            </h1>
            
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">
                {lang === 'en' ? 'Upcoming FSL Events' : 'Kommende FSL-Veranstaltungen'}
              </h2>
              {upcomingEvents.map((item, index) => (
                <NewsItem
                  key={`upcoming-${index}`}
                  title={item.title}
                  date={item.date}
                  type={item.type}
                  description={item.description}
                />
              ))}

              <h2 className="text-2xl font-bold mb-6 mt-12">
                {lang === 'en' ? 'Past Events' : 'Vergangene Veranstaltungen'}
              </h2>
              {pastEvents.map((item, index) => (
                <NewsItem
                  key={`past-${index}`}
                  title={item.title}
                  date={item.date}
                  type={item.type}
                  description={item.description}
                  isPast={true}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default News; 