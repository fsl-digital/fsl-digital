import React, { useState, useEffect, useRef } from 'react';

const content = {
  en: {
    heading: (
      <>
        Fremd <span className="text-red-600">|</span> Sprachen <span className="text-blue-900">|</span> Lehrwerke
      </>
    ),
    description: "I want a small description about what is FSL-Digital."
  },
  de: {
    heading: (
      <>
        Fremd <span className="text-red-600">|</span> Sprachen <span className="text-blue-900">|</span> Lehrwerke
      </>
    ),
    description: "Hier kommt später die deutsche Beschreibung von FSL-Digital hin."
  }
};

const images = [
  '/lovable-uploads/photo/photo1.png',
  '/lovable-uploads/photo/photo2.png',
  '/lovable-uploads/photo/photo3.png',
  '/lovable-uploads/photo/photo4.png',
  '/lovable-uploads/photo/photo5.png',
  '/lovable-uploads/photo/photo6.png',
  '/lovable-uploads/photo/photo7.png',
];

const FADE_DURATION = 1000; // ms
const SLIDE_INTERVAL = 5000; // ms

const Hero = ({ lang = "en" }) => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const timerRef = useRef(null);

  // Arrow navigation handlers
  const goTo = (idx) => {
    setFade(true);
    setTimeout(() => {
      setCurrent((idx + images.length) % images.length);
      setFade(false);
    }, FADE_DURATION);
  };
  const handlePrev = () => {
    clearInterval(timerRef.current);
    goTo(current - 1);
    startTimer(current - 1);
  };
  const handleNext = () => {
    clearInterval(timerRef.current);
    goTo(current + 1);
    startTimer(current + 1);
  };
  const startTimer = (startIdx = current) => {
    timerRef.current = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setFade(false);
      }, FADE_DURATION);
    }, SLIDE_INTERVAL);
  };

  useEffect(() => {
    setFade(false); // Ensure first image is visible
    startTimer();
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl font-bold leading-tight mb-6">
              {content[lang].heading}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {content[lang].description}
            </p>
          </div>
          <div className="relative h-80 flex flex-col items-center justify-center group">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100 z-20"
              aria-label="Previous photo"
              style={{ outline: 'none', border: 'none' }}
            >
              {'<'}
            </button>
            {/* Image */}
            <img
              src={images[current]}
              alt="slide"
              className={`w-96 h-72 object-cover border-4 border-primary bg-white shadow-lg transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}
              style={{ borderRadius: 0 }}
            />
            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-primary hover:text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100 z-20"
              aria-label="Next photo"
              style={{ outline: 'none', border: 'none' }}
            >
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
