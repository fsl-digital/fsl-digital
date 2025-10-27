import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getImagePath } from '@/lib/image-utils';

interface Props {
  lang?: 'en' | 'de';
  setLang?: (lang: 'en' | 'de') => void;
}

const Contact = ({ lang = 'en', setLang }: Props) => {
  const [zoomOpen, setZoomOpen] = useState(false);
  const openZoom = () => setZoomOpen(true);
  const closeZoom = () => setZoomOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-16">
          <div className="container-custom max-w-3xl">
            <h1 className="text-4xl font-bold text-center mb-6">
              {lang === 'de' ? 'Kontakt und Standorte' : 'Contact and Locations'}
            </h1>
            {lang === 'de' ? (
              <div className="prose max-w-none">
                <p>
                  Das Projekt wird gemeinsam von der Berlin-Brandenburgischen Akademie der Wissenschaften und der Akademie der Wissenschaften und der Literatur | Mainz getragen und besitzt Arbeitsstellen in Berlin, Hamburg und Darmstadt.
                </p>

                {/* Inline page image with caption under intro paragraph */}
                <div className="my-6 flex flex-col items-center">
                  <img
                    src={getImagePath('/uploads/contact.png')}
                    alt="Kontakt – Seitenfoto"
                    className="mx-auto w-auto max-w-full max-h-[360px] object-contain cursor-zoom-in"
                    onClick={openZoom}
                  />
                  <p className="text-xs text-gray-600 italic mt-2 text-center">Eigene Graphik CC BY-SA 4.0 | FSL digital</p>
                </div>
                <div className="grid grid-cols-1 gap-6 items-stretch">
                  <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-full">
                    <p className="mb-3 text-lg">📍 In Berlin liegt der Fokus auf der Korpusalignierung der Musterdialoge. Diese werden untersucht auf dem Gebiet der historischen Pragmatik, Soziolinguistik, Höflichkeit und Kommunikationskultur. Von hier aus wird außerdem die Zusammenarbeit koordiniert.</p>
                    <h2 className="text-xl font-semibold mb-3">Projektkoordination | Arbeitsstelle Berlin</h2>
                    <p>
                      Dr. Josephine Klingebeil-Schieke<br />
                      Berlin-Brandenburgische Akademie der Wissenschaften<br />
                      Jägerstraße 22/23<br />
                      10117 Berlin<br />
                      Tel.: +49 (0)30-20 370 360<br />
                      E-Mail: <a href="mailto:josephine.klingebeil-schieke@bbaw.de" className="text-primary underline">josephine.klingebeil-schieke@bbaw.de</a>
                    </p>
                  </div>

                  <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-full">
                    <p className="mb-3 text-lg">📍 In Darmstadt werden die Daten modelliert und die digitale Infrastruktur für die Erfassung entwickelt und gepflegt. Auf analytischer und Annotationsebene liegt der Fokus auf den Glossaren und Wörterbuchteilen.</p>
                    <h2 className="text-xl font-semibold mb-3">Arbeitsstelle Darmstadt</h2>
                    <p>
                      Dr. Luise Borek (aktuell vertreten von Elena Volkanovska)<br />
                      Technische Universität Darmstadt<br />
                      Institut für Sprach- und Literaturwissenschaft<br />
                      Residenzschloss 1<br />
                      64283 Darmstadt<br />
                      Tel.: +49 (0)6151 16 - 57407 / - 57411<br />
                      E-Mail: <a href="mailto:elena.volkanovska@tu-darmstadt.de" className="text-primary underline">elena.volkanovska@tu-darmstadt.de</a>
                    </p>
                  </div>

                  <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-full">
                    <p className="mb-3 text-lg">📍 In Hamburg wird schwerpunktmäßig auf Vorreden und Grammatikteile geschaut. Im Zentrum der Forschung stehen intertextuelle und überlieferungshistorische Aspekte des Gesamtkorpus.</p>
                    <h2 className="text-xl font-semibold mb-3">Arbeitsstelle Hamburg</h2>
                    <p>
                      Dr. Kerstin Roth und Miriam Hinterholzer<br />
                      Universität Hamburg<br />
                      Institut für Germanistik<br />
                      Von-Melle-Park 6, Postfach #15<br />
                      20146 Hamburg<br />
                      E-Mail: <a href="mailto:kerstin.roth@uni-hamburg.de" className="text-primary underline">kerstin.roth@uni-hamburg.de</a> / <a href="mailto:miriam.hinterholzer@uni-hamburg.de" className="text-primary underline">miriam.hinterholzer@uni-hamburg.de</a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="text-lg text-gray-700 mb-6">
                  The project is jointly run by the Berlin-Brandenburg Academy of Sciences and the Academy of Sciences and Literature Mainz and has jobs in Berlin, Hamburg and Darmstadt.
                </p>
                {/* Mirror image placement for EN as well */}
                <div className="my-6 flex flex-col items-center">
                  <img
                    src={getImagePath('/uploads/contact.png')}
                    alt="Contact – page photo"
                    className="mx-auto w-auto max-w-full max-h-[360px] object-contain cursor-zoom-in"
                    onClick={openZoom}
                  />
                  <p className="text-xs text-gray-600 italic mt-2 text-center">Eigene Graphik CC BY-SA 4.0 | FSL digital</p>
                </div>
                <div className="grid grid-cols-1 gap-6 items-stretch">
                  <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-full">
                    <p className="mb-3 text-lg">📍 In Berlin, the focus is on corpus alignment of the model dialogues. These are examined in the fields of historical pragmatics, sociolinguistics, politeness and communication culture. Collaboration is also coordinated from here.</p>
                    <h2 className="text-xl font-semibold mb-3">Project Coordination | Berlin Office</h2>
                    <p className="text-gray-700">
                      Dr. Josephine Klingebeil-Schieke<br />
                      Berlin-Brandenburg Academy of Sciences and Humanities (BBAW)<br />
                      Jägerstraße 22/23<br />
                      10117 Berlin<br />
                      Tel.: +49 (0)30-20 370 360<br />
                      Email: <a href="mailto:josephine.klingebeil-schieke@bbaw.de" className="text-primary underline">josephine.klingebeil-schieke@bbaw.de</a>
                    </p>
                  </div>
                  <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-full">
                    <p className="mb-3 text-lg">📍 In Darmstadt, the data are modelled and the digital infrastructure for data capture is developed and maintained. On the analytical and annotation level, the focus is on the glossaries and dictionary sections.</p>
                    <h2 className="text-xl font-semibold mb-3">Darmstadt Office</h2>
                    <p className="text-gray-700">
                      Dr. Luise Borek (currently represented by Elena Volkanovska)<br />
                      Technische Universität Darmstadt<br />
                      Institute of Linguistics and Literary Studies<br />
                      Residenzschloss 1<br />
                      64283 Darmstadt<br />
                      Tel.: +49 (0)6151 16 - 57407 / - 57411<br />
                      Email: <a href="mailto:elena.volkanovska@tu-darmstadt.de" className="text-primary underline">elena.volkanovska@tu-darmstadt.de</a>
                    </p>
                  </div>
                  <div className="bg-white rounded-xl shadow border border-gray-200 p-6 h-full">
                    <p className="mb-3 text-lg">📍 In Hamburg, the emphasis is on prefaces and grammatical sections. The research centers on intertextual and transmission-historical aspects of the entire corpus.</p>
                    <h2 className="text-xl font-semibold mb-3">Hamburg Office</h2>
                    <p className="text-gray-700">
                      Dr. Kerstin Roth and Miriam Hinterholzer<br />
                      Universität Hamburg<br />
                      Department of German Studies<br />
                      Von-Melle-Park 6, P.O. Box #15<br />
                      20146 Hamburg<br />
                      Email: <a href="mailto:kerstin.roth@uni-hamburg.de" className="text-primary underline">kerstin.roth@uni-hamburg.de</a> / <a href="mailto:miriam.hinterholzer@uni-hamburg.de" className="text-primary underline">miriam.hinterholzer@uni-hamburg.de</a>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
        {zoomOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeZoom();
            }}
          >
            <div className="relative p-2">
              <button
                className="absolute -top-4 -right-4 text-white text-3xl bg-black bg-opacity-60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80"
                onClick={closeZoom}
                aria-label="Close"
              >
                ×
              </button>
              <img
                src={getImagePath('/uploads/contact.png')}
                alt="zoomed contact"
                className="max-w-[90vw] max-h-[80vh] object-contain bg-white rounded shadow-lg"
              />
              <p className="text-center text-sm text-gray-300 mt-3">Eigene Graphik CC BY-SA 4.0 | FSL digital</p>
            </div>
          </div>
        )}
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Contact;
