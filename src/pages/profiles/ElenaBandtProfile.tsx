import React from 'react';
import { getImagePath } from '@/lib/image-utils';

const ElenaBandtProfile = () => (
  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8 border border-gray-200">
    <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8 mb-8">
      <img src={getImagePath('/lovable-uploads/team_photo/BandtElena.jpg')} alt="Elena Bandt" className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow" />
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold mb-2">Elena Bandt</h2>
        <div className="text-gray-700 mb-2 font-semibold">Doktorandin und wissenschaftliche Mitarbeiterin</div>
        <div className="text-gray-600 mb-2">Historische Fremdsprachenlehrwerke digital</div>
        <div className="text-gray-600 mb-4">Berlin-Brandenburgische Akademie der Wissenschaften</div>
        <a href="mailto:elena.bandt@bbaw.de" className="text-blue-700 underline break-all">elena.bandt@bbaw.de</a>
      </div>
    </div>
    {/* Section: Wer bin ich? */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Wer bin ich?</h3>
      <div className="mb-2 text-gray-800">Ich bin Elena Bandt und arbeite als Doktorandin und wissenschaftliche Mitarbeiterin im Projekt Historische Fremdsprachenlehrwerke digital am Standort Berlin. Davor habe ich Romanistik mit Schwerpunkt Französisch in Jena, Nizza und Potsdam studiert, wo ich auch als wissenschaftliche Mitarbeiterin am Lehrstuhl für romanische Sprachwissenschaft tätig war. Meine Masterarbeit habe ich zum Thema „Spracheinstellungen im Wahlkampf: die Rolle des Bretonischen in den französischen Regionalwahlen 2021" geschrieben. Nach dem Studium habe ich Deutsch als Fremdsprache unterrichtet, unter anderem ein Jahr als DAAD-Sprachassistentin an der Universität Aveiro.</div>
    </div>
    {/* Section: Aufgaben */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Welche Aufgaben übernehme ich im Projekt?</h3>
      <div className="mb-2 text-gray-800">Ich bringe eine romanische Perspektive in die Projektarbeit ein und beschäftige mich vor allem mit Texten der Fremsprachenlehrwerke im Bereich der historischen Soziolinguistik.</div>
    </div>
    {/* Section: Lehrwerk */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Welches Fremdsprachenlehrwerk begeistert mich aktuell ganz besonders?</h3>
      <div className="mb-2 text-gray-800">Besonders faszinierend finde ich die Colloquia. Diese oft sehr kleinformatigen Gesprächsbücher enthalten Musterdialoge zu alltägliche Themen wie Reisen, Handel, Mahlzeiten oder Smalltalk. Häufig sind die Gespräche in sechs oder acht (mitunter sogar noch mehr) verschiedene Sprachen übersetzt, was eine interessante Perspektive für den Sprachvergleich und auf die Mehrsprachigkeit im frühneuzeitlichen Europa bietet. Neben linguistischen Fragestellungen lassen sich so auch verschiedenste soziokulturelle Themen historisch untersuchen.</div>
    </div>
    {/* Section: Interests */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Was interessiert mich, wenn ich nicht an FSL arbeite?</h3>
      <div className="mb-2 text-gray-800">Neben historischer Linguistik faszinieren mich auch soziolinguistische Themen, zum Beispiel Spracheinstellungen und diskursanalytische Forschung. Auch Auch Deutsch als Fremdsprache bleibt für mich ein relevantes Themenfeld, sowohl in der Forschung als auch in der Praxis.</div>
    </div>
  </div>
);

export default ElenaBandtProfile; 