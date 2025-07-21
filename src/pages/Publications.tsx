import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Publications = ({ lang = 'en', setLang }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">{lang === 'en' ? 'FSL Project Publications' : 'FSL-Projektveröffentlichung'}</h1>
            <ul className="text-lg text-gray-600 list-disc pl-8 max-w-3xl text-left mx-auto">
                <li>Büchler, Liv (i.E.): "Positionierungsbezogene Funktionen von man in Musterdialogen frühneuzeitlicher Fremdsprachenlehrwerke". In: Antje Dammel, Wolfgang Imo & Jens P. Lanwer (Hrsg.): Pronomengebrauch und stance taking (Studien zur Pragmatik). Tübingen: Narr.</li>
                <li>Filatkina, Natalia (2015): "Implicit Understandings. Was uns historische Sprachlehrbücher über Sprachbewusstsein und Sprachgebrauch verraten". In: Regula Schmidlin, Heike Behrens & Hans Bickel: Sprachgebrauch und Sprachbewusstsein. Berlin & New Yorck: De Gruyter.</li>
                <li>Hübner, Julia & Kerstin Roth (i.E.): "Was ist eigentlich normal? Sprachhistorische Perspektiven auf ein vielschichtiges Konzept". In: Zeitschrift für Literaturwissenschaft und Linguistik, Heft 2/26.</li>
                <li>Roth, Kerstin (i.E.): "Einblicke in den Schlüssel zur Polnischen und Teutschen Sprach von Jeremias Roter (1585–1630)". In: Sylvia Brockstieger, Krzysztof Zarski und Dirk Werle (Hrsg.): Identität in Sprache und Literatur. Räume und Konstellationen zwischen Schlesien und Kurpfalz. Wiesbaden.</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Publications; 