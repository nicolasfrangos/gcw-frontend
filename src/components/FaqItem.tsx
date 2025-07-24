'use client';

import { useState } from 'react';

type FaqItemProps = {
  question: string;
  answer: React.ReactNode;
};

export default function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-4 flex justify-between items-center"
      >
        <span className="text-lg font-medium">{question}</span>
        <span>{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && <div className="pb-4 pr-8 text-gray-700">{answer}</div>}
    </div>
  );
}
