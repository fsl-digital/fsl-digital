import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getImagePath } from '@/lib/image-utils';
import JosephineProfile from './profiles/JosephineProfile';
import KerstinRothProfile from './profiles/KerstinRothProfile';
import ElenaBandtProfile from './profiles/ElenaBandtProfile';
import LivBuechlerProfile from './profiles/LivBuechlerProfile';
import FalcoRischProfile from './profiles/FalcoRischProfile';

// Helper function to get last name
const getLastName = (fullName) => {
  const parts = fullName.split(' ');
  return parts[parts.length - 1];
};

// Helper function to sort members by last name
const sortMembersByLastName = (members) => {
  return [...members].sort((a, b) => {
    const lastNameA = getLastName(a.name);
    const lastNameB = getLastName(b.name);
    return lastNameA.localeCompare(lastNameB);
  });
};

const sections = [
  { key: 'leader', title: { en: 'Spokespersons', de: 'Projektleitungen' } },
  { key: 'postdoc', title: { en: 'Post Doctoral Researchers', de: 'Arbeitsstellenleitungen' } },
  { key: 'phd', title: { en: 'Ph. D. Researchers', de: 'Doktorand:innen' } },
  { key: 'assistant', title: { en: 'Scientific Assistants', de: 'Studentische Hilfskräfte' } },
];

const bottomSections = [
  { key: 'working', title: { en: 'Further Staff', de: 'Weitere Mitarbeitende' } },
  { key: 'partners', title: { en: 'Cooperation Partners', de: 'Kooperationspartner:innen' } },
  { key: 'alumni', title: { en: 'Former Staff Members', de: 'Ehemalige Mitarbeitende' } },
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
  const [showKlingebeilModal, setShowKlingebeilModal] = useState(false);
  const [showRothModal, setShowRothModal] = useState(false);
  const [showBandtModal, setShowBandtModal] = useState(false);
  const [showBuechlerModal, setShowBuechlerModal] = useState(false);
  const [showFalcoRischModal, setShowFalcoRischModal] = useState(false);

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  // Define team members for each section
  const leaderMembers = [
    {
      name: "Prof. Dr. Andrea Rapp",
      image: '/lovable-uploads/team_photo/RappAndrea.jpg',
      link: "https://www.linglit.tu-darmstadt.de/institutlinglit/mitarbeitende/andrearapp/index.de.jsp",
      email: "andrea.rapp@tu-darmstadt.de",
      institution: {
        en: "German Studies - Computational Philology and Medieval Studies\nTechnical University of Darmstadt",
        de: "Germanistik - Computerphilologie und Mediävistik\nTechnische Universität Darmstadt"
      }
    },
    {
      name: "Prof. Dr. Horst Simon",
      image: '/lovable-uploads/team_photo/Simon.png',
      link: "https://www.geisteswissenschaften.fu-berlin.de/we04/linguistik/histling/mitarbeiter_innen/prof/simon/index.html",
      email: "horst.simon@fu-berlin.de",
      institution: {
        en: "German Historical Linguistics - Freie Universität Berlin",
        de: "Deutsche historische Linguistik - Freie Universität Berlin"
      }
    },
    {
      name: "Prof. Dr. Natalia Filatkina",
      image: '/lovable-uploads/team_photo/natalia-filatkina.jpg',
      link: "https://www.uni-hamburg.de/uhh/organisation/praesidium/vp2.html",
      email: "natalia.filatkina@uni-hamburg.de",
      institution: {
        en: "Vice President for Studies and Teaching\nLinguistics of German with a focus on digital historical linguistics\nUniversity of Hamburg",
        de: "Vizepräsidentin für Studium und Lehre\nLinguistik des Deutschen mit Schwerpunkt digitale historische Sprachwissenschaft\nUniversität Hamburg"
      }
    }
  ];

  const postdocMembers = [
    {
      name: "Dr. Luise Borek",
      image: '/lovable-uploads/team_photo/no_photo.png',
      email: "luise.borek@tu-darmstadt.de",
      institution: {
        en: "Technical University of Darmstadt\nUnion of German Academies of Sciences\nCurrently on leave until 2026",
        de: "Technische Universität Darmstadt\nUnion der deutschen Akademien der Wissenschaften\nDerzeit beurlaubt bis 2026"
      }
    },
    {
      name: "Dr. Josephine Klingebeil-Schieke",
      image: '/lovable-uploads/team_photo/Klingebeil.jpg',
      email: "klingebeil@bbaw.de",
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Dr. Kerstin Roth",
      image: '/lovable-uploads/team_photo/KerstinRoth.jpg',
      email: "kerstin.roth@uni-hamburg.de",
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    }
  ];

  const phdMembers = [
    {
      name: "Elena Bandt",
      image: '/lovable-uploads/team_photo/BandtElena.jpg',
      email: "elena.bandt@bbaw.de",
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Liv Büchler",
      image: '/lovable-uploads/team_photo/liv.jpg',
      email: "liv.buechler@bbaw.de",
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Debajyoti Paul Chowdhury",
      image: '/lovable-uploads/team_photo/dp.jpg',
      email: "debajyoti.chowdhury@tu-darmstadt.de",
      institution: {
        en: "Technical University of Darmstadt",
        de: "Technische Universität Darmstadt"
      }
    },
    {
      name: "Miriam Hinterholzer",
      image: '/lovable-uploads/team_photo/miriam.jpg',
      email: "miriam.hinterholzer@uni-hamburg.de",
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Lisa Scharrer",
      image: '/lovable-uploads/team_photo/lisa.jpg',
      email: "lisa.scharrer@tu-darmstadt.de",
      institution: {
        en: "Technical University of Darmstadt",
        de: "Technische Universität Darmstadt"
      }
    },
    {
      name: "Elena Volkanovska",
      image: '/lovable-uploads/team_photo/no_photo.png',
      email: "elena.volkanovska@tu-darmstadt.de",
      institution: {
        en: "Technical University of Darmstadt",
        de: "Technische Universität Darmstadt"
      }
    }
  ];

  const assistantMembers = [
    {
      name: "Carlotta Schilke",
      image: '/lovable-uploads/team_photo/Carlotta.jpg',
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Zoe Kaufmann",
      image: '/lovable-uploads/team_photo/no_photo.png',
      institution: {
        en: "Technical University of Darmstadt",
        de: "Technische Universität Darmstadt"
      }
    },
    {
      name: "Emma Piel",
      image: '/lovable-uploads/team_photo/no_photo.png',
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Anja Schramm",
      image: '/lovable-uploads/team_photo/SchrammAnja.jpg',
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Peer Scholl",
      image: '/lovable-uploads/team_photo/Scholl.jpg',
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Niclas Semmerow",
      image: '/lovable-uploads/team_photo/no_photo.png',
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Francesca Romana Vertullo",
      image: '/lovable-uploads/team_photo/Vertullo.jpg',
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    }
  ];

  const workingMembers = [
    {
      name: "Alexandra Franz",
      image: '/lovable-uploads/team_photo/no_photo.png'
    },
    {
      name: "Ekaterina Funk",
      image: '/lovable-uploads/team_photo/no_photo.png'
    },
    {
      name: "Stefanie Anna Voss",
      image: '/lovable-uploads/team_photo/no_photo.png'
    }
  ];

  const partnerMembers = [
    {
      name: "Linda Gennies",
      image: '/lovable-uploads/team_photo/no_photo.png',
      link: "https://www.geisteswissenschaften.fu-berlin.de/we04/linguistik/histling/mitarbeiter_innen/wimi/gennies/index.html",
      institution: {
        en: "Freie Universität Berlin",
        de: "Freie Universität Berlin"
      }
    },
    {
      name: "Dr. Julia Hübner",
      image: '/lovable-uploads/team_photo/no_photo.png',
      link: "https://www.slm.uni-hamburg.de/germanistik/personen/huebner.html",
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Laura Panne",
      image: '/lovable-uploads/team_photo/no_photo.png',
      link: "https://www.slm.uni-hamburg.de/germanistik/personen/panne.html",
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Elizaveta Zimont",
      image: '/lovable-uploads/team_photo/no_photo.png',
      link: "https://www.univ-reims.fr/cirlep/l-equipe-des-chercheurs-du-cirlep/elizaveta-zimont,9931,43419.html",
      institution: "Université de Reims Champagne-Ardenne"
    }
  ];

  const alumniMembers = [
    {
      name: "Falco Risch",
      image: '/lovable-uploads/team_photo/no_photo.png',
      institution: {
        en: "Technical University of Darmstadt",
        de: "Technische Universität Darmstadt"
      },
      timeline: {
        en: "May 2024 - August 2025",
        de: "Mai 2024 - August 2025"
      }
    }
  ];

  // Sort all members by last name
  const sortedLeaderMembers = sortMembersByLastName(leaderMembers);
  const sortedPostdocMembers = sortMembersByLastName(postdocMembers);
  const sortedPhdMembers = sortMembersByLastName(phdMembers);
  const sortedAssistantMembers = sortMembersByLastName(assistantMembers);
  const sortedWorkingMembers = sortMembersByLastName(workingMembers);
  const sortedPartnerMembers = sortMembersByLastName(partnerMembers);
  const sortedAlumniMembers = sortMembersByLastName(alumniMembers);

  return (
    <div className="min-h-screen bg-[url('/lovable-uploads/team-bg.jpg')] bg-cover bg-center">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">{lang === 'de' ? 'Unser Team' : 'Our Team'}</h1>
            <div className="text-center mb-12">
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                {lang === 'de' 
                  ? 'Willkommen beim FSL digital Team! Wir sind ein interdisziplinäres Forschungsteam, das sich der digitalen Erschließung historischer Fremdsprachenlehrwerke widmet.'
                  : 'Welcome to the FSL digital team! We are an interdisciplinary research team dedicated to the digital exploration of historical foreign language textbooks.'
                }
              </p>
            </div>
            {/* Klingebeil Modal - styled like the HTML profile */}
            {showKlingebeilModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={e => {
                  if (e.target === e.currentTarget) setShowKlingebeilModal(false);
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8 overflow-y-auto max-h-[95vh] border border-gray-200">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold focus:outline-none"
                    onClick={() => setShowKlingebeilModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <JosephineProfile />
                </div>
              </div>
            )}
            {/* Roth Modal - styled like the HTML profile */}
            {showRothModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={e => {
                  if (e.target === e.currentTarget) setShowRothModal(false);
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8 overflow-y-auto max-h-[95vh] border border-gray-200">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold focus:outline-none"
                    onClick={() => setShowRothModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <KerstinRothProfile />
                </div>
              </div>
            )}
            {/* Bandt Modal - styled like the HTML profile */}
            {showBandtModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={e => {
                  if (e.target === e.currentTarget) setShowBandtModal(false);
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8 overflow-y-auto max-h-[95vh] border border-gray-200">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold focus:outline-none"
                    onClick={() => setShowBandtModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <ElenaBandtProfile />
                </div>
              </div>
            )}
            {/* Buechler Modal - styled like the HTML profile */}
            {showBuechlerModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={e => {
                  if (e.target === e.currentTarget) setShowBuechlerModal(false);
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8 overflow-y-auto max-h-[95vh] border border-gray-200">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold focus:outline-none"
                    onClick={() => setShowBuechlerModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <LivBuechlerProfile />
                </div>
              </div>
            )}
            {/* Falco Risch Modal - styled like the HTML profile */}
            {showFalcoRischModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                onClick={e => {
                  if (e.target === e.currentTarget) setShowFalcoRischModal(false);
                }}
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8 overflow-y-auto max-h-[95vh] border border-gray-200">
                  <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold focus:outline-none"
                    onClick={() => setShowFalcoRischModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                  <FalcoRischProfile />
                </div>
              </div>
            )}
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
                          {sortedLeaderMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center h-full justify-between bg-transparent">
                              <img src={getImagePath(member.image)} alt={member.name} className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                              <h3 className="text-lg font-bold font-sans">
                                <a href={member.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">{member.name}</a>
                              </h3>
                              <p className="text-center text-gray-700 mb-2 text-sm whitespace-pre-line">
                                {member.name === "Prof. Dr. Andrea Rapp" ? (
                                  <>
                                    {lang === 'en' ? (
                                      <>
                                        German Studies - Computational Philology and Medieval Studies<br />
                                        Technical University of Darmstadt<br />
                                        President of the Academy of Sciences and Literature Mainz
                                      </>
                                    ) : (
                                      <>
                                        Germanistik - Computerphilologie und Mediävistik<br />
                                        Technische Universität Darmstadt<br />
                                        Präsidentin der Akademie der Wissenschaften und der Literatur Mainz
                                      </>
                                    )}
                                  </>
                                ) : (
                                  member.institution[lang]
                                )}
                              </p>
                              <div className="mt-auto w-full flex justify-center">
                                <a href={`mailto:${member.email}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.key === 'postdoc' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {sortedPostdocMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center h-full justify-between bg-transparent">
                              <img src={getImagePath(member.image)} alt={member.name} className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                              <h3 className="text-lg font-bold font-sans">
                                {member.name === 'Dr. Josephine Klingebeil-Schieke' ? (
                                  <button
                                    className="focus:outline-none transition-colors hover:text-blue-700"
                                    style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
                                    onClick={() => setShowKlingebeilModal(true)}
                                  >
                                    {member.name}
                                  </button>
                                ) : member.name === 'Dr. Kerstin Roth' ? (
                                  <button
                                    className="focus:outline-none transition-colors hover:text-blue-700"
                                    style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
                                    onClick={() => setShowRothModal(true)}
                                  >
                                    {member.name}
                                  </button>
                                ) : (
                                  member.name
                                )}
                              </h3>
                              <p className="text-center text-gray-700 mb-2 text-sm whitespace-pre-line">
                                {member.institution[lang]}
                              </p>
                              <div className="mt-auto w-full flex justify-center">
                                <a href={`mailto:${member.email}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.key === 'phd' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {sortedPhdMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center h-full justify-between bg-transparent">
                              <img src={getImagePath(member.image)} alt={member.name} className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                              <h3 className="text-lg font-bold font-sans">
                                {member.name === 'Elena Bandt' ? (
                                  <button
                                    className="focus:outline-none transition-colors hover:text-blue-700"
                                    style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
                                    onClick={() => setShowBandtModal(true)}
                                  >
                                    {member.name}
                                  </button>
                                ) : member.name === 'Liv Büchler' ? (
                                  <button
                                    className="focus:outline-none transition-colors hover:text-blue-700"
                                    style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
                                    onClick={() => setShowBuechlerModal(true)}
                                  >
                                    {member.name}
                                  </button>
                                ) : (
                                  member.name
                                )}
                              </h3>
                              <p className="text-center text-gray-700 mb-2 text-sm">
                                {member.institution[lang]}
                              </p>
                              <div className="mt-auto w-full flex justify-center">
                                <a href={`mailto:${member.email}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.key === 'assistant' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {sortedAssistantMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <img src={getImagePath(member.image)} alt={member.name} className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                              <h3 className="text-lg font-bold font-sans whitespace-nowrap">{member.name}</h3>
                              <p className="text-center text-gray-700 mb-2 text-sm">
                                {member.institution[lang]}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
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
                          {sortedWorkingMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <img src={getImagePath(member.image)} alt={member.name} className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                              <h3 className="text-lg font-bold font-sans">{member.name}</h3>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.key === 'partners' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {sortedPartnerMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <img src={getImagePath(member.image)} alt={member.name} className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                              <h3 className="text-lg font-bold font-sans">
                                {member.link ? (
                                  <a href={member.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">{member.name}</a>
                                ) : (
                                  member.name
                                )}
                              </h3>
                              <p className="text-center text-gray-700 mb-2 text-sm">
                                {typeof member.institution === 'string' ? member.institution : member.institution[lang]}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      {section.key === 'alumni' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {sortedAlumniMembers.map((member, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <img src={getImagePath(member.image)} alt={member.name} className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                              <h3 className="text-lg font-bold font-sans">
                                {member.name === 'Falco Risch' ? (
                                  <button
                                    className="focus:outline-none transition-colors hover:text-blue-700"
                                    style={{ background: 'none', border: 'none', padding: 0, margin: 0, cursor: 'pointer' }}
                                    onClick={() => setShowFalcoRischModal(true)}
                                  >
                                    {member.name}
                                  </button>
                                ) : (
                                  member.name
                                )}
                              </h3>
                              <p className="text-center text-gray-700 mb-2 text-sm">
                                {member.institution[lang]}
                              </p>
                              {member.timeline && (
                                <p className="text-center text-gray-500 mb-2 text-sm">
                                  {member.timeline[lang]}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Team; 