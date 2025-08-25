import React from "react";
import { motion } from "framer-motion";
import { User, ShieldCheck, Lightbulb, Eye } from "lucide-react";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100"
    >
      <div className="inline-flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 p-4 rounded-full shadow-inner">
        {icon}
      </div>
      <h3 className="mt-5 text-xl font-bold text-gray-800">{title}</h3>
      <p className="mt-3 text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white font-sans">
      {/* === 1. Hero Section === */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-purple-100 opacity-50" />
        <div className="relative container mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight"
          >
            We're on a mission to democratize finance.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600"
          >
            Digital Wallet was born from a simple idea: everyone deserves access
            to fast, fair, and simple financial services. We're a team of
            innovators dedicated to building the future of money.
          </motion.p>
        </div>
      </section>

      {/* === 2. Our Story (Timeline) Section === */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Our Journey</h2>
            <p className="mt-4 text-gray-600 text-lg">
              How a small idea grew into a movement.
            </p>
          </div>
          {/* Timeline */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 w-0.5 h-full bg-gray-200"></div>

            {[
              {
                year: "2023 - The Spark",
                text: "Our founders, frustrated with traditional banking, conceptualized a wallet that puts the user first.",
              },
              {
                year: "2024 - Building Blocks",
                text: "After securing initial funding, we assembled a core team and built our first secure prototype.",
              },
              {
                year: "2025 - Public Launch",
                text: "Digital Wallet is launched to the public, empowering users to take control of their financial lives.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative mb-12"
              >
                <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                <div
                  className={`${
                    i % 2 === 0
                      ? "ml-auto lg:ml-0 lg:w-1/2 lg:pr-8 text-right lg:text-left"
                      : "w-1/2 ml-auto pl-8 text-left"
                  }`}
                >
                  <p className="font-semibold text-lg text-blue-600">
                    {item.year}
                  </p>
                  <p className="mt-2 text-gray-600">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === 3. Core Values Section === */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              The Principles That Guide Us
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Our values are the foundation of our product and our company.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<User className="w-8 h-8" />}
              title="Customer First"
              description="Our users are at the heart of every decision we make. Your success is our success."
            />
            <ValueCard
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Unwavering Security"
              description="We are relentless in protecting your assets and data as if they were our own."
            />
            <ValueCard
              icon={<Lightbulb className="w-8 h-8" />}
              title="Constant Innovation"
              description="We are always learning, building, and pushing the boundaries of what's possible in finance."
            />
            <ValueCard
              icon={<Eye className="w-8 h-8" />}
              title="Radical Transparency"
              description="No hidden fees. No confusing jargon. We believe in clear and honest communication."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
