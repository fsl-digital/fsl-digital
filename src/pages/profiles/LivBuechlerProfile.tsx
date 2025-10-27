import React from 'react';
import { getImagePath } from '@/lib/image-utils';

const LivBuechlerProfile: React.FC = () => {
  return (
    <div className="text-gray-900">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-8 border-b border-gray-200">
        <img
          src={getImagePath('/uploads/team_photo/liv.jpg')}
          alt="Liv Büchler"
          className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-gray-200 shadow-md mb-4 md:mb-0"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2">Liv Büchler</h1>
          <div className="text-base text-gray-700 mb-2">
            <p>Wissenschaftliche Mitarbeiterin und Doktorandin</p>
            <p>Historische Fremdsprachenlehrwerke digital</p>
            <p>Berlin-Brandenburgische Akademie der Wissenschaften</p>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <a href="mailto:liv.buechler@bbaw.de" className="text-blue-700 hover:underline break-all">liv.buechler@bbaw.de</a>
            <a href="mailto:liv.buechler@fu-berlin.de" className="text-blue-700 hover:underline break-all">liv.buechler@fu-berlin.de</a>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Liv Büchler | BBAW Berlin</h2>
          <p className="text-gray-800 mb-2">
            Mein Name ist Liv Büchler und ich bin wissenschaftliche Mitarbeiterin und Doktorandin am Berliner Standort des Projekts FSL digital. In meinem Promotionsprojekt untersuche ich Personenreferenzen in den Lehrwerken. Darüber hinaus bin ich an historischer Mündlichkeit interessiert und nehme daher insbesondere die Dialogteile in den Blick.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Aktuelle Tätigkeit</h2>
          <p className="text-gray-800 mb-2">
            An der Freien Universität Berlin gebe ich Lehrveranstaltungen zum Sprachwandel und an der Schnittstelle Deutsch als Fremdsprache und Historische Linguistik.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Vorherige Position</h2>
          <p className="text-gray-800 mb-2">
            Vor Projektstart an der BBAW war ich wissenschaftliche Mitarbeiterin im Teilprojekt „Fremdsprachenlernen und -lehren: Neukonfigurationen der Volkssprachlichkeit in der Frühen Neuzeit“ im SFB „Episteme in Bewegung“ (FU Berlin).
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold border-b-2 border-gray-300 pb-1 mb-2 text-gray-700">Links</h2>
          <ul className="list-disc pl-5 text-blue-700">
          <li>
              <a href="https://www.bbaw.de/die-akademie/mitarbeiterinnen-mitarbeiter/buechler-liv" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Webseite der BBAW Berlin
              </a>
            </li>
            <li>
              <a href="https://www.geisteswissenschaften.fu-berlin.de/we04/linguistik/histling/mitarbeiter_innen/wimi/buechler/index.html" target="_blank" rel="noopener noreferrer" className="hover:underline">
                Webseite der FU Berlin
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LivBuechlerProfile; 
