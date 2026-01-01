import React, { useEffect, useMemo, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getImagePath } from '@/lib/image-utils';
import JosephineProfile from './profiles/JosephineProfile';
import KerstinRothProfile from './profiles/KerstinRothProfile';
import ElenaBandtProfile from './profiles/ElenaBandtProfile';
import LivBuechlerProfile from './profiles/LivBuechlerProfile';
import FalcoRischProfile from './profiles/FalcoRischProfile';

type TeamMember = {
  section: string;
  name: string;
  email?: string;
  image: string;
  link?: string;
  institution: { en: string; de: string };
  timeline?: { en: string; de: string };
  profileSlug?: string;
};

const defaultImage = '/uploads/team/no_photo.png';

const getLastName = (fullName: string) => {
  const parts = fullName.split(' ');
  return parts[parts.length - 1];
};

const sortMembersByLastName = (members: TeamMember[]) => {
  return [...members].sort((a, b) => {
    const lastNameA = getLastName(a.name);
    const lastNameB = getLastName(b.name);
    return lastNameA.localeCompare(lastNameB);
  });
};

const parseCsvRow = (line: string) => {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const next = line[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
};

const parseTeamCsv = (text: string): TeamMember[] => {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];

  const headers = parseCsvRow(lines[0]).map((h) => h.trim());
  const rows: TeamMember[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    const cols = parseCsvRow(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = cols[idx] ?? '';
    });

    const normalize = (value: string) => (value || '').trim().replace(/\\n/g, '\n');
    const section = row.section?.trim().toLowerCase() || '';

    rows.push({
      section,
      name: row.name?.trim() || 'Unnamed',
      email: row.email?.trim() || undefined,
      image: row.image?.trim() || defaultImage,
      link: row.link?.trim() || undefined,
      institution: {
        en: normalize(row.institution_en),
        de: normalize(row.institution_de),
      },
      timeline:
        row.timeline_en || row.timeline_de
          ? { en: normalize(row.timeline_en), de: normalize(row.timeline_de) }
          : undefined,
      profileSlug: row.profile_slug?.trim() || undefined,
    });
  }

  return rows;
};

const sections = [
  { key: 'leader', title: { en: 'Spokespersons or Project Leaders', de: 'Projektleitungen' } },
  { key: 'head', title: { en: 'Head of Office', de: 'Projektkoordination' } },
  { key: 'postdoc', title: { en: 'Team Leader', de: 'Arbeitsstellenleiter:innen' } },
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
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [open, setOpen] = useState({});
  const [showKlingebeilModal, setShowKlingebeilModal] = useState(false);
  const [showRothModal, setShowRothModal] = useState(false);
  const [showBandtModal, setShowBandtModal] = useState(false);
  const [showBuechlerModal, setShowBuechlerModal] = useState(false);
  const [showFalcoRischModal, setShowFalcoRischModal] = useState(false);
  const [zoomPhoto, setZoomPhoto] = useState<string | null>(null);

  const toggle = (key) => setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    let canceled = false;

    const loadCsv = async () => {
      try {
        setLoading(true);
        setLoadError(null);
        const response = await fetch(getImagePath('/uploads/team/team.csv'), { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`CSV fetch failed (${response.status})`);
        }
        const text = await response.text();
        if (canceled) return;
        setMembers(parseTeamCsv(text));
      } catch (error) {
        if (!canceled) {
          setLoadError(error instanceof Error ? error.message : 'Failed to load team data');
        }
      } finally {
        if (!canceled) {
          setLoading(false);
        }
      }
    };

    loadCsv();
    return () => {
      canceled = true;
    };
  }, []);

  const grouped = useMemo(() => {
    const groups: Record<string, TeamMember[]> = {
      leader: [],
      head: [],
      postdoc: [],
      phd: [],
      assistant: [],
      working: [],
      partners: [],
      alumni: [],
    };

    members.forEach((member) => {
      const key = member.section;
      if (groups[key]) {
        groups[key].push(member);
      }
    });

    return {
      leader: sortMembersByLastName(groups.leader),
      head: sortMembersByLastName(groups.head),
      postdoc: sortMembersByLastName(groups.postdoc),
      phd: sortMembersByLastName(groups.phd),
      assistant: sortMembersByLastName(groups.assistant),
      working: sortMembersByLastName(groups.working),
      partners: sortMembersByLastName(groups.partners),
      alumni: sortMembersByLastName(groups.alumni),
    };
  }, [members]);

  const sortedLeaderMembers = grouped.leader;
  const sortedHeadMembers = grouped.head;
  const sortedPostdocMembers = grouped.postdoc;
  const sortedPhdMembers = grouped.phd;
  const sortedAssistantMembers = grouped.assistant;
  const sortedWorkingMembers = grouped.working;
  const sortedPartnerMembers = grouped.partners;
  const sortedAlumniMembers = grouped.alumni;

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
                      src={getImagePath('/uploads/team/team_head_1.png')}
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
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team/team_head_Mainz.jpg'))}>
                      <img src={getImagePath('/uploads/team/team_head_Mainz.jpg')} alt="Teamfoto Mainz" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team/team_head_Hamburg.jpg'))}>
                      <img src={getImagePath('/uploads/team/team_head_Hamburg.jpg')} alt="Teamfoto Hamburg" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team/team_head_Berlin.jpg'))}>
                      <img src={getImagePath('/uploads/team/team_head_Berlin.jpg')} alt="Teamfoto Berlin" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
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
                      src={getImagePath('/uploads/team/team_head_1.png')}
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
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team/team_head_Mainz.jpg'))}>
                      <img src={getImagePath('/uploads/team/team_head_Mainz.jpg')} alt="Team photo Mainz" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team/team_head_Hamburg.jpg'))}>
                      <img src={getImagePath('/uploads/team/team_head_Hamburg.jpg')} alt="Team photo Hamburg" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
                    </button>
                    <button type="button" className="relative group" onClick={() => setZoomPhoto(getImagePath('/uploads/team/team_head_Berlin.jpg'))}>
                      <img src={getImagePath('/uploads/team/team_head_Berlin.jpg')} alt="Team photo Berlin" className="w-full h-72 object-cover rounded-md shadow cursor-zoom-in" />
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
            {loadError && (
              <p className="text-center text-red-600 font-semibold mb-4">
                {lang === 'de' ? 'Teamdaten konnten nicht geladen werden.' : 'Failed to load team data.'}
              </p>
            )}
            {loading && !members.length && !loadError && (
              <p className="text-center text-gray-700 mb-4">
                {lang === 'de' ? 'Teamdaten werden geladen...' : 'Loading team data...'}
              </p>
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
                              {member.email && (
                                <div className="mt-auto w-full flex justify-center">
                                  <a href={`mailto:${member.email}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                                </div>
                              )}
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
                              {member.email && (
                                <div className="mt-auto w-full flex justify-center">
                                  <a href={`mailto:${member.email}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                                </div>
                              )}
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
                              {member.email && (
                                <div className="mt-auto w-full flex justify-center">
                                  <a href={`mailto:${member.email}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                                </div>
                              )}
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
                              {member.email && (
                                <div className="mt-auto w-full flex justify-center">
                                  <a href={`mailto:${member.email}`} className="px-3 py-1 bg-gray-100 text-gray-700 rounded font-medium border border-gray-300 hover:bg-gray-200 transition">Email</a>
                                </div>
                              )}
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


