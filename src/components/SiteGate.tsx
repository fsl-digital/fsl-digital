import React from 'react';
import { getImagePath } from '@/lib/image-utils';
import HumanGate from '@/components/HumanGate';

const SiteGate = ({ lang, setLang, onVerify }: { lang: string; setLang: (l: string) => void; onVerify: () => void }) => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white px-6">
    <div className="absolute top-6 right-6 flex items-center gap-2 text-sm">
      <button
        className={lang === 'de' ? 'font-bold text-primary' : 'text-gray-500 hover:text-gray-900'}
        onClick={() => setLang('de')}
      >
        DE
      </button>
      <span className="text-gray-300">|</span>
      <button
        className={lang === 'en' ? 'font-bold text-primary' : 'text-gray-500 hover:text-gray-900'}
        onClick={() => setLang('en')}
      >
        EN
      </button>
    </div>

    <img src={getImagePath('/uploads/FSL-WBM_klein.svg')} alt="FSL Logo" className="mb-8 max-h-20 w-auto" />

    <div className="w-full max-w-md">
      <HumanGate lang={lang} onVerify={onVerify} />
    </div>
  </div>
);

export default SiteGate;
