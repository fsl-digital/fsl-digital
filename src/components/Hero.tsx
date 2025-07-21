import React, { useState, useEffect, useRef } from 'react';
import { getImagePath } from '@/lib/image-utils';

const content = {
  en: {
    heading: (
      <>
        <span className="block text-center mb-1 text-5xl font-bold text-gray-800">Historical Foreign Language Textbooks digital</span>
        <span className="text-lg block text-center mt-1 mb-3 text-gray-600">Language history, language attitudes and everyday communication in the context of multilingualism in Early Modern Europe</span>
        <br />
        <span className="text-3xl font-bold text-center block">Fremd <span className="text-red-600">|</span> Sprachen <span className="text-blue-900">|</span> Lehrwerke</span>
      </>
    ),
    description: "This long-term project is the first to focus on full-text indexing, corpus linguistic processing, annotation, digital networking, and the linguistic, cultural, and historical evaluation of multilingual foreign language textbooks (FSL) from the early modern period, with a focus on works containing German. The project aims to develop practical methods for teaching knowledge about vernacular languages (pronunciation, grammar, vocabulary, pragmatics) as well as written and, above all, spoken language. The project aims to explore and examine the practical forms of teaching knowledge about vernacular languages (pronunciation, grammar, vocabulary, pragmatics) as well as written and, above all, oral everyday communication in the multilingual context of early modern Europe. In this way, a paradigm shift is sought insofar as a contribution is made to European language history, to research on language contact, and to foreign language acquisition based on sources that have been handed down throughout Europe but have hardly been studied to date, whose authors formed a socially heterogeneous group of so-called language masters and whose practical ideas about language (in contrast to contemporary theoretical scholarly discourse) have hardly been researched. As part of the project, all surviving material in which German is one of the languages (approx. 1044 FSL; approx. 626,400,000 characters in total) will be a tiered concept, sustainably processed, and made available for further analysis. This will make it possible for the first time to answer questions about the historical roots of today's multilingualism in Europe from the perspective of everyday language practice in foreign language acquisition and foreign language and knowledge transmission in the early modern period."
  },
  de: {
    heading: (
      <>
        <span className="block text-center mb-1 text-5xl font-bold text-gray-800">Historische Fremdsprachenlehrwerke digital</span>
        <span className="text-lg block text-center mt-1 mb-3 text-gray-600">Sprachgeschichte, Sprachvorstellungen und Alltagskommunikation im Kontext der Mehrsprachigkeit im Europa der Frühen Neuzeit</span>
        <br />
        <span className="text-3xl font-bold text-center block">Fremd <span className="text-red-600">|</span> Sprachen <span className="text-blue-900">|</span> Lehrwerke</span>
      </>
    ),
    description: "Das Langzeitvorhaben widmet sich erstmalig der Volltexterschließung, korpuslinguistischen Aufbereitung, Annotation, digitalen Vernetzung sowie der sprach-, kultur- und wissenshistorischen Auswertung von mehrsprachigen Fremdsprachenlehrwerken (FSL) aus der Frühen Neuzeit mit einem Schwerpunkt auf den Deutsch beinhaltenden Werken. Das Projekt setzt sich zum Ziel, die praktischen Formen der Vermittlung des Wissens über die Vernakularsprachen (Aussprache, Grammatik, Wortschatz, Pragmatik) sowie der schriftlichen und vor allem der mündlichkeitsnahen Alltagskommunikation im mehrsprachigen Kontext des frühneuzeitlichen Europa zu erschließen und zu untersuchen. Auf diese Weise wird ein Paradigmenwechsel angestrebt, insofern als ein Beitrag zu den europäischen Sprach(en)geschichte(n), zur Erforschung von Sprachkontakt und zum Fremdsprachenerwerb anhand der im gesamten Europa überlieferten, aber bis jetzt kaum untersuchten Quellen geleistet wird, deren Autoren eine sozial heterogene Gruppe der sogenannten Sprachmeister bildeten und zu deren praxisbezogenen Sprachvorstellungen (im Unterschied zum zeitgenössischen theoretischen Gelehrtendiskurs) kaum Forschungsergebnisse vorliegen. Im Rahmen des Vorhabens wird das gesamte überlieferte Material, in dem das Deutsche eine der Sprachen ist (ca. 1044 FSL; insgesamt ca. 626.400.000 Zeichen) nach einem gestuften Konzept volltexterschlossen, nachhaltig aufbereitet und für weitere Analysen bereitgestellt. Damit wird es zum ersten Mal möglich sein, die historischen Wurzeln der heutigen Mehrsprachigkeit in Europa aus der Perspektive alltagssprachlicher Praxis des Fremdsprachenerwerbs und der Fremdsprachen- und Wissensvermittlung in der Frühen Neuzeit zu beantworten."
  }
};

// Add CSV captions for each image
const imageCaptions = {
  'TeamfotoBerlin2024.jpg': {
    credits: '(c) FSL digital',
    en: 'The photo shows the project team.',
    de: 'Das Foto zeigt das Projektteam.'
  },
  'TeamtreffenHamburg2025.jpg': {
    credits: '(c) FLS digital',
    en: 'The photo shows the project team.',
    de: 'Das Foto zeigt das Projektteam.'
  },
  'Anonym1614Heidelberg.png': {
    credits: 'cc PDM 1.0 https://doi.org/10.11588/diglit.33210#0003',
    en: 'Colloqvia Et Dictionariolvm Sex Lingvarvm Heidelberg 1614',
    de: 'Colloqvia Et Dictionariolvm Sex Lingvarvm Heidelberg 1614'
  }
};

const imageFiles = [
  'Anonym1614Heidelberg.png',
  'TeamfotoBerlin2024.jpg',
  'TeamtreffenHamburg2025.jpg',
];
const images = imageFiles.map((file) => getImagePath(`/lovable-uploads/photo/${file}`));

const FADE_DURATION = 1000; // ms
const SLIDE_INTERVAL = 5000; // ms

const Hero = ({ lang = "en" }) => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const timerRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Arrow navigation handlers
  const goTo = (idx) => {
    setFade(true);
    setTimeout(() => {
      setCurrent((idx + images.length) % images.length);
      setFade(false);
    }, FADE_DURATION);
  };
  const handlePrev = () => {
    clearInterval(timerRef.current);
    goTo(current - 1);
    startTimer(current - 1);
  };
  const handleNext = () => {
    clearInterval(timerRef.current);
    goTo(current + 1);
    startTimer(current + 1);
  };
  const startTimer = (startIdx = current) => {
    timerRef.current = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(false);
      }, FADE_DURATION);
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    setFade(false); // Ensure first image is visible
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, []);

  // Modal close handler
  const handleModalClose = (e) => {
    if (e.target.classList.contains('modal-bg')) {
      setModalOpen(false);
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold leading-tight mb-6">
              {content[lang].heading}
            </h1>
            <p className="text-xl text-gray-600 mb-8 text-justify">
              {/* Image container with float for text wrapping */}
              <div className="relative h-[28rem] flex flex-col items-center justify-center group float-right ml-8 mb-4">
                {/* Left Arrow */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100 z-20"
                  aria-label="Previous photo"
                  style={{ outline: 'none', border: 'none' }}
                >
                  {'<'}
                </button>
                {/* Image */}
                <img
                  src={images[current]}
                  alt="slide"
                  className={`w-[32rem] h-[24rem] object-cover bg-white shadow-lg transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'} cursor-zoom-in`}
                  style={{ borderRadius: 0 }}
                  onClick={() => setModalOpen(true)}
                />
                {/* Caption and credits */}
                <div className="text-center mt-2 text-xs text-gray-700">
                  <span>{imageCaptions[imageFiles[current]][lang]}</span>
                  <br />
                  <span className="italic text-gray-500">{imageCaptions[imageFiles[current]].credits}</span>
                </div>
                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100 z-20"
                  aria-label="Next photo"
                  style={{ outline: 'none', border: 'none' }}
                >
                  {'>'}
                </button>
              </div>
              {content[lang].description}
            </p>
          </div>
        </div>
      </div>
      {/* Modal for zoomed image */}
      {modalOpen && (
        <div
          className="modal-bg fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div className="relative">
            {/* Left Arrow in Modal */}
            <button
              onClick={() => setCurrent((current - 1 + images.length) % images.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center shadow z-10"
              aria-label="Previous photo"
              style={{ outline: 'none', border: 'none' }}
            >
              {'<'}
            </button>
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-3xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-opacity-80"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={images[current]}
              alt="zoomed slide"
              className="max-w-[90vw] max-h-[80vh] object-contain bg-white rounded shadow-lg"
            />
            {/* Caption and credits in modal */}
            <div className="text-center mt-4 text-base text-white">
              <span>{imageCaptions[imageFiles[current]][lang]}</span>
              <br />
              <span className="italic text-gray-300">{imageCaptions[imageFiles[current]].credits}</span>
            </div>
            {/* Right Arrow in Modal */}
            <button
              onClick={() => setCurrent((current + 1) % images.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center shadow z-10"
              aria-label="Next photo"
              style={{ outline: 'none', border: 'none' }}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
