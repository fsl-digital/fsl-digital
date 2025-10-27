import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Concept = ({ lang = 'en', setLang }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        {lang === 'de' ? (
          <section className="py-20 w-full">
            <div className="container-custom">
              {/* Hero */}
              <div className="text-center mb-12">
                <h1 className="section-title">Konzept</h1>
                <p className="section-subtitle mx-auto">
                  Ziele und Korpus des Projekts in der Übersicht.
                </p>
              </div>

              {/* Content cards */}
              <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                <article className="bg-white rounded-xl shadow border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-6 bg-primary rounded" />
                    <h2 className="text-2xl font-semibold">Ziele</h2>
                  </div>
                  <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                    <p>
                      Das Vorhaben will die praktischen Formen der Vermittlung des Wissens über die Volkssprachen vor allem der mündlichkeitsnahen Alltagskommunikation im mehrsprachigen Kontext des frühneuzeitlichen Europa anhand der Fremdsprachenlehrwerke (FSL) erschließen und untersuchen. Aus sprachhistorischer Perspektive lohnt die Untersuchung von Fremdsprachenlehrwerken deshalb, weil die vormodernen Vernakulare in ihrem schriftlichen Code gerade erst im Entstehen begriffen sind: Nicht nur zwischen Werken verschiedener Autoren, sondern auch innerhalb einzelner Sprachbücher lässt sich ein großer Variantenreichtum konstatieren, der die Notwendigkeit von Normierungsbemühungen unterstreicht, die im Vorhaben Gegenstand von Untersuchungen werden. Auch Neuauflagen liefern spannende Informationen über sprachhistorische Prozesse. Für einen breiten und ungehinderten Zugang sollen die Sprachbücher vollständig digitalisiert, nachhaltig aufbereitet, philologisch tief bearbeitet und für weitere wissenschaftliche Analysen bereitgestellt werden. Damit wird es möglich sein, die historischen Wurzeln der heutigen Mehrsprachigkeit in Europa aus der Perspektive alltagssprachlicher Praxis des Fremdsprachenerwerbs und der Fremdsprachen- und Wissensvermittlung in der Frühen Neuzeit zu ergründen.
                    </p>
                  </div>
                </article>

                <article className="bg-white rounded-xl shadow border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-6 bg-primary rounded" />
                    <h2 className="text-2xl font-semibold">Das Korpus</h2>
                  </div>
                  <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                    <p>
                      Das gesamte überlieferte Material, in dem das Deutsche als Ausgangs- oder Zielsprache auftritt, umfasst rund 1.000 Lehrwerke, deren Volltexte digital erfasst werden. Alle Werkteile werden durch eine Basisannotation erschlossen. Rund 400 FSL des Kernkorpus werden strukturell und inhaltlich annotiert, wobei die Mehrsprachigkeit durch parallele Textalignierung berücksichtigt wird. Lehrwerke zählen um Projektkorpus, wenn sie neben dem Deutschen mindestens ein weiteres Vernakular enthalten und im zeitliche Rahmen bis Ende des 17. Jahrhunderts erstmals erschienen waren. Ein weiteres Kriterium besteht in der dezidiert auf die Praxis der Sprachvermittlung ausgerichteten Konzeption. Die Werke erheben keinen sprachtheoretischen, sprachphilosophischen und/oder sprachpflegerischen Anspruch. Schließlich zählen keine reinen Grammatiken oder Wörterbücher zu den FSL, sondern es werden mindestens zwei Werkteile kombiniert.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>
        ) : (
          <section className="py-20 w-full">
            <div className="container-custom">
              {/* Hero */}
              <div className="text-center mb-12">
                <h1 className="section-title">Concept</h1>
                <p className="section-subtitle mx-auto">
                  Overview of the project’s goals and corpus.
                </p>
              </div>

              {/* Content cards */}
              <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                <article className="bg-white rounded-xl shadow border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-6 bg-primary rounded" />
                    <h2 className="text-2xl font-semibold">Goals</h2>
                  </div>
                  <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                    <p>
                      The project aims to identify and examine the practical forms in which knowledge about the vernacular languages—above all, everyday communication close to orality—was conveyed in the multilingual context of early modern Europe, using foreign-language textbooks (FSL) as its sources. From a historical‑linguistic perspective these textbooks are especially worthwhile objects of study because the pre‑modern vernaculars were only just emerging in written form: not only across the works of different authors, but also within individual textbooks, we find a high degree of variation that underscores the need for standardization efforts, which are themselves a subject of investigation in this project. New editions likewise provide valuable insights into language‑historical processes. To ensure broad and unhindered access, the textbooks will be fully digitized, sustainably processed, and subjected to in‑depth philological analysis, and then made available for further scholarly work. In this way it becomes possible to explore the historical roots of present‑day multilingualism in Europe from the perspective of everyday language practice in foreign‑language learning and in the transmission of language and knowledge in the early modern period.
                    </p>
                  </div>
                </article>

                <article className="bg-white rounded-xl shadow border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-1.5 h-6 bg-primary rounded" />
                    <h2 className="text-2xl font-semibold">The Corpus</h2>
                  </div>
                  <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                    <p>
                      The corpus comprises all surviving material in which German appears as source or target language—around 1,000 textbooks whose full texts will be captured digitally. All parts of the works will receive basic annotation. Around 400 FSL in the core corpus will be structurally and semantically annotated; multilinguality is addressed through parallel text alignment. A work is included in the project corpus if, alongside German, it contains at least one additional vernacular and first appeared by the end of the seventeenth century. Another criterion is a design explicitly oriented toward the practice of language teaching; the works do not claim to be contributions to language theory, philosophy of language, and/or language cultivation. Pure grammars or dictionaries are therefore not counted as FSL; at least two types of components are combined.
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Concept; 
