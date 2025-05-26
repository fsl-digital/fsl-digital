import React from 'react';
import { BookOpen, Database, Network, FileSearch, RefreshCw, Lock } from 'lucide-react';

interface ResearchAreaProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ResearchArea = ({ title, description, icon }: ResearchAreaProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 text-center">
      <div className="text-primary mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className={`text-gray-600 ${description === "1200" || description === "10" || description === "800" || description === "5" || description === "16" || description === "2" ? "text-7xl font-extrabold text-primary" : ""}`}>{description}</p>
    </div>
  );
};

const ResearchAreas = () => {
  const areas = [
    {
      title: "Total FSL",
      description: "1200",
      icon: <BookOpen size={28} />
    },
    {
      title: "Work in Progress",
      description: "10",
      icon: <Database size={28} />
    },
    {
      title: "Total FSL collected",
      description: "800",
      icon: <Network size={28} />
    },
    {
      title: "Annotation",
      description: "5",
      icon: <FileSearch size={28} />
    },
    {
      title: "Number of Bibliography",
      description: "16",
      icon: <RefreshCw size={28} />
    },
    {
      title: "FSL Publication",
      description: "2",
      icon: <Lock size={28} />
    }
  ];

  return (
    <section id="research" className="py-20">
      <div className="container-custom">
        <h2 className="section-title text-center">Corpus</h2>
        <p className="section-subtitle text-center mx-auto">
          This section will describe the corpus and its features. (Replace this with your actual corpus description.)
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {areas.map((area, index) => (
            <ResearchArea
              key={index}
              title={area.title}
              description={area.description}
              icon={area.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchAreas;
