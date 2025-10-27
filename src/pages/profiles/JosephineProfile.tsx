import React from 'react';
import { getImagePath } from '@/lib/image-utils';

const JosephineProfile = () => (
  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8 border border-gray-200">
    <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8 mb-8">
      <img src={getImagePath('/uploads/team_photo/Klingebeil.jpg')} alt="Dr. Josephine Klingebeil-Schieke" className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow" />
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold mb-2">Dr. Josephine Klingebeil-Schieke</h2>
        <div className="text-gray-700 mb-2 font-semibold">Arbeitsstellenleiterin</div>
        <div className="text-gray-600 mb-4">Historische Fremdsprachenlehrwerke digital. Sprachgeschichte, Sprachvorstellungen und Alltagskommunikation im Kontext der Mehrsprachigkeit im Europa der Frühen Neuzeit</div>
        <a href="mailto:josephine.klingebeil-schieke@bbaw.de" className="text-blue-700 underline break-all">josephine.klingebeil-schieke@bbaw.de</a>
      </div>
    </div>
    {/* Section: Wer bin ich? / Who am I? */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Wer bin ich? / Who am I?</h3>
      <div className="mb-2 text-gray-800">Ich heiße Josephine Klingebeil und leite die Arbeitsstelle Berlin des interakademischen Vorhabens FSL digital. An der Technischen Universität Dresden habe ich Kunstgeschichte und Romanistik studiert und in der italienischen und französischen Sprachwissenschaft geforscht und gelehrt. Nach Studienaufenthalten in Vicenza, Mailand und Trient promovierte ich mit einer editionsphilologischen Arbeit über eine frühneuzeitliche volkssprachliche Übersetzung eines lateinischen Prosatextes. Als vormalige Studienberaterin kenne ich die Bedürfnisse angehender Fremdsprachenlehrer:innen genau. Sich jetzt mit Lehrwerken zu beschäftigen die zum Erlernen u.a. romanischer Sprachen schon vor mehr als 300 Jahren konzipiert wurden, ist super spannend!</div>
      <div className="mb-2 text-gray-700 pl-4 border-l-2 border-gray-200 italic">My name is Josephine Klingebeil and I am the office leader of the Berlin-Brandenburg Academy of Sciences and Humanities. I have studied art history and Romance studies at the Dresden University of Technology before researching and teaching Italian and French linguistics there. After being visiting researcher at Vicenza, Milan and Trento, I completed my doctorate with a philological edition of an early modern vernacular translation of a Latin prose text. As a former student advisor, I am very familiar with the needs of prospective foreign language teachers. Working with textbooks that were designed to teach Romance languages more than 300 years ago is super exciting!</div>
    </div>
    {/* Section: Aufgaben */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Welche Aufgaben übernehme ich im Projekt? / Which tasks will I perform in the project?</h3>
      <div className="mb-2 text-gray-800">In Berlin erforschen wir vor allem die Musterdialoge auf dem Gebiet der historischen Pragmatik, Soziolinguistik, Höflichkeit und Kommunikationskultur sowie der Grammatik durch. Durch mein romanistisches Profil sehe ich meine Expertise in der Parallelisierung der verschiedensprachlichen Korpusdaten. Meine Aufgabe besteht jedoch vor allem in der Gesamtkoordination des Projektverlaufs, einschließlich der Berichtspflichten.</div>
      <div className="mb-2 text-gray-700 pl-4 border-l-2 border-gray-200 italic">In Berlin, we are mainly researching the model dialogues in the fields of historical pragmatics, sociolinguistics, politeness and communication culture, and grammar. Due to my Romance studies background, I see my expertise as being in the parallelization of the various linguistic corpus data. However, my main task is the overall coordination of the project, including reporting obligations.</div>
    </div>
    {/* Section: Lehrwerk */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Welches Fremdsprachenlehrwerk begeistert mich aktuell ganz besonders? / Which foreign language textbook currently fascinates me the most?</h3>
      <div className="mb-2 text-gray-800">1691 gab Christoph Warmer sein beeindruckendes „Gazophylacium Decem Linguarum Europæarum apertum“ heraus. Das Werk ist in vielerlei Hinsicht eine sprachliche „Schatzkiste“. Es enthält Vokabular und Dialoge in zehn verschiedenen Sprachen! Die Auswahl ist faszinierend im Hinblick auf die kulturpolitische Geographie des frühneuzeitlichen Europas. Warmers Lehrbuch erinnert mich daran, dass die Bedeutung von Sprachen als Träger von Kultur, Geschichte und Identität weit über ihre rein pragmatische Anwendung hinausgeht: Sprachen verbinden – damals wie heute.</div>
      <div className="mb-2 text-gray-700 pl-4 border-l-2 border-gray-200 italic">In 1691, Christoph Warmer published his impressive Gazophylacium Decem Linguarum Europæarum apertum. The opus is a linguistic "treasure trove" in many aspects. It contains vocabulary and dialogues in ten different languages! The selection is fascinating in terms of the cultural-political geography of early modern Europe. Warmer's Gazophylacium reminds me that the importance of languages as a vehicle for culture, history and identity goes far beyond their purely pragmatic application: languages connect – then as now.</div>
    </div>
    {/* Section: Quote */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Welches Zitat aus einem Fremdsprachenlehrwerk ist mir gerade sehr wichtig? / What quote from a foreign language textbook is very important to me right now?</h3>
      <div className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-2 italic text-gray-700">
        Wir koͤnnen nur allein mit de‧|nen einen vergnuͤgten Umgang haben, die | unſere, oder wir ihre Sprache verſtehen. | Benachbarte Nationen werden dadurch al‧|lein in den Stand geſetzt, geſellſchaftlich mit | einander umzugehen, ſo eine ſich der andern Sprache bekannt machet.
      </div>
      <div className="text-gray-600 italic mb-2">("We can only have a pleasant interaction with those who understand our language, or if we understand theirs. Neighbouring nations are thereby alone placed in the position of interacting socially with each other, so one of them makes the other language known.")</div>
      <div className="mb-2 text-gray-800">Das Zitat stammt aus einem späteren Sprachlehrbuch, was gar nicht mehr zu unserem Korpus im engeren Sinne gehört. Bachmair hat hier aber 1758 noch einmal die zentrale Bedeutung des Fremdsprachenlernens herausgestellt, die auch in den frühen "Colloquia" schon postuliert wird: "Wer hat iemals allein mit einer ſpraachen fremder nationen freundt ſchafft erlangt? vvie vil ſind reich vvorden ohne diſer ſpraachen vviſſenſchaft? Wer kann vvol regieren Stete und Lænder, da er kein andere ſprach dan allein ſein mutterſprach vveiſs?" Es ist für mich deshalb so brisant, weil in der Gegenwart, die Sinnhaftigkeit des Fremdsprachenunterrichts, auch ob der Möglichkeiten neuer Technologien, oft angeweifelt wird.</div>
      <div className="mb-2 text-gray-700 pl-4 border-l-2 border-gray-200 italic">The quotation is taken from a later language textbook, which is no longer part of our corpus in the strict sense. But here, in 1758, Bachmair once again emphasized the central importance of foreign language learning, which is also postulated in the early "Colloquia": "Who has ever established friendship with foreign nations alone through one language? How many became rich without knowledge of other languages? Who can govern cities and countries without knowing any other language than his mother tongue?" It is so controversial for me because in the present, the meaningfulness of foreign language teaching is often questioned, also because of the possibilities of new technologies.</div>
    </div>
    {/* Section: Interests */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Was interessiert mich, wenn ich nicht an FSL arbeite? / What interests me when I'm not working on FSL?</h3>
      <div className="mb-2 text-gray-800">Ich interessiere mich für Sprache im Allgemeinen und für Bücher im Speziellen. Außerdem darf es gerne einen Bezug zu "la bella Italia" haben :) - Seit Kurzem bin ich im Vorstand der Deutschen Dante-Gesellschaft aktiv und auch das ist eine sehr herausfordernde, aber auch sehr spannende Aufgabe.</div>
      <div className="mb-2 text-gray-700 pl-4 border-l-2 border-gray-200 italic">I am interested in language in general and in books in particular. Besides, it may like to have a reference to "la bella Italia" :) - Recently, I am active in the board of the German Dante Society and that is a very challenging, but also very exciting task.</div>
    </div>
    {/* Section: Projects */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Current Projects</h3>
      <ul className="list-disc ml-6 text-gray-800">
        <li>Digital Historical Foreign Language Teaching Materials - Leading the digitization and analysis of historical language learning resources</li>
        <li>Language Concepts in Historical Context - Investigating how language was understood and taught in Early Modern Europe</li>
        <li>Everyday Communication Patterns - Studying communication practices in multilingual European contexts</li>
      </ul>
    </div>
    {/* Section: Expertise */}
    <div>
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Areas of Expertise</h3>
      <ul className="list-disc ml-6 text-gray-800">
        <li>Historical Linguistics</li>
        <li>Digital Humanities</li>
        <li>Language Teaching History</li>
        <li>Early Modern European Languages</li>
        <li>Manuscript Studies and Digital Archives</li>
      </ul>
    </div>
  </div>
);

export default JosephineProfile; 