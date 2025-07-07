import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getImagePath } from '@/lib/image-utils';

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
  { key: 'leader', title: { en: 'Spokespersons', de: 'Sprecher' } },
  { key: 'postdoc', title: { en: 'Post Doctoral Researchers', de: 'Postdoktoranden' } },
  { key: 'phd', title: { en: 'Ph. D. Researchers', de: 'Doktoranden' } },

  { key: 'assistant', title: { en: 'Student Assistants', de: 'Studentische Hilfskräfte' } },
];

const bottomSections = [
  { key: 'working', title: { en: 'Working Students', de: 'Werkstudenten' } },
  { key: 'partners', title: { en: 'Cooperation Partners', de: 'Kooperationspartner' } },
  { key: 'alumni', title: { en: 'Former Staff Members', de: 'Ehemalige Mitarbeiter' } },
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
        en: "Freie Universität Berlin",
        de: "Freie Universität Berlin"
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
      name: "Falco Risch",
      image: '/lovable-uploads/team_photo/no_photo.png',
      institution: {
        en: "Technical University of Darmstadt",
        de: "Technische Universität Darmstadt"
      }
    },
    {
      name: "Carlotta Schilke",
      image: '/lovable-uploads/team_photo/Carlotta.jpg',
      institution: {
        en: "Berlin-Brandenburg Academy of Sciences and Humanities",
        de: "Berlin-Brandenburgische Akademie der Wissenschaften"
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
      institution: {
        en: "Freie Universität Berlin",
        de: "Freie Universität Berlin"
      }
    },
    {
      name: "Julia Hübner",
      image: '/lovable-uploads/team_photo/no_photo.png',
      institution: {
        en: "University of Hamburg",
        de: "Universität Hamburg"
      }
    },
    {
      name: "Elizaveta Zimont",
      image: '/lovable-uploads/team_photo/no_photo.png',
      institution: "Université de Reims Champagne-Ardenne"
    }
  ];

  // Sort all members by last name
  const sortedLeaderMembers = sortMembersByLastName(leaderMembers);
  const sortedPostdocMembers = sortMembersByLastName(postdocMembers);
  const sortedPhdMembers = sortMembersByLastName(phdMembers);
  const sortedAssistantMembers = sortMembersByLastName(assistantMembers);
  const sortedWorkingMembers = sortMembersByLastName(workingMembers);
  const sortedPartnerMembers = sortMembersByLastName(partnerMembers);

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
                      {sortedLeaderMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center h-full justify-between bg-transparent">
                          <img src={getImagePath(member.image)} alt={member.name} className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                          <h3 className="text-lg font-bold font-sans">
                            <a href={member.link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition">{member.name}</a>
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
                  {section.key === 'postdoc' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {sortedPostdocMembers.map((member, index) => (
                        <div key={index} className="flex flex-col items-center h-full justify-between bg-transparent">
                          <img src={getImagePath(member.image)} alt={member.name} className="w-48 h-48 object-cover rounded-lg shadow-md mb-4" />
                          <h3 className="text-lg font-bold font-sans">{member.name}</h3>
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
                          <h3 className="text-lg font-bold font-sans">{member.name}</h3>
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
                          <h3 className="text-lg font-bold font-sans">{member.name}</h3>
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
                          <h3 className="text-lg font-bold font-sans">{member.name}</h3>
                          <p className="text-center text-gray-700 mb-2 text-sm">
                            {typeof member.institution === 'string' ? member.institution : member.institution[lang]}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  {section.key === 'alumni' && (
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