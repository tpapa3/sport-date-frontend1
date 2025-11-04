import React from 'react';

interface ContentProps {
  title: string;
  content: string;
}

const Content: React.FC<ContentProps> = ({ title, content }) => {
  return (
    <div className="absolute top-32 left-10 w-64 bg-transparent shadow rounded p-4 border border-transparent z-10">
      <h2 className="text-xl font-bold mb-2 text-white">{title}</h2>
      <p className="text-white">{content}</p>
    </div>
  );
};

export default Content;