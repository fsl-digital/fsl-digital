import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import News from '@/components/News';
import Footer from '@/components/Footer';

const Index = ({ lang, setLang }) => {
  return (
    <div className="min-h-screen">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <Hero lang={lang} />
        <News lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Index;
