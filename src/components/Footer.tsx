import React from 'react';

const footerText = {
  partners: {
    en: "Partners",
    de: "Partner"
  },
  funding: {
    en: `The project is funded by the Berlin-Brandenburg Academy of Sciences
and Humanities as well as the Academy of Sciences, Humanities and
Literature in Mainz has offices in Berlin, Hamburg, and Darmstadt.
The academy project »FSL digital« is part of the academy programme, coordinated by
the Union of the German Academies of Sciences and Humanities.`,
    de: `Das Projekt wird von der Berlin-Brandenburgischen Akademie der Wissenschaften
und der Akademie der Wissenschaften und der Literatur Mainz gefördert und hat Büros in Berlin, Hamburg und Darmstadt.
Das Akademieprojekt »FSL digital« ist Teil des Akademienprogramms, koordiniert von
der Union der deutschen Akademien der Wissenschaften.`
  },
  copyright: {
    en: "© 2025 FSL digital. All rights reserved.",
    de: "© 2025 FSL digital. Alle Rechte vorbehalten."
  },
  privacy: {
    en: "Privacy Policy",
    de: "Datenschutz"
  },
  terms: {
    en: "Terms of Use",
    de: "Nutzungsbedingungen"
  },
  imprint: {
    en: "Imprint",
    de: "Impressum"
  },
  follow: {
    en: "Follow Us",
    de: "Folgen Sie uns"
  }
};

const Footer = ({ lang = "en" }) => {
  return (
    <footer id="contact" className="bg-primary text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Partner Logos */}
          <div>
            <h3 className="text-xl font-bold mb-4">{footerText.partners[lang]}</h3>
            <div className="grid grid-cols-3 grid-rows-2 gap-4">
              <div className="bg-white p-3 rounded flex items-center justify-center">
                <img 
                  src="/lovable-uploads/e62e1d4c-eb23-4999-a343-7aa9eaef245d.png" 
                  alt="Berlin-Brandenburgische Akademie der Wissenschaften" 
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-3 rounded flex items-center justify-center">
                <img 
                  src="/lovable-uploads/f93f4ed5-e4fc-4601-a318-b04e96cb8496.png" 
                  alt="Akademie der Wissenschaften und der Literatur Mainz" 
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-3 rounded flex items-center justify-center">
                <img 
                  src="/lovable-uploads/TU_Darmstadt_Logo.svg" 
                  alt="Technische Universität Darmstadt" 
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-3 rounded flex items-center justify-center">
                <img 
                  src="/lovable-uploads/647b4adf-ff44-4560-97f0-68b12a9ee388.png" 
                  alt="DHI London" 
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-3 rounded flex items-center justify-center">
                <img 
                  src="/lovable-uploads/faa7ed66-4f5f-46c5-b921-d0dcf0ff3ddd.png" 
                  alt="Freie Universität" 
                  className="max-h-16 w-auto"
                />
              </div>
              <div className="bg-white p-3 rounded flex items-center justify-center">
                <img 
                  src="/lovable-uploads/b54eef16-85d4-4667-b0f1-9c94d089aeba.svg" 
                  alt="Union der Deutschen Akademien der Wissenschaften" 
                  className="max-h-16 w-auto"
                />
              </div>
            </div>
          </div>
          
          {/* Middle Column - Social Media */}
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-4">{footerText.follow[lang]}</h3>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/fsl_digital/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://fedihum.org/@fsldigital" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="Mastodon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 274">
                  <path fill="currentColor" d="M249.874 164.085c-3.753 19.307-33.613 40.438-67.908 44.533c-17.883 2.134-35.49 4.095-54.266 3.234c-30.705-1.407-54.933-7.33-54.933-7.33c0 2.99.184 5.836.553 8.498c3.992 30.302 30.047 32.118 54.728 32.964c24.912.852 47.094-6.142 47.094-6.142l1.023 22.521s-17.425 9.357-48.465 11.078c-17.116.94-38.369-.43-63.122-6.983c-53.686-14.21-62.92-71.436-64.332-129.502c-.43-17.24-.165-33.497-.165-47.094c0-59.375 38.903-76.779 38.903-76.779C58.6 4.074 92.259.286 127.25 0h.86c34.991.286 68.673 4.074 88.287 13.083c0 0 38.901 17.404 38.901 76.78c0 0 .488 43.807-5.425 74.222"/>
                  <path fill="currentColor" d="M209.413 94.469v71.894H180.93V96.582c0-14.71-6.19-22.176-18.57-22.176c-13.687 0-20.547 8.857-20.547 26.37v38.195h-28.315v-38.195c0-17.513-6.862-26.37-20.55-26.37c-12.379 0-18.568 7.466-18.568 22.176v69.78H45.897V94.47c0-14.694 3.741-26.37 11.256-35.009c7.75-8.638 17.898-13.066 30.496-13.066c14.575 0 25.613 5.602 32.911 16.808l7.095 11.893l7.096-11.893c7.296-11.206 18.334-16.808 32.911-16.808c12.597 0 22.745 4.428 30.496 13.066c7.513 8.639 11.255 20.315 11.255 35.009"/>
                </svg>
              </a>
              <a href="https://bsky.app/profile/fsldigital.bsky.social" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors" aria-label="Bluesky">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 256 226">
                  <path fill="currentColor" d="M55.491 15.172c29.35 22.035 60.917 66.712 72.509 90.686c11.592-23.974 43.159-68.651 72.509-90.686C221.686-.727 256-13.028 256 26.116c0 7.818-4.482 65.674-7.111 75.068c-9.138 32.654-42.436 40.983-72.057 35.942c51.775 8.812 64.946 38 36.501 67.187c-54.021 55.433-77.644-13.908-83.696-31.676c-1.11-3.257-1.63-4.78-1.637-3.485c-.008-1.296-.527.228-1.637 3.485c-6.052 17.768-29.675 87.11-83.696 31.676c-28.445-29.187-15.274-58.375 36.5-67.187c-29.62 5.041-62.918-3.288-72.056-35.942C4.482 91.79 0 33.934 0 26.116C0-13.028 34.314-.727 55.491 15.172"/>
                </svg>
              </a>
            </div>
          </div>
          
          {/* Right Column - Project Funding Text */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-justify">
              {footerText.funding[lang]}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-gray-300">
          <div className="flex flex-wrap justify-between items-center">
            <div>{footerText.copyright[lang]}</div>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="hover:text-secondary">{footerText.privacy[lang]}</a>
              <a href="#" className="hover:text-secondary">{footerText.terms[lang]}</a>
              <a href="#" className="hover:text-secondary">{footerText.imprint[lang]}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
