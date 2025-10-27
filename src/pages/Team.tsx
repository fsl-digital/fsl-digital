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
  { key: 'leader', title: { en: 'Spokespersons or Project Leaders', de: 'Projektleitungen' } },
  { key: 'head', title: { en: 'Head of Office', de: 'Projektkoordination' } },
  { key: 'postdoc', title: { en: 'Post Doctoral Researchers', de: 'Postdoktorand:innen' } },
  { key: 'phd', title: { en: 'Ph. D. Researchers', de: 'Doktorandinnen:innen' } },
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
  const [zoomPhoto, setZoomPhoto] = useState<string | null>(null);

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  // Define team members for each section
  const leaderMembers = [
    {
      name: "Prof. Dr. Andrea Rapp",
      image: '/uploads/team_photo/RappAndrea.jpg',
      link: "https://www.linglit.tu-darmstadt.de/institutlinglit/mitarbeitende/andrearapp/index.de.jsp",
      email: "andrea.rapp@tu-darmstadt.de",
      institution: {
        en: "German Studies - Computational Philology and Medieval Studies\nTechnical University of Darmstadt",
        de: "Germanistik - Computerphilologie und Mediävistik\nTechnische Universität Darmstadt"
      }
    },
    {
      name: "Prof. Dr. Horst Simon",
      image: '/uploads/team_photo/Simon.png',
      link: "https://www.geisteswissenschaften.fu-berlin.de/we04/linguistik/histling/mitarbeiter_innen/prof/simon/index.html",
      email: "horst.simon@fu-berlin.de",
      institution: {
        en: "German Historical Linguistics - Freie Universität Berlin",
        de: "Deutsche historische Linguistik - Freie Universität Berlin"
      }
    },
    {
      name: "Prof. Dr. Natalia Filatkina",
      image: '/uploads/team_photo/natalia-filatkina.jpg',
      link: "https://www.uni-hamburg.de/uhh/organisation/praesidium/vp2.html",
      email: "natalia.filatkina@uni-hamburg.de",
      institution: {
        en: "Vice President for Studies and Teaching\nLinguistics of German with a focus on digital historical linguistics\nUniversity of Hamburg",
        de: "Vizepräsidentin für Studium und Lehre\nLinguistik des Deutschen mit Schwerpunkt digitale historische Sprachwissenschaft\nUniversität Hamburg"
      }
    }
  ];

  // Head of Office
  const headMembers = [
    {
      name: "Dr. Josephine Klingebeil-Schieke",
      image: '/uploads/team_photo/Klingebeil.jpg',
      email: "klingebeil@bbaw.de",
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    }
  ];

  const postdocMembers = [
    {
      name: "Dr. Luise Borek",
      image: '/uploads/team_photo/no_photo.png',
      email: "luise.borek@tu-darmstadt.de",
      institution: {
        en: "Technical University of Darmstadt\nUnion of German Academies of Sciences\nCurrently on leave until 2026",
        de: "Technische Universität Darmstadt\nUnion der deutschen Akademien der Wissenschaften\nDerzeit beurlaubt bis 2026"
      }
    },
    {
      name: "Dr. Josephine Klingebeil-Schieke",
      image: '/uploads/team_photo/Klingebeil.jpg',
      email: "klingebeil@bbaw.de",
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Dr. Kerstin Roth",
      image: '/uploads/team_photo/KerstinRoth.jpg',
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
      image: '/uploads/team_photo/BandtElena.jpg',
      email: "elena.bandt@bbaw.de",
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Liv Büchler",
      image: '/uploads/team_photo/liv.jpg',
      email: "liv.buechler@bbaw.de",
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Debajyoti Paul Chowdhury",
      image: '/uploads/team_photo/dp.jpg',
      email: "debajyoti.chowdhury@tu-darmstadt.de",
      institution: {
        en: "Technical University of Darmstadt",
        de: "Technische Universität Darmstadt"
      }
    },
    {
      name: "Miriam Hinterholzer",
      image: '/uploads/team_photo/miriam.jpg',
      email: "miriam.hinterholzer@uni-hamburg.de",
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Lisa Scharrer",
      image: '/uploads/team_photo/lisa.jpg',
      email: "lisa.scharrer@tu-darmstadt.de",
      institution: {
        en: "Technical University of Darmstadt",
        de: "Technische Universität Darmstadt"
      }
    },
    {
      name: "Elena Volkanovska",
      image: '/uploads/team_photo/no_photo.png',
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
      image: '/uploads/team_photo/Carlotta.jpg',
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Zoe Kaufmann",
      image: '/uploads/team_photo/no_photo.png',
      institution: {
        en: "Technical University of Darmstadt",
        de: "Technische Universität Darmstadt"
      }
    },
    {
      name: "Emma Piel",
      image: '/uploads/team_photo/no_photo.png',
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Anja Schramm",
      image: '/uploads/team_photo/SchrammAnja.jpg',
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Peer Scholl",
      image: '/uploads/team_photo/Scholl.jpg',
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
      }
    },
    {
      name: "Niclas Semmerow",
      image: '/uploads/team_photo/no_photo.png',
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Francesca Romana Vertullo",
      image: '/uploads/team_photo/Vertullo.jpg',
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    }
  ];

  const workingMembers = [
    {
      name: "Alexandra Franz",
      image: '/uploads/team_photo/no_photo.png'
    },
    {
      name: "Ekaterina Funk",
      image: '/uploads/team_photo/no_photo.png'
    },
    {
      name: "Stefanie Anna Voss",
      image: '/uploads/team_photo/no_photo.png'
    }
  ];

  const partnerMembers = [
    {
      name: "Linda Gennies",
      image: '/uploads/team_photo/no_photo.png',
      link: "https://www.geisteswissenschaften.fu-berlin.de/we04/linguistik/histling/mitarbeiter_innen/wimi/gennies/index.html",
      institution: {
        en: "Freie Universität Berlin",
        de: "Freie Universität Berlin"
      }
    },
    {
      name: "Dr. Julia Hübner",
      image: '/uploads/team_photo/no_photo.png',
      link: "https://www.slm.uni-hamburg.de/germanistik/personen/huebner.html",
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Laura Panne",
      image: '/uploads/team_photo/no_photo.png',
      link: "https://www.slm.uni-hamburg.de/germanistik/personen/panne.html",
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Elizaveta Zimont",
      image: '/uploads/team_photo/no_photo.png',
      link: "https://www.univ-reims.fr/cirlep/l-equipe-des-chercheurs-du-cirlep/elizaveta-zimont,9931,43419.html",
      institution: "Université de Reims Champagne-Ardenne"
    }
  ];

  const alumniMembers = [
    {
      name: "Falco Risch",
      image: '/uploads/team_photo/no_photo.png',
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
  const sortedHeadMembers = sortMembersByLastName(headMembers);
  const sortedPostdocMembers = sortMembersByLastName(postdocMembers);
  const sortedPhdMembers = sortMembersByLastName(phdMembers);
  const sortedAssistantMembers = sortMembersByLastName(assistantMembers);
  const sortedWorkingMembers = sortMembersByLastName(workingMembers);
  const sortedPartnerMembers = sortMembersByLastName(partnerMembers);
  const sortedAlumniMembers = sortMembersByLastName(alumniMembers);

  return (
    <div className="min-h-screen bg-[url('/uploads/team-bg.jpg')] bg-cover bg-center">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20">
          <div className="container-custom">
            <h1 className="text-4xl font-bold text-center mb-12">{lang === 'de' ? 'Unser Team' : 'Our Team'}</h1>
            <div className="mb-12">
              {lang === 'de' ? (
                <div className="max-w-3xl mx-auto">
                  <p className="text-lg text-gray-800 mb-4">
                    Das interakademische Vorhaben wird geleitet von Prof. Dr. Natalia Filatkina (Universität Hamburg), Prof. Dr. Andrea Rapp (Technische Universität Darmstadt) und Prof. Dr. Horst Simon (Freie Universität Berlin). An drei Arbeitsstellen arbeiten Linguist:innen mit einem interdisziplinären und internationalen Expert:innennetzwerk an der Erschließung des markanten Quellenmaterials.
                  </p>
                  <div className="my-4 flex flex-col items-center">
                    <img
                      src={getImagePath('/uploads/team_photo/team_head_1.png')}
                      alt="Zitat – Anon., Dictionarius Latinis... Lyon 1530"
                      className="mx-auto w-auto max-w-full max-h-[260px] object-contain"
                    />
                    <p className="text-sm text-gray-600 italic mt-2 text-center">
                      „Ce ſont bonnes gens. Es ſind gute lute. Ce ſont amoureuſes gens. Es ſind fruntliche lute. On trouue bo(n)ne compaignie. Ma(n) findet gute geſselſchafft.“ Anon., Dictionarius Latinis, Gallicis, (et) Germanicis vocabulis conscriptus, et denuo castigatus et locupletatus, Lyon 1530. (Public Domain Mark 1.0)
                    </p>
                  </div>
                  <p className="text-lg text-gray-800 mb-4">
                    Neben regelmäßigen virtuellen Jour Fixes und Sprints in kleineren Gruppen für den kontinuierlichen Austausch kommen die Projektteams mindestens jährlich zu einer Teamklausur zusammen, um Zwischenergebnisse wirkungsvoll zusammenzuführen.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team_photo/team_head_Mainz.jpg'))}>
                      <img src={getImagePath('/uploads/team_photo/team_head_Mainz.jpg')} alt="Teamfoto Mainz" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team_photo/team_head_Hamburg.jpg'))}>
                      <img src={getImagePath('/uploads/team_photo/team_head_Hamburg.jpg')} alt="Teamfoto Hamburg" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team_photo/team_head_Berlin.jpg'))}>
                      <img src={getImagePath('/uploads/team_photo/team_head_Berlin.jpg')} alt="Teamfoto Berlin" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 italic mt-2">Eigene Fotos CC BY-SA 4.0 | FSL digital</p>
                </div>
              ) : (
                <div className="max-w-3xl mx-auto">
                  <p className="text-lg text-gray-800 mb-4">
                    The inter-academy project is led by Prof. Dr. Natalia Filatkina (University of Hamburg), Prof. Dr. Andrea Rapp (Technical University of Darmstadt) and Prof. Dr. Horst Simon (Freie Universität Berlin). At three offices, linguists work together with an interdisciplinary and international network of experts to explore this distinctive source material.
                  </p>
                  <div className="my-4 flex flex-col items-center">
                    <img
                      src={getImagePath('/uploads/team_photo/team_head_1.png')}
                      alt="Quotation – Anon., Dictionarius Latinis... Lyon 1530"
                      className="mx-auto w-auto max-w-full max-h-[260px] object-contain"
                    />
                    <p className="text-sm text-gray-600 italic mt-2 text-center">
                      „Ce ſont bonnes gens. Es ſind gute lute. Ce ſont amoureuſes gens. Es ſind fruntliche lute. On trouue bo(n)ne compaignie. Ma(n) findet gute geſselſchafft.“ Anon., Dictionarius Latinis, Gallicis, (et) Germanicis vocabulis conscriptus, et denuo castigatus et locupletatus, Lyon 1530. (Public Domain Mark 1.0)
                    </p>
                  </div>
                  <p className="text-lg text-gray-800 mb-4">
                    Alongside regular virtual jour fixes and sprints in smaller groups for ongoing exchange, the project teams meet at least once a year for a team retreat to effectively consolidate interim results.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team_photo/team_head_Mainz.jpg'))}>
                      <img src={getImagePath('/uploads/team_photo/team_head_Mainz.jpg')} alt="Team photo Mainz" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team_photo/team_head_Hamburg.jpg'))}>
                      <img src={getImagePath('/uploads/team_photo/team_head_Hamburg.jpg')} alt="Team photo Hamburg" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team_photo/team_head_Berlin.jpg'))}>
                      <img src={getImagePath('/uploads/team_photo/team_head_Berlin.jpg')} alt="Team photo Berlin" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 italic mt-2">Own photos CC BY-SA 4.0 | FSL digital</p>
                </div>
              )}
            </div>
            {zoomPhoto && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
                onClick={(e) => { if (e.target === e.currentTarget) setZoomPhoto(null); }}
              >
                <div className="relative p-2">
                  <button
                    className="absolute -top-4 -right-4 text-white text-3xl bg-black bg-opacity-60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-80"
                    onClick={() => setZoomPhoto(null)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <img src={zoomPhoto} alt="Zoomed team" className="max-w-[90vw] max-h-[80vh] object-contain bg-white rounded shadow" />
                  <p className="text-center text-sm text-gray-300 mt-3">Eigene Fotos CC BY-SA 4.0 | FSL digital</p>
                </div>
              </div>
            )}
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
                    <span>{section.key === 'assistant' ? (lang === 'de' ? 'Hilfskräfte' : 'Assistants') : section.title[lang]}</span>
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
                      {section.key === 'head' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {sortedHeadMembers.map((member, index) => (
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
