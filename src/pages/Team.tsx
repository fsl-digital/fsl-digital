import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getImagePath } from '@/lib/image-utils';

const sections = [
  { key: 'leader', title: { en: 'PI', de: 'Projektleitung' } },
  { key: 'postdoc', title: { en: 'Team Leader', de: 'Arbeitsstellenleitung' } },
  { key: 'phd', title: { en: 'P.h.D', de: 'Doktorand' } },
  { key: 'assistant', title: { en: 'Student Assistant', de: 'Studentische Hilfskraft' } },
];

const bottomSections = [
  { key: 'working', title: { en: 'Working Students', de: 'Werkstudenten' } },
  { key: 'partners', title: { en: 'Cooperation Partners', de: 'Kooperationspartner' } },
  { key: 'alumni', title: { en: 'Team Alumni', de: 'Team Alumni' } },
];

const ArrowIcon = ({ open }) => (
  <span
    className={`inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 transition-transform duration-300 ml-2 ${open ? 'rotate-180' : ''}`}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="6,9 12,15 18,9" fill="#333" />
    </svg>
  </span>
);

const Team = ({ lang = 'en', setLang }) => {
  const [open, setOpen] = useState({});

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="min-h-screen bg-[url('/lovable-uploads/team-bg.jpg')] bg-cover bg-center">
      <Header lang={lang} setLang={setLang} />
      <div className="py-12 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">{lang === 'de' ? 'Unser Team' : 'Our Team'}</h2>
        <div className="max-w-3xl mx-auto space-y-8">
          {sections.map((section) => (
            <div key={section.key}>
              <button
                className="w-full flex justify-between items-center text-left text-2xl font-semibold mb-2 focus:outline-none"
                onClick={() => toggle(section.key)}
              >
                <span>{section.title[lang]}</span>
                <ArrowIcon open={open[section.key]} />
              </button>
              <div className={`border-b-2 border-gray-300 mb-2`} />
              {open[section.key] && (
                <div className="p-4 bg-white bg-opacity-80 rounded shadow mb-2 animate-fade-in">
                  {section.key === 'leader' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/RappAndrea.jpg')} alt="Prof. Dr. Andrea Rapp" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">
                          <a href="https://www.linglit.tu-darmstadt.de/institutlinglit/mitarbeitende/andrearapp/index.de.jsp" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">Prof. Dr. Andrea Rapp</a>
                        </h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">
                          {lang === 'en' ? (
                            <>
                              German Studies - Computational Philology and Medieval Studies<br />
                              Technical University of Darmstadt
                            </>
                          ) : (
                            <>
                              Germanistik - Computerphilologie und Mediävistik<br />
                              Technische Universität Darmstadt
                            </>
                          )}
                        </p>
                        <div className="mt-auto w-full flex justify-center">
                          <a href="mailto:andrea.rapp@tu-darmstadt.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/Simon.png')} alt="Prof. Dr. Horst Simon" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">
                          <a href="https://www.geisteswissenschaften.fu-berlin.de/we04/linguistik/histling/mitarbeiter_innen/prof/simon/index.html" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">Prof. Dr. Horst Simon</a>
                        </h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">
                          {lang === 'en' ? (
                            'German Historical Linguistics - Freie Universität Berlin'
                          ) : (
                            'Deutsche historische Linguistik - Freie Universität Berlin'
                          )}
                        </p>
                        <div className="mt-auto w-full flex justify-center">
                          <a href="mailto:horst.simon@fu-berlin.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/natalia-filatkina.jpg')} alt="Prof. Dr. Natalia Filatkina" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">
                          <a href="https://www.uni-hamburg.de/uhh/organisation/praesidium/vp2.html" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">Prof. Dr. Natalia Filatkina</a>
                        </h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">
                          {lang === 'en' ? (
                            <>
                              Vice President for Studies and Teaching<br />
                              Linguistics of German with a focus on digital historical linguistics<br />
                              University of Hamburg
                            </>
                          ) : (
                            <>
                              Vizepräsidentin für Studium und Lehre<br />
                              Linguistik des Deutschen mit Schwerpunkt digitale historische Sprachwissenschaft<br />
                              Universität Hamburg
                            </>
                          )}
                        </p>
                        <div className="mt-auto w-full flex justify-center">
                          <a href="mailto:natalia.filatkina@uni-hamburg.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                    </div>
                  )}
                  {section.key === 'postdoc' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/Klingebeil.jpg')} alt="Dr. Josephine Klingebeil-Schieke" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Dr. Josephine Klingebeil-Schieke</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">
                          {lang === 'en' ? 'Berlin-Brandenburg Academy of Sciences and Humanities' : 'Berlin-Brandenburgische Akademie der Wissenschaften'}
                        </p>
                        <div className="mt-auto w-full flex justify-center">
                          <a href="mailto:klingebeil@bbaw.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/KerstinRoth.jpg')} alt="Dr. Kerstin Roth" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Dr. Kerstin Roth</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">
                          {lang === 'en' ? 'University of Hamburg' : 'Universität Hamburg'}
                        </p>
                        <div className="mt-auto w-full flex justify-center">
                          <a href="mailto:kerstin.roth@uni-hamburg.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Dr. Luise Borek" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Dr. Luise Borek</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">
                          {lang === 'en' ? (
                            <>
                              Technical University of Darmstadt (on leave)<br />
                              Union of German Academies of Sciences<br />
                              Currently on leave until 2026
                            </>
                          ) : (
                            <>
                              Technische Universität Darmstadt (beurlaubt)<br />
                              Union der deutschen Akademien der Wissenschaften<br />
                              Derzeit beurlaubt bis 2026
                            </>
                          )}
                        </p>
                        <div className="mt-auto w-full flex justify-center">
                          <a href="mailto:luise.borek@tu-darmstadt.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                    </div>
                  )}
                  {section.key === 'phd' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/dp.jpg')} alt="Debajyoti Paul Chowdhury" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Debajyoti Paul Chowdhury</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'Technical University of Darmstadt' : 'Technische Universität Darmstadt'}</p>
                        <div className="mt-auto w-full flex justify-center items-center gap-2 flex-nowrap">
                          <a href="mailto:debajyoti.chowdhury@tu-darmstadt.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/BandtElena.jpg')} alt="Elena Bandt" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Elena Bandt</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'Berlin-Brandenburg Academy of Sciences and Humanities' : 'Berlin-Brandenburgische Akademie der Wissenschaften'}</p>
                        <div className="mt-auto w-full flex justify-center items-center gap-2 flex-nowrap">
                          <a href="mailto:elena.bandt@bbaw.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Elena Volkanovska" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Elena Volkanovska</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'Technical University of Darmstadt' : 'Technische Universität Darmstadt'}</p>
                        <div className="mt-auto w-full flex justify-center items-center gap-2 flex-nowrap">
                          <a href="mailto:elena.volkanovska@tu-darmstadt.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Lisa Scharrer" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Lisa Scharrer</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'Technical University of Darmstadt' : 'Technische Universität Darmstadt'}</p>
                        <div className="mt-auto w-full flex justify-center items-center gap-2 flex-nowrap">
                          <a href="mailto:lisa.scharrer@tu-darmstadt.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/liv.jpg')} alt="Liv Büchler" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Liv Büchler</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'Freie Universität Berlin' : 'Freie Universität Berlin'}</p>
                        <div className="mt-auto w-full flex justify-center items-center gap-2 flex-nowrap">
                          <a href="mailto:liv.buechler@bbaw.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                      <div className="flex flex-col items-center h-full justify-between bg-transparent">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Miriam Hinterholzer" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Miriam Hinterholzer</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'University of Hamburg' : 'Universität Hamburg'}</p>
                        <div className="mt-auto w-full flex justify-center items-center gap-2 flex-nowrap">
                          <a href="mailto:miriam.hinterholzer@uni-hamburg.de" className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                        </div>
                      </div>
                    </div>
                  )}
                  {section.key === 'assistant' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/SchrammAnja.jpg')} alt="Anja Schramm" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Anja Schramm</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'Berlin-Brandenburg Academy of Sciences and Humanities' : 'Berlin-Brandenburgische Akademie der Wissenschaften'}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Carlotta Schilke" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Carlotta Schilke</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'Berlin-Brandenburg Academy of Sciences and Humanities' : 'Berlin-Brandenburgische Akademie der Wissenschaften'}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/Vertullo.jpg')} alt="Francesca Romana Vertullo" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Francesca Romana Vertullo</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'University of Hamburg' : 'Universität Hamburg'}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Falco Risch" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Falco Risch</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'Technical University of Darmstadt' : 'Technische Universität Darmstadt'}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/Scholl.jpg')} alt="Peer Scholl" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Peer Scholl</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">{lang === 'en' ? 'Berlin-Brandenburg Academy of Sciences and Humanities' : 'Berlin-Brandenburgische Akademie der Wissenschaften'}</p>
                      </div>
                    </div>
                  )}
                  {section.key !== 'leader' && section.key !== 'postdoc' && section.key !== 'phd' && section.key !== 'assistant' && (
                    <p className="text-gray-700">Content for {section.title[lang]} goes here.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto space-y-8 mt-8">
          {bottomSections.map((section) => (
            <div key={section.key}>
              <button
                className="w-full flex justify-between items-center text-left text-2xl font-semibold mb-2 focus:outline-none"
                onClick={() => toggle(section.key)}
              >
                <span>{section.title[lang]}</span>
                <ArrowIcon open={open[section.key]} />
              </button>
              <div className={`border-b-2 border-gray-300 mb-2`} />
              {open[section.key] && (
                <div className="p-4 bg-white bg-opacity-80 rounded shadow mb-2 animate-fade-in">
                  {section.key === 'working' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Alexandra Franz" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Alexandra Franz</h3>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Ekaterina Funk" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Ekaterina Funk</h3>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Stefanie Anna Voss" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Stefanie Anna Voss</h3>
                      </div>
                    </div>
                  )}
                  {section.key === 'partners' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Julia Hübner" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Julia Hübner</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">
                          {lang === 'en' ? 'University of Hamburg' : 'Universität Hamburg'}
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Elizaveta Zimont" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Elizaveta Zimont</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">Université de Reims Champagne-Ardenne</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img src={getImagePath('/lovable-uploads/team_photo/no_photo.jpg')} alt="Linda Gennies" className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                        <h3 className="text-lg font-bold font-sans">Linda Gennies</h3>
                        <p className="text-center text-gray-700 mb-2 text-sm">
                          {lang === 'en' ? 'Freie Universität Berlin' : 'Freie Universität Berlin'}
                        </p>
                      </div>
                    </div>
                  )}
                  {section.key === 'alumni' && (
                    <p className="text-gray-700">Content for {section.title[lang]} goes here.</p>
                  )}
                  {section.key !== 'working' && section.key !== 'partners' && section.key !== 'alumni' && (
                    <p className="text-gray-700">Content for {section.title[lang]} goes here.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer lang={lang} />
    </div>
  );
};

export default Team; 