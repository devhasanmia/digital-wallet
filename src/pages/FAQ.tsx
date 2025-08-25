import React, { useState } from "react";

// --- Types for FAQ Item ---
interface FaqItemProps {
  question: string;
  answer: string;
}

// --- Reusable Accordion Item Sub-component ---
const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-gray-800">{question}</span>

        {/* Arrow Icon for visual feedback */}
        <span className="flex-shrink-0 ml-4">
          <svg
            className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {/* The answer content with smooth transition */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen mt-4" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// --- Type for FAQ Data ---
interface FAQItem {
  question: string;
  answer: string;
}

// --- The Main FAQ Component ---
const FAQ: React.FC = () => {
  // Strongly typed FAQ data
  const faqData: FAQItem[] = [
    {
      question: "Is my money safe with Digital Wallet?",
      answer:
        "Absolutely. We use state-of-the-art, bank-grade security measures, including end-to-end encryption and multi-factor authentication. Your security and trust are our highest priorities.",
    },
    {
      question: "Are there any hidden fees for transactions?",
      answer:
        "No, we believe in complete transparency. Standard peer-to-peer transfers within the country are completely free. Any fees for specialized services, like international transfers, are clearly displayed before you confirm any transaction. There are no surprise charges.",
    },
    {
      question: "How quickly can I set up my account?",
      answer:
        "You can create and verify your account in under 5 minutes. Our streamlined onboarding process requires just your basic information and a valid ID to get you started right away.",
    },
    {
      question: "Can I connect my bank account?",
      answer:
        "Yes! You can easily link multiple bank accounts to your Digital Wallet for seamless top-ups and withdrawals. We support all major banks in the region.",
    },
    {
      question: "What happens if I lose my phone?",
      answer:
        "If you lose your phone, your money is still safe. Your account is protected by your PIN and biometric authentication. You can quickly block your account by contacting our 24/7 support line and restore it on a new device.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Have a question? We've got answers. If you can't find what you're
            looking for, feel free to contact our support team.
          </p>
        </div>

        {/* FAQ List */}
        <div className="max-w-3xl mx-auto">
          {faqData.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
