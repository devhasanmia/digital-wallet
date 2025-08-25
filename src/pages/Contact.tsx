import React, { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("✅ Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Contact Us
        </h2>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Name</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-3">
              <User className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent py-2 outline-none text-gray-900 dark:text-white"
                placeholder="Enter your name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-3">
              <Mail className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent py-2 outline-none text-gray-900 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Message</label>
            <div className="flex items-start border border-gray-300 dark:border-gray-700 rounded-lg px-3">
              <MessageSquare className="h-5 w-5 text-gray-400 mt-2 mr-2" />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-transparent py-2 outline-none resize-none text-gray-900 dark:text-white"
                rows={4}
                placeholder="Write your message..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
