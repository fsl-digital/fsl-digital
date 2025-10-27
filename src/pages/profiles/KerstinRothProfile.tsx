import React from 'react';
import { getImagePath } from '@/lib/image-utils';

const KerstinRothProfile = () => (
  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8 border border-gray-200">
    <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8 mb-8">
      <img src={getImagePath('/uploads/team_photo/KerstinRoth.jpg')} alt="Dr. Kerstin Roth" className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow" />
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold mb-2">Dr. Kerstin Roth</h2>
        <div className="text-gray-700 mb-2 font-semibold">Wissenschaftliche Mitarbeiterin und Arbeitsstellenleitung (Hamburg)</div>
        <div className="text-gray-600 mb-4">Akademienvorhabens „historische Fremdsprachenlehrwerke digital" (FSL digital, BBAW/Mainz)</div>
        <a href="mailto:kerstin.roth@uni-hamburg.de" className="text-blue-700 underline break-all">kerstin.roth@uni-hamburg.de</a>
      </div>
    </div>
    {/* Section: ASL Hamburg */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Kerstin Roth | ASL Hamburg (seit 04|2024)</h3>
      <div className="mb-2 text-gray-800">Kerstin Roth arbeitet als Postdoc und Arbeitsstellenleiterin am Standort Hamburg des Projekts FSL digital. An der Ruprecht-Karls-Universität Heidelberg und der Technischen Universität Dresden gab sie Lehrveranstaltungen im Bereich der historischen Sprachwissenschaft/Sprachgeschichte. In ihrer Promotion hat sie sich mit Sprachgebrauch im 18. Jahrhundert beschäftigt und insbesondere mit Lebensbeschreibungen aus der Herrnhuter Brüdergemeine auseinander gesetzt.</div>
    </div>
    {/* Section: Links */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Links</h3>
      <ul className="list-disc ml-6 text-gray-800">
        <li><a href="https://www.slm.uni-hamburg.de/germanistik/personen/roth.html" target="_blank" rel="noopener" className="text-blue-700 hover:text-blue-900 underline">Webseite der UHH</a></li>
      </ul>
    </div>
    {/* Section: 3 Fragen an Kerstin Roth */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">3 Fragen an Kerstin Roth</h3>
      <div className="mb-6">
        <h4 className="font-semibold mb-2">📖 Welches Fremdsprachenlehrwerk begeistert dich aktuell ganz besonders?</h4>
        <div className="mb-2 text-gray-800">Aktuell fasziniert mich ganz besonders der Schluͤſſel zur Polniſchen und Teutſchen Sprach von Jeremias Roter (1585—1630) aus dem Jahr 1616. Jeremias Roter bietet ein Lehrwerk, das sowohl von Deutschen als auch von Polen genutzt werden kann, um die Sprache der anderen zu verstehen. Mir gefällt die Metapher vom Schlüssel, die er im Titel seines Werkes verwendet. Sein Schlüssel ermöglicht es — um im Bild zu bleiben — sich einen neue Sprache auf- und damit zu erschließen.</div>
      </div>
      <div className="mb-6">
        <h4 className="font-semibold mb-2">💬 Welches Zitat aus einem Fremdsprachenlehrwerk ist mir gerade sehr wichtig?</h4>
        <blockquote className="bg-gray-50 border-l-4 border-gray-400 p-4 mb-2 italic text-gray-700 relative">
          Jedoch / ſo iſt // die wiſſenschafft mancher= // ley Sprachen / jetziger zeit /  // zum gemeinen Leben / das  // eine Nation die ander / im  // Handel und Wandel ver=  // ſtehen moͤge / hoch noͤtig // und nuͤtzlich.
        </blockquote>
        <div className="mb-2 text-gray-800">Ich finde es beeindruckend, wie heute ganz aktuelle Themen, wie Handel in heutigem Sprachgebrauch, Wirtschaft ohne Zweifel mit dem Fremdspracherwerb verbunden ist. Jeremias Roter bietet uns ein überzeugendes Plädoyer für das Erlernen einer Fremdsprache.</div>
      </div>
      <div>
        <h4 className="font-semibold mb-2">✨ Was interessiert dich, wenn du nicht an FSL arbeitest?</h4>
        <div className="mb-2 text-gray-800">Ich interessiere mich für die Geschichte der deutschen Sprache und hier insbesondere für den Sprachgebrauch von Frauen in den vorherigen Jahrhunderten. Mit einigen Poetinnen und Wissenschaftlerinnen, ihrem Sprachgebrauch und ihren Möglichkeiten sich in der Gesellschaft zu präsentieren habe ich mich bereits in einzelnen Aufsätzen auseinander gesetzt.</div>
      </div>
    </div>
  </div>
);

export default KerstinRothProfile; 