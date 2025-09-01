import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Corpus = ({ lang = 'en', setLang }) => {
  const content = {
    en: {
      title: "FSL Corpus",
      description: "The FSL digital corpus comprises a collection of multilingual textbooks from the period between the 15th and the end of the 17th century. These sources are characterised by the following criteria:",
      criteria: [
        "They contain German as one of the languages (object or meta language) and are located in the centre of Europe, which connects German language variants with borders to other European languages (Romance, Germanic, Slavic).",
        "They are not theory-based or language preservation-oriented works, but practical teaching materials for language instruction.",
        "The works are not purely grammar or dictionary texts, but combine at least two elements such as prefaces, pronunciation or orthography lessons, grammar, glossaries and sample dialogues."
      ],
      structureTitle: "The project corpus is structured by an extensive database in which all sources are bibliographically recorded. It consists of two parts:",
      coreCorpus: "Core corpus: Contains fully equipped FSLs that include all components (preface, grammar, glossary, sample dialogues). These works are deeply philologically annotated and form the 'clean' foundation of the corpus. They are prototypical for the source group.",
      expandedCorpus: "Expanded corpus: Takes intertextual connections into account by identifying sources in other languages (e.g. Latin sources). In addition, only works from the 18th century that are revised versions of earlier textbooks or follow in their tradition are included in order to ensure comparability and contextual relevance.",
      conclusion: "Furthermore, both corpus levels are framed by additional foreign language textbooks that extend the tradition in both the precursor and successor directions. However, these works are not the focus of the research, but serve exclusively as a framework that marks the openness and boundaries of the corpus.\n\nThis corpus provides a sound basis for philological analysis and contributes to understanding the development of foreign language teaching in Europe during the early modern period."
    },
    de: {
      title: "FSL Korpus",
      description: "Das FSL digital-Korpus umfasst eine Sammlung mehrsprachiger Lehrwerke aus dem Zeitraum vom 15. bis zum Ende des 17. Jahrhunderts. Diese Quellen zeichnen sich durch folgende Kriterien aus:",
      criteria: [
        "Sie enthalten Deutsch als eine der Sprachen (Objekt- oder Metasprache) und stehen im Zentrum Europas, was deutsche Sprachvarianten mit Grenzen zu anderen europäischen Sprachen (Romanisch, Germanisch, Slawisch) verbindet.",
        "Es handelt sich nicht um theoriebasierte oder sprachpflegeorientierte Werke, sondern um praktische Lehrmaterialien für die Sprachvermittlung.",
        "Die Werke sind keine reinen Grammatik- oder Wörterbuchtexte, sondern kombinieren mindestens zwei Elemente wie Vorreden, Aussprache- oder Orthographielehren, Grammatik, Glossare und Musterdialoge."
      ],
      structureTitle: "Das Projektkorpus wird durch eine umfangreiche Datenbank strukturiert, in der alle Quellen bibliographisch erfasst sind. Es besteht aus zwei Teilen:",
      coreCorpus: "Kernkorpus: Enthält vollständig ausgestattete FSL, die alle Komponenten (Vorrede, Grammatik, Glossar, Musterdialoge) umfassen. Diese Werke sind tief philologisch annotiert und bilden das \"saubere\" Fundament des Korpus. Sie stehen prototypisch für die Quellengruppe.",
      expandedCorpus: "Erweitertes Korpus: Berücksichtigt die intertextuellen Verflechtungen, indem die anderssprachigen Vorlagen (z. B. lateinische Quellen) ermittelt werden. Zudem werden aus dem 18. Jahrhundert nur die Werke aufgenommen, die überarbeitete Fassungen früherer Lehrwerke oder in deren Tradition stehen, um Vergleichbarkeit und Kontextbezug zu gewährleisten.",
      conclusion: "Darüber hinaus werden beide Korpusebenen von weiteren Fremdsprachenlehrwerken eingerahmt, die die Tradition sowohl in die Vorläufer- als auch in die Nachfolgerichtung erweitern. Diese Werke stehen jedoch nicht im Fokus der Forschung, sondern dienen ausschließlich als Rahmen, der die Offenheit und die Grenzen des Korpus markiert.\n\nDieses Korpus bietet eine fundierte Grundlage für die philologische Analyse und trägt dazu bei, die Entwicklung des Fremdsprachenunterrichts in Europa während der Frühen Neuzeit nachzuvollziehen."
    }
  };

  const currentContent = content[lang] || content.en;

  return (
    <div className="min-h-screen">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">
              {currentContent.title}
            </h1>
            
            {/* Abstract/Introduction */}
            <div className="bg-gray-50 border-l-4 border-primary p-8 mb-12 rounded-r-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {lang === 'en' ? 'Abstract' : 'Zusammenfassung'}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentContent.description}
              </p>
            </div>

            {/* Methodology Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {lang === 'en' ? 'Methodological Framework' : 'Methodischer Rahmen'}
              </h2>
              <div className="space-y-6">
                {currentContent.criteria.map((criterion, index) => (
                  <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed text-lg">{criterion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Corpus Architecture */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {lang === 'en' ? 'Corpus Architecture' : 'Korpus-Architektur'}
              </h2>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed text-center italic">
                {currentContent.structureTitle}
              </p>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Core Corpus */}
                <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {lang === 'en' ? 'Core Corpus' : 'Kernkorpus'}
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">{currentContent.coreCorpus}</p>
                  </div>
                </div>

                {/* Expanded Corpus */}
                <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {lang === 'en' ? 'Expanded Corpus' : 'Erweitertes Korpus'}
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">{currentContent.expandedCorpus}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Research Implications */}
            <div className="bg-gray-100 border border-gray-200 p-10 rounded-lg">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {lang === 'en' ? 'Research Implications' : 'Forschungsimplikationen'}
                </h2>
              </div>
              <div className="text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto">
                {currentContent.conclusion}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Corpus; 