
import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  institution: string;
}

const TeamMember = ({ name, role, institution }: TeamMemberProps) => {
  return (
    <div className="flex flex-col">
      <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-600">{role}</p>
      <p className="text-sm text-primary">{institution}</p>
    </div>
  );
};

const TeamMembers = () => {
  const members = [
    {
      name: "Prof. Dr. Anna Schmidt",
      role: "Principal Investigator",
      institution: "Freie Universität Berlin"
    },
    {
      name: "Prof. Dr. Michael Weber",
      role: "Research Group Leader",
      institution: "Humboldt-Universität zu Berlin"
    },
    {
      name: "Dr. Sarah Müller",
      role: "Research Associate",
      institution: "Technische Universität Berlin"
    },
    {
      name: "Dr. Thomas Becker",
      role: "Research Associate",
      institution: "Freie Universität Berlin"
    },
    {
      name: "Julia Wagner",
      role: "Doctoral Researcher",
      institution: "Humboldt-Universität zu Berlin"
    },
    {
      name: "Alexander Klein",
      role: "Doctoral Researcher",
      institution: "Technische Universität Berlin"
    },
    {
      name: "Lisa Hoffmann",
      role: "Research Assistant",
      institution: "Freie Universität Berlin"
    },
    {
      name: "Martin Schulz",
      role: "Research Assistant",
      institution: "Humboldt-Universität zu Berlin"
    }
  ];

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center">Our Team</h2>
        <p className="section-subtitle text-center mx-auto">
          An interdisciplinary team of researchers working together on knowledge extraction and representation
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {members.map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              institution={member.institution}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
