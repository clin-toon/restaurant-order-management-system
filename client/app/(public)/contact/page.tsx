"use client";

import ContactButton from "@/components/contact/ContactButton";
import { useState } from "react";
import { CONTACT_INFO } from "@/data/menu-data";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    message_type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-stone-50 py-14 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {CONTACT_INFO.map(({ icon: Icon, label, lines }) => (
              <div
                key={label}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex items-start gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-1">
                    {label}
                  </p>
                  {lines.map((line) => (
                    <p
                      key={line}
                      className="text-sm text-stone-700 font-medium leading-relaxed"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl border border-stone-100 shadow-sm p-7 flex flex-col gap-5">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                Send us a message
              </h2>
              <p className="text-sm text-stone-400 mt-0.5">
                We'll get back to you within 1 hour.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                  First name
                </label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Enter your first name"
                  className="h-10 rounded-xl border border-stone-200 px-3.5 text-sm text-stone-900 placeholder:text-stone-300 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                  Last name
                </label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Enter your last name"
                  className="h-10 rounded-xl border border-stone-200 px-3.5 text-sm text-stone-900 placeholder:text-stone-300 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Phone
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Enter your phone number"
                className="h-10 rounded-xl border border-stone-200 px-3.5 text-sm text-stone-900 placeholder:text-stone-300 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Subject
              </label>
              <select
                name="message_type"
                value={formData.message_type}
                onChange={(e) => handleChange(e)}
                className="h-10 rounded-xl border border-stone-200 px-3.5 text-sm text-stone-600 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition bg-white"
              >
                <option value="">Select a topic</option>
                <option value={"General Inquiry"}>General Inquiry</option>
                <option value={"Order Issue"}>Order Issue</option>

                <option value={"Feedback"}>Feedback</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => handleChange(e)}
                rows={5}
                placeholder="Tell us what's on your mind..."
                className="rounded-xl border border-stone-200 px-3.5 py-3 text-sm text-stone-900 placeholder:text-stone-300 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition resize-none"
              />
            </div>

            <ContactButton payload={formData} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl overflow-hidden border border-stone-100 shadow-sm bg-stone-200 h-52 flex items-center justify-center relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.8727399474483!2d85.30764!3d27.71527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fcb77fd4bd%3A0x5899def90a08a608!2sThamel%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full"
            title="Eatly location — Thamel, Kathmandu"
          />
        </div>
      </div>
    </div>
  );
}
