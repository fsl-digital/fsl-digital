import React from 'react';
import { Calendar, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewsItemProps {
  title: string;
  date: string;
  type: 'event' | 'publication' | 'award';
  description: string;
}

const NewsItem = ({ title, date, type, description }: NewsItemProps) => {
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

const News = ({ lang = 'en' }) => {
  const upcomingEvents = [
    {
      title: "International Workshop on Knowledge Extraction",
      date: "June 15-16, 2025",
      type: "event" as const,
      description: "Join us for our annual workshop bringing together researchers and practitioners in knowledge extraction."
    },
    {
      title: "Seminar Series: Knowledge Representation in Context",
      date: "March 1-30, 2025",
      type: "event" as const,
      description: "Weekly seminars exploring contextual factors in knowledge representation, with guest speakers from Europe and North America."
    }
  ];

  return (
    <section id="news" className="py-20">
      <div className="container-custom">
        <h2 className="section-title text-center">{lang === 'en' ? 'Announcement' : 'Ankündigung'}</h2>
        <p className="section-subtitle text-center mx-auto">
          {lang === 'en' 
            ? 'Stay up to date with our upcoming events'
            : 'Bleiben Sie auf dem Laufenden über unsere kommenden Veranstaltungen'}
        </p>
        
        <div className="max-w-3xl mx-auto mt-12">
          {upcomingEvents.map((item, index) => (
            <NewsItem
              key={index}
              title={item.title}
              date={item.date}
              type={item.type}
              description={item.description}
            />
          ))}
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
