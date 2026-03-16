import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface InterviewProps {
  lang?: 'en' | 'de';
  setLang?: (lang: 'en' | 'de') => void;
}

const YouTubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8M9.6 15.6V8.4L15.8 12z" />
  </svg>
);

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M10 13a5 5 0 0 0 7.07 0l3.54-3.54a5 5 0 0 0-7.07-7.07L11 4" />
    <path d="M14 11a5 5 0 0 0-7.07 0L3.39 14.54a5 5 0 1 0 7.07 7.07L13 20" />
  </svg>
);

const Interview = ({ lang = 'en', setLang }: InterviewProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const germanReadingItems = [
    {
      title: 'Beitrag „Sprachen lernen im Europa der Frühen Neuzeit“',
      meta: 'Natalia Filatkina, Josephine Klingebeil-Schieke, Horst J. Simon und Andrea Rapp',
      description: 'Im Jahresmagazin 2025 (PDF, 3MB) der Berlin-Brandenburgischen Akademie der Wissenschaften, S. 42-45.',
      url: 'https://www.bbaw.de/files-bbaw/publikationen/jahresmagazin/jahresmagazin-2025/BBAW_Jahresmagazin_2025_Web.pdf',
    },
    {
      title: 'Einblicke ins Akademienprogramm: „Ihrer Zeit voraus: Fremdsprachenlehrwerke der Frühen Neuzeit“',
      url: 'https://www.akademienunion.de/akademienforschung/ihrer-zeit-voraus-fremdsprachenlehrwerke-der-fruehen-neuzeit',
    },
  ];

  const germanWatchingItems = [
    {
      title:
        'Aufzeichnungen der kommentierten Lesung „Wo gehandelt wird, da fallen Flüche... Konfliktkultur im historischen Kaufmannsalltag“',
      description:
        'Im Rahmen des Salon Sophie Charlotte unter dem Thema „Konflikte lösen!“ am 17. Januar 2026 an der Berlin-Brandenburgischen Akademie der Wissenschaften.',
      links: [
        {
          label: 'Video Salon 2026',
          url: 'https://www.youtube.com/channel/UCmsRl-mJbgGyWUuszSvfiaA',
        },
      ],
    },
    {
      title:
        'Aufzeichnungen der Paternoster Performance „Auf und ab durch die Sprachen Europas der Frühen Neuzeit“',
      description:
        'Im Rahmen des Salon Sophie Charlotte unter dem Thema „Metamorphosen“ am 18. Januar 2025 an der Berlin-Brandenburgischen Akademie der Wissenschaften.',
      links: [
        {
          label: 'Video SSC25-1',
          url: 'https://www.youtube.com/channel/UCmsRl-mJbgGyWUuszSvfiaA',
        },
        {
          label: 'Video SSC25-2',
          url: 'https://www.youtube.com/channel/UCmsRl-mJbgGyWUuszSvfiaA',
        },
      ],
    },
    {
      title: 'SWR, Kaffee oder Tee, 11.02.2026',
      description: '„Andrea Rapp, Präsidentin Akademie der Wissenschaften und der Literatur in Mainz“',
      url: 'https://www.swr.de/video/sendungen-a-z/kaffee-oder-tee/andrea-rapp-praesidentin-akademie-der-wissenschaften-und-der-literatur-in-mainz-100.html',
    },
  ];

  const germanListeningItems = [
    {
      title: 'Podcast „Sozusagen“: Alte Sprachlehrbücher - und was sie uns erzählen',
      url: 'https://www.br.de/mediathek/podcast/sozusagen/alte-sprachlehrbuecher-und-was-sie-uns-erzaehlen/2102040',
    },
    {
      title: 'Podcast „Sozusagen“: Französisch für Renaissancemenschen: Fremdsprachenunterricht in der Frühen Neuzeit',
      url: 'https://www.br.de/mediathek/podcast/sozusagen/franzoesisch-fuer-renaissancemenschen-fremdsprachenunterricht-in-der-fruehen-neuzeit/2090354',
    },
  ];

  const englishReadingItems = [
    {
      title: 'Article: “Language Learning in Early Modern Europe”',
      meta: 'Natalia Filatkina, Josephine Klingebeil-Schieke, Horst J. Simon, and Andrea Rapp',
      description:
        'In the 2025 Annual Journal (PDF, 3MB) of the Berlin-Brandenburg Academy of Sciences and Humanities, pp. 42–45.',
      url: 'https://www.bbaw.de/files-bbaw/publikationen/jahresmagazin/jahresmagazin-2025/BBAW_Jahresmagazin_2025_Web.pdf',
    },
    {
      title:
        'Insights into the Academy Program: “Ahead of Their Time: Foreign Language Textbooks of the Early Modern Period”',
      url: 'https://www.akademienunion.de/akademienforschung/ihrer-zeit-voraus-fremdsprachenlehrwerke-der-fruehen-neuzeit',
    },
  ];

  const englishWatchingItems = [
    {
      title:
        'Recording of the annotated reading “Where Trade Takes Place, Curses Are Uttered… A Culture of Conflict in the Daily Life of Early Modern Merchants”',
      description:
        'As part of the Salon Sophie Charlotte on the theme “Resolving Conflicts!” on January 17, 2026, at the Berlin-Brandenburg Academy of Sciences and Humanities.',
      links: [
        {
          label: 'Video Salon 2026',
          url: 'https://www.youtube.com/channel/UCmsRl-mJbgGyWUuszSvfiaA',
        },
      ],
    },
    {
      title: 'Recording of the Paternoster performance “Up and Down Through the Languages of Early Modern Europe”',
      description:
        'As part of the Salon Sophie Charlotte under the theme “Metamorphoses” on January 18, 2025, at the Berlin-Brandenburg Academy of Sciences and Humanities.',
      links: [
        {
          label: 'Video SSC25-1',
          url: 'https://www.youtube.com/channel/UCmsRl-mJbgGyWUuszSvfiaA',
        },
        {
          label: 'Video SSC25-2',
          url: 'https://www.youtube.com/channel/UCmsRl-mJbgGyWUuszSvfiaA',
        },
      ],
    },
    {
      title: 'SWR, Coffee or Tea, February 11, 2026',
      description: '“Andrea Rapp, President of the Academy of Sciences and Literature in Mainz”',
      url: 'https://www.swr.de/video/sendungen-a-z/kaffee-oder-tee/andrea-rapp-praesidentin-akademie-der-wissenschaften-und-der-literatur-in-mainz-100.html',
    },
  ];

  const englishListeningItems = [
    {
      title: 'Podcast “Sozusagen”: Old Language Textbooks—and What They Tell Us',
      url: 'https://www.br.de/mediathek/podcast/sozusagen/alte-sprachlehrbuecher-und-was-sie-uns-erzaehlen/2102040',
    },
    {
      title:
        'Podcast “Sozusagen”: French for Renaissance People: Foreign Language Instruction in the Early Modern Period',
      url: 'https://www.br.de/mediathek/podcast/sozusagen/franzoesisch-fuer-renaissancemenschen-fremdsprachenunterricht-in-der-fruehen-neuzeit/2090354',
    },
  ];

  const pageText = {
    en: {
      title: 'Public Interviews & Podcasts',
      intro:
        'This page collects public interviews, podcasts, and media contributions related to FSL digital. It will provide an overview of conversations, features, and audio formats from the project context.',
      reading: 'Further Reading',
      watching: 'Watch',
      listening: 'Listen',
      emptyReading: 'Reading references will be added here soon.',
      emptyWatching: 'Video entries will be added here soon.',
      emptyListening: 'Podcast entries will be added here soon.',
    },
    de: {
      title: 'Öffentliche Interviews & Podcasts',
      intro:
        'Diese Seite bündelt öffentliche Interviews, Podcasts und Medienbeiträge zu FSL digital. Sie bietet künftig einen Überblick über Gespräche, Features und Audioformate aus dem Projektkontext.',
      reading: 'Zum Weiterlesen',
      watching: 'Zum Ansehen',
      listening: 'Zum Reinhören',
      emptyReading: 'Einträge zum Weiterlesen werden hier in Kürze ergänzt.',
      emptyWatching: 'Video-Einträge werden hier in Kürze ergänzt.',
      emptyListening: 'Podcast-Einträge werden hier in Kürze ergänzt.',
    },
  } as const;

  const currentText = pageText[lang];

  return (
    <div className="min-h-screen">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">
              {currentText.title}
            </h1>

            <div className="bg-gray-50 border-l-4 border-primary p-8 mb-12 rounded-r-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentText.intro}
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {currentText.reading}
              </h2>
              <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                {lang === 'de' ? (
                  <div className="space-y-6">
                    {germanReadingItems.map((item) => (
                      <article key={item.title} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        {item.meta && <p className="mt-2 text-gray-700">{item.meta}</p>}
                        {item.description && <p className="mt-2 text-gray-600 leading-relaxed">{item.description}</p>}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 rounded border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 hover:border-primary hover:text-primary"
                          >
                            <LinkIcon />
                            {lang === 'de' ? 'Link öffnen' : 'Open link'}
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {englishReadingItems.map((item) => (
                      <article key={item.title} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        {item.meta && <p className="mt-2 text-gray-700">{item.meta}</p>}
                        {item.description && <p className="mt-2 text-gray-600 leading-relaxed">{item.description}</p>}
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 rounded border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 hover:border-primary hover:text-primary"
                          >
                            <LinkIcon />
                            Open link
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {currentText.watching}
              </h2>
              <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                {lang === 'de' ? (
                  <div className="space-y-6">
                    {germanWatchingItems.map((item) => (
                      <article key={item.title} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">{item.description}</p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 rounded border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 hover:border-primary hover:text-primary"
                          >
                            <LinkIcon />
                            {lang === 'de' ? 'Link öffnen' : 'Open link'}
                          </a>
                        )}
                        {item.links && (
                          <div className="mt-3 flex flex-wrap gap-3">
                            {item.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 hover:border-red-200 hover:text-red-600"
                              >
                                <YouTubeIcon />
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {englishWatchingItems.map((item) => (
                      <article key={item.title} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">{item.description}</p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 rounded border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 hover:border-primary hover:text-primary"
                          >
                            <LinkIcon />
                            Open link
                          </a>
                        )}
                        {item.links && (
                          <div className="mt-3 flex flex-wrap gap-3">
                            {item.links.map((link) => (
                              <a
                                key={link.label}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 hover:border-red-200 hover:text-red-600"
                              >
                                <YouTubeIcon />
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {currentText.listening}
              </h2>
              <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-md">
                {lang === 'de' ? (
                  <div className="space-y-4">
                    {germanListeningItems.map((item) => (
                      <article key={item.title} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <p className="text-lg text-gray-700 leading-relaxed">{item.title}</p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 rounded border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 hover:border-primary hover:text-primary"
                        >
                          <LinkIcon />
                          {lang === 'de' ? 'Link öffnen' : 'Open link'}
                        </a>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {englishListeningItems.map((item) => (
                      <article key={item.title} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <p className="text-lg text-gray-700 leading-relaxed">{item.title}</p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 rounded border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 hover:border-primary hover:text-primary"
                        >
                          <LinkIcon />
                          Open link
                        </a>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Interview;
