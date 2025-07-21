import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Concept = ({ lang = 'en', setLang }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header lang={lang} setLang={setLang} />
      <main className="pt-16">
        <section className="py-20 w-full px-4 max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4 text-center">HEAD LINE</h1>
          <p className="text-lg text-gray-700 mb-8 text-center">
            This is some introductory dummy text for the Concept page. It provides a brief overview of the concept and sets the stage for the content below.
          </p>
          {/* Image Section */}
          <div className="w-full flex flex-col items-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Image Section</h2>
            <img
              src="./lovable-uploads/team_photo/no_photo.png"
              alt="Dummy Concept Visual"
              className="rounded-lg shadow-md w-full max-w-md object-cover mb-2"
            />
            <span className="text-sm text-gray-500">Figure 1: Example image for the concept section.</span>
          </div>
          {/* Key Points Section */}
          <div className="w-full mb-8">
            <h2 className="text-2xl font-semibold mb-4">Key Points</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Key point one about the concept.</li>
              <li>Another important aspect to consider.</li>
              <li>Third key point for demonstration purposes.</li>
              <li>Final dummy key point for this section.</li>
            </ul>
          </div>
          <p className="text-lg text-gray-700 text-center">
            Here is some additional dummy text to further elaborate on the concept. This section can be used to provide more details, explanations, or context as needed for the page.
          </p>
        </section>
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default Concept; 