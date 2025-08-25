import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, ShieldCheck, QrCode, Zap } from "lucide-react";

// --- Feature Card Icon Wrapper ---
const FeatureIcon = ({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) => {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-600",
    teal: "bg-teal-100 text-teal-600",
    indigo: "bg-indigo-100 text-indigo-600",
  };
  return (
    <div
      className={`flex-shrink-0 h-14 w-14 rounded-xl flex items-center justify-center ${colorClasses[color]} shadow-inner`}
    >
      {children}
    </div>
  );
};

// --- FAQ Accordion Item ---
const FaqItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="h-6 w-6 text-gray-500"
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
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden"
      >
        <p className="text-gray-600 leading-relaxed mt-3">{answer}</p>
      </motion.div>
    </div>
  );
};

// --- Main Component ---
const Features = () => {
  return (
    <div className="bg-white font-sans">
      {/* === 1. Hero Section === */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 py-24 sm:py-32 lg:py-40 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight"
          >
            Finance, Made{" "}
            <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
              Effortless
            </span>
          </motion.h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            A modern wallet designed to give you control, security, and speed —
            all in one app.
          </p>
          <div className="mt-10 flex justify-center gap-x-4">
            <a
              href="#"
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
            >
              Get Started
            </a>
            <a
              href="#core-features"
              className="bg-white text-gray-700 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition transform hover:scale-105"
            >
              Explore Features
            </a>
          </div>
        </div>
      </div>

      {/* === 2. Core Features (Zig-Zag) === */}
      <section id="core-features" className="py-24 sm:py-32">
        <div className="container mx-auto px-6 md:px-8 space-y-24">
          {[
            {
              title: "Move Money Instantly",
              desc: "Send money to anyone in seconds with bank-grade security.",
              points: [
                "✔ Instant peer-to-peer transfers",
                "✔ Real-time notifications",
                "✔ Full history tracking",
              ],
              img: "https://res.cloudinary.com/deicntkum/image/upload/v1756094599/ss_xyln85.png",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {item.title}
                </h2>
                <p className="mt-4 text-lg text-gray-600">{item.desc}</p>
                <ul className="mt-6 space-y-3 text-gray-700">
                  {item.points.map((p, i) => (
                    <li key={i} className="flex items-center gap-x-3">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 p-8 rounded-2xl shadow-lg">
                <div className="bg-white  rounded-xl flex items-center justify-center text-gray-400">
                  <img src={item.img} alt="" width={300} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === 3. Extra Features Grid === */}
      {/* === 3. Extra Features Grid === */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              All-in-One Power
            </h2>
            <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
              Manage all your financial needs in one super app.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <FeatureIcon color="blue">
                <Zap className="h-7 w-7" />
              </FeatureIcon>
              <h3 className="mt-5 text-xl font-bold text-gray-800">
                Send Money
              </h3>
              <p className="mt-2 text-gray-600">
                Transfer funds instantly to anyone, anytime.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <FeatureIcon color="teal">
                <Smartphone className="h-7 w-7" />
              </FeatureIcon>
              <h3 className="mt-5 text-xl font-bold text-gray-800">Cash Out</h3>
              <p className="mt-2 text-gray-600">
                Withdraw cash easily from agents or ATMs.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <FeatureIcon color="indigo">
                <QrCode className="h-7 w-7" />
              </FeatureIcon>
              <h3 className="mt-5 text-xl font-bold text-gray-800">Deposit</h3>
              <p className="mt-2 text-gray-600">
                Add money to your account securely in seconds.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <FeatureIcon color="blue">
                <ShieldCheck className="h-7 w-7" />
              </FeatureIcon>
              <h3 className="mt-5 text-xl font-bold text-gray-800">Withdraw</h3>
              <p className="mt-2 text-gray-600">
                Withdraw funds safely to your bank or wallet.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white/90 backdrop-blur p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <FeatureIcon color="teal">
                <Zap className="h-7 w-7" />
              </FeatureIcon>
              <h3 className="mt-5 text-xl font-bold text-gray-800">Bill Pay</h3>
              <p className="mt-2 text-gray-600">
                Pay utility bills and subscriptions in one tap.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* === 4. FAQ Section === */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6 md:px-8 max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-gray-600 text-lg">
              Quick answers to common questions.
            </p>
          </div>
          <FaqItem
            question="Is my money safe?"
            answer="Yes. We use encryption, fraud detection, and multi-factor authentication to protect your funds."
          />
          <FaqItem
            question="Are transfers free?"
            answer="Yes, peer-to-peer transfers are free. Any service charges are shown upfront."
          />
          <FaqItem
            question="How long to set up an account?"
            answer="Less than 1 minutes with your valid info and smartphone or pc or leptop."
          />
        </div>
      </section>
    </div>
  );
};

export default Features;
