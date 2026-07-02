import { useEffect, useState } from 'react';

const DEFAULT_STORAGE_KEY = 'fsl-human-verified';

export function useHumanVerified(storageKey: string = DEFAULT_STORAGE_KEY) {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey) === '1') setVerified(true);
  }, [storageKey]);

  const verify = () => {
    sessionStorage.setItem(storageKey, '1');
    setVerified(true);
  };

  return { verified, verify };
}
