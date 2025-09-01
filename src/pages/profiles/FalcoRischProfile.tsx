import React from 'react';
import { getImagePath } from '@/lib/image-utils';

const FalcoRischProfile = () => (
  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative p-8 border border-gray-200">
    <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8 mb-8">
      <img src={getImagePath('/lovable-uploads/team_photo/no_photo.png')} alt="Falco Risch" className="w-40 h-40 rounded-full object-cover border-4 border-gray-200 shadow" />
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-2xl font-bold mb-2">Falco Risch</h2>
        <div className="text-gray-700 mb-2 font-semibold">Ehemaliger Mitarbeiter</div>
        <div className="text-gray-600 mb-4">Technische Universität Darmstadt</div>
        <div className="text-gray-500 mb-4">Mai 2024 - August 2025</div>
      </div>
    </div>
    {/* Section: Timeline */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Falco Risch | Ehemaliger Mitarbeiter (Mai 2024 - August 2025)</h3>
      <div className="mb-2 text-gray-800">
        Falco Risch war als ehemaliger Mitarbeiter im FSL digital Projekt tätig. Weitere Informationen zu seiner Arbeit und seinen Beiträgen zum Projekt werden hier verfügbar sein.
      </div>
    </div>
    {/* Section: Links */}
    <div className="mb-8">
      <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-4">Links</h3>
      <ul className="list-disc ml-6 text-gray-800">
        <li>Weitere Informationen folgen</li>
      </ul>
    </div>
  </div>
);

export default FalcoRischProfile;
