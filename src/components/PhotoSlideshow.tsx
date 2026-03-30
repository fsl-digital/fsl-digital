import type { MouseEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { getImagePath } from '@/lib/image-utils';
import { parseCsv, sanitizeText } from '@/lib/csv';

type CaptionMap = Record<string, { credits: string; en: string; de: string }>;

type PhotoSlideshowProps = {
  lang?: 'de' | 'en';
  csvPath: string;
  defaultCaptions?: CaptionMap;
  defaultImageFiles?: string[];
  imageClassName?: string;
  wrapperClassName?: string;
  captionClassName?: string;
};

const FADE_DURATION = 1000;
const SLIDE_INTERVAL = 5000;
const DATE_IN_FILENAME_PATTERN = /(\d{4}-\d{2}-\d{2})/;

const parseFilenameDate = (filename: string) => {
  const match = filename.match(DATE_IN_FILENAME_PATTERN);
  if (!match) return null;

  const parsed = Date.parse(match[1]);
  return Number.isNaN(parsed) ? null : parsed;
};

const sortImageFiles = (files: string[]) =>
  [...files].sort((a, b) => {
    const dateA = parseFilenameDate(a);
    const dateB = parseFilenameDate(b);

    if (dateA !== null && dateB !== null && dateA !== dateB) {
      return dateB - dateA;
    }

    if (dateA !== null && dateB === null) return -1;
    if (dateA === null && dateB !== null) return 1;

    return a.localeCompare(b);
  });

const imageExists = (src: string) =>
  new Promise<boolean>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });

const PhotoSlideshow = ({
  lang = 'en',
  csvPath,
  defaultCaptions = {},
  defaultImageFiles = [],
  imageClassName = 'w-[32rem] h-[24rem] object-cover bg-white shadow-lg',
  wrapperClassName = 'relative h-[28rem] flex flex-col items-center justify-start self-start group',
  captionClassName = 'text-center mt-2 text-xs text-gray-700',
}: PhotoSlideshowProps) => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const timerRef = useRef<ReturnType<typeof window.setInterval> | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [captions, setCaptions] = useState<CaptionMap>(defaultCaptions);
  const [imageFiles, setImageFiles] = useState(defaultImageFiles);

  const images = imageFiles.map((file) => getImagePath(`/uploads/photo/${file}`));
  const imageCount = imageFiles.length;

  const clearTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    clearTimer();
    if (modalOpen || imageCount <= 1) return;

    timerRef.current = window.setInterval(() => {
      setFade(true);
      window.setTimeout(() => {
        setCurrent((prev) => (prev + 1) % imageCount);
        setFade(false);
      }, FADE_DURATION);
    }, SLIDE_INTERVAL);
  };

  const goTo = (idx: number) => {
    if (imageCount === 0) return;

    setFade(true);
    window.setTimeout(() => {
      setCurrent((idx + imageCount) % imageCount);
      setFade(false);
    }, FADE_DURATION);
  };

  const handlePrev = () => {
    clearTimer();
    goTo(current - 1);
    if (!modalOpen) startTimer();
  };

  const handleNext = () => {
    clearTimer();
    goTo(current + 1);
    if (!modalOpen) startTimer();
  };

  useEffect(() => {
    setFade(false);
    startTimer();
    return clearTimer;
  }, [imageCount, modalOpen]);

  useEffect(() => {
    let cancelled = false;
    const url = getImagePath(csvPath);

    fetch(url)
      .then((r) => r.text())
      .then(async (text) => {
        const rows = parseCsv(text);
        const map: CaptionMap = {};
        const csvImageFiles = new Set<string>();

        rows.forEach((r: any) => {
          const name = sanitizeText(r.name || r.filename || r.file);
          if (!name) return;

          const credits = sanitizeText(r.credits);
          const en = sanitizeText(r.en || r.EN || r.english);
          const de = sanitizeText(r.de || r.DE || r.german);

          if (!credits && !en && !de) return;

          csvImageFiles.add(name);
          map[name] = { credits, en, de };
        });

        const candidateFiles =
          csvImageFiles.size > 0 ? sortImageFiles(Array.from(csvImageFiles)) : defaultImageFiles;
        const validatedFiles = await Promise.all(
          candidateFiles.map(async (file) => ({
            file,
            exists: await imageExists(getImagePath(`/uploads/photo/${file}`)),
          }))
        );

        if (cancelled) return;

        const nextImageFiles = validatedFiles.filter(({ exists }) => exists).map(({ file }) => file);
        const fallbackFiles = defaultImageFiles;
        const safeFiles = nextImageFiles.length > 0 ? nextImageFiles : fallbackFiles;

        setImageFiles(safeFiles);
        setCurrent((prev) => (safeFiles.length > 0 ? prev % safeFiles.length : 0));
        setCaptions({ ...defaultCaptions, ...map });
      })
      .catch(() => {
        setImageFiles(defaultImageFiles);
        setCaptions(defaultCaptions);
      });

    return () => {
      cancelled = true;
    };
  }, [csvPath, defaultCaptions, defaultImageFiles]);

  const handleModalOpen = () => {
    setModalOpen(true);
    clearTimer();
  };

  const handleModalClose = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('modal-bg')) {
      setModalOpen(false);
      startTimer();
    }
  };

  const handleModalCloseButton = () => {
    setModalOpen(false);
    startTimer();
  };

  const handleModalPrev = () => {
    if (imageCount === 0) return;
    setCurrent((current - 1 + imageCount) % imageCount);
  };

  const handleModalNext = () => {
    if (imageCount === 0) return;
    setCurrent((current + 1) % imageCount);
  };

  if (imageCount === 0) return null;

  return (
    <>
      <div className={wrapperClassName}>
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100 z-20"
          aria-label="Previous photo"
          style={{ outline: 'none', border: 'none' }}
        >
          {'<'}
        </button>
        <img
          src={images[current]}
          alt="slide"
          className={`${imageClassName} transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'} cursor-zoom-in`}
          style={{ borderRadius: 0 }}
          onClick={handleModalOpen}
        />
        <div className={captionClassName}>
          <span>{captions[imageFiles[current]]?.[lang]}</span>
          <br />
          <span className="italic text-gray-500">{captions[imageFiles[current]]?.credits}</span>
        </div>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100 z-20"
          aria-label="Next photo"
          style={{ outline: 'none', border: 'none' }}
        >
          {'>'}
        </button>
      </div>

      {modalOpen && (
        <div
          className="modal-bg fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div className="relative">
            <button
              onClick={handleModalPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center shadow z-10"
              aria-label="Previous photo"
              style={{ outline: 'none', border: 'none' }}
            >
              {'<'}
            </button>
            <button
              className="absolute top-2 right-2 text-white text-3xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center z-10 hover:bg-opacity-80"
              onClick={handleModalCloseButton}
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={images[current]}
              alt="zoomed slide"
              className="max-w-[90vw] max-h-[80vh] object-contain bg-white rounded shadow-lg"
            />
            <div className="text-center mt-4 text-base text-white">
              <span>{captions[imageFiles[current]]?.[lang]}</span>
              <br />
              <span className="italic text-gray-300">{captions[imageFiles[current]]?.credits}</span>
            </div>
            <button
              onClick={handleModalNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center shadow z-10"
              aria-label="Next photo"
              style={{ outline: 'none', border: 'none' }}
            >
              {'>'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoSlideshow;
