import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Publications = ({ lang = 'en', setLang }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="flex-1 flex flex-col items-center justify-center py-16">
        <h1 className="text-4xl font-bold mb-4">{lang === 'de' ? 'Publikation' : 'Publications'}</h1>
        <p className="text-lg text-gray-600">{lang === 'de' ? 'Hier kommen später die Publikationen.' : 'Publications page content goes here.'}</p>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Publications; 