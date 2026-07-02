import React, { useState } from 'react';

const HumanGate = ({ lang, onVerify, message }: { lang: string; onVerify: () => void; message?: { en: string; de: string } }) => {
  const [checked, setChecked] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleClick = () => {
    if (checked || verifying) return;
    setVerifying(true);
    window.setTimeout(() => {
      setChecked(true);
      setVerifying(false);
      onVerify();
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={checked}
        disabled={verifying}
        className={`flex items-center gap-3 rounded-lg border px-5 py-3 text-sm font-medium shadow-sm transition-colors ${
          checked ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-300 bg-white text-gray-700 hover:border-primary'
        }`}
      >
        <span
          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 ${
            checked ? 'border-green-600 bg-green-600' : 'border-gray-400'
          }`}
        >
          {verifying && (
            <svg className="h-3 w-3 animate-spin text-gray-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {checked && (
            <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
        {lang === 'de' ? 'Ich bin kein Roboter' : "I'm not a robot"}
      </button>
      <p className="max-w-sm text-xs text-gray-400">
        {lang === 'de'
          ? message?.de ?? 'Bitte bestätigen Sie, dass Sie kein automatisiertes Programm sind, um fortzufahren.'
          : message?.en ?? 'Please confirm you are not an automated tool to continue.'}
      </p>
    </div>
  );
};

export default HumanGate;
