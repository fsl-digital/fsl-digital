import PhotoSlideshow from '@/components/PhotoSlideshow';

const content = {
  en: {
    heading: (
      <>
        <span className="block text-center mb-1 font-bold text-gray-800 leading-tight hyphenate break-words text-balance text-3xl sm:text-4xl md:text-5xl max-w-prose mx-auto">Historische Fremdsprachenlehrwerke digital</span>
        <span className="text-xl block text-center mt-1 mb-3 text-gray-600">Language history, language attitudes and everyday communication in the context of multilingualism in Early Modern Europe</span>
        <br />
        <span className="text-2xl sm:text-3xl font-bold text-center block">Fremd <span className="text-red-600">|</span> Sprachen <span className="text-blue-900">|</span> Lehrwerke</span>
      </>
    ),
    description: `This long-term project annotates and analyses multilingual foreign language textbooks (FSL) from the early modern period, with a focus on works containing German. 
The project aims to explore and examine the practical forms of teaching knowledge about vernacular languages (pronunciation, grammar, vocabulary, pragmatics) as well as written and, above all, oral everyday communication in the multilingual context of early modern Europe. As part of the project, all surviving material will be a tiered concept, sustainably processed, and made available for further analysis.`
  },
  de: {
    heading: (
      <>
        <span lang="de" className="block text-center mb-1 font-bold text-gray-800 leading-tight hyphenate break-words text-balance text-3xl sm:text-4xl md:text-5xl max-w-prose mx-auto">Historische Fremdsprachenlehrwerke digital</span>
        <span className="text-lg block text-center mt-1 mb-3 text-gray-600">Sprachgeschichte, Sprachvorstellungen und Alltagskommunikation im Kontext der Mehrsprachigkeit im Europa der Frühen Neuzeit</span>
        <br />
        <span className="text-2xl sm:text-3xl font-bold text-center block">Fremd <span className="text-red-600">|</span> Sprachen <span className="text-blue-900">|</span> Lehrwerke</span>
      </>
    ),
    description: `Das Langzeitvorhaben erfasst und untersucht historische Fremdsprachenlehrwerke aus der Frühen Neuzeit (15. bis 17. Jahrhundert), die Deutsch als Ziel- oder Ausgangssprache haben. Das Projekt setzt sich zum Ziel, die praktischen Formen der Vermittlung des Wissens über die Volkssprachen sowie vor allem der mündlichkeitsnahen Alltagskommunikation im mehrsprachigen Kontext des frühneuzeitlichen Europa anhand dieser Quellen zu erschließen und zu untersuchen. Die Sprachbücher werden vollständig digitalisiert, nachhaltig aufbereitet, philologisch tief bearbeitet und für weitere wissenschaftliche Analysen bereitgestellt.`
  }
};

const DEFAULT_CAPTIONS: Record<string, { credits: string; en: string; de: string }> = {
  'TeamfotoBerlin2024.jpg': {
    credits: '(c) FSL digital',
    en: 'The photo shows the project team.',
    de: 'Das Foto zeigt das Projektteam.'
  },
  'TeamtreffenHamburg2025.jpg': {
    credits: '(c) FSL digital',
    en: 'The photo shows the project team.',
    de: 'Das Foto zeigt das Projektteam.'
  },
  'Anonym1614Heidelberg.png': {
    credits: 'cc PDM 1.0 https://doi.org/10.11588/diglit.33210#0003',
    en: 'Colloqvia Et Dictionariolvm Sex Lingvarvm Heidelberg 1614',
    de: 'Colloqvia Et Dictionariolvm Sex Lingvarvm Heidelberg 1614'
  }
};

const defaultImageFiles = [
  'Anonym1614Heidelberg.png',
  'TeamfotoBerlin2024.jpg',
  'TeamtreffenHamburg2025.jpg',
];

const Hero = ({ lang = "en" }) => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <h1 className="text-4xl font-bold leading-tight mb-6">
              {content[lang].heading}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_32rem] gap-10 items-start">
              <div className="text-xl text-gray-600 text-justify pb-6 lg:pb-12">
                {content[lang].description}
              </div>
              <PhotoSlideshow
                lang={lang}
                csvPath="/uploads/photo/caption.csv"
                defaultCaptions={DEFAULT_CAPTIONS}
                defaultImageFiles={defaultImageFiles}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
