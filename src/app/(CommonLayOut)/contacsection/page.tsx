/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Swal from "sweetalert2";

function Contacsection() {
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "b9563cb5-f125-4f7a-a23b-8a1809ae2520");
    const object = Object.fromEntries(formData.entries());
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: json,
      });

      const res = await response.json();

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Message sent!",
          text: "Thank you for your message. I'll get back to you soon.",
          showConfirmButton: false,
          timer: 2000,
          background: "#fff",
          color: "#1a1a1a",
          iconColor: "#22c55e", // Primary Green
        });
        form.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Send failed",
          text: res.message || "Please try again later.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Send failed",
        text: "Something went wrong. Please try again later.",
      });
      console.error("Contact form submit error:", error);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Get In <span className="text-green-600">Touch</span>
          </h2>
          <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg italic">
            Your health is our priority. Have questions? We are here to help
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-4">
            <ContactInfoCard 
              icon={<Mail className="w-6 h-6 text-green-600" />}
              title="Email Us"
              value="trmtanjil02@gmail.com"
              link="mailto:trmtanjil02@gmail.com"
            />
            <ContactInfoCard 
              icon={<Phone className="w-6 h-6 text-green-600" />}
              title="Call Us"
              value="+880 1867913057"
              link="tel:+8801867913057"
            />
            <ContactInfoCard 
              icon={<MapPin className="w-6 h-6 text-green-600" />}
              title="Visit Us"
              value="Narsingdi, Dhaka, Bangladesh"
            />

            {/* Social Connect */}
            <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h4 className="font-bold mb-4 dark:text-white uppercase tracking-wider text-sm">Connect With Me</h4>
              <div className="flex space-x-4">
                <SocialLink href="https://www.linkedin.com/in/trm-tanjil/" icon={<Linkedin size={22} />} />
                <SocialLink href="https://github.com/trmtanjil" icon={<Github size={22} />} />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-2xl font-bold mb-8 dark:text-white">Send a Message</h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-300 ml-1">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="John Doe" 
                  required 
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 transition-all outline-none" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold dark:text-gray-300 ml-1">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="john@example.com" 
                  required 
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 transition-all outline-none" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold dark:text-gray-300 ml-1">Your Message</label>
                <textarea 
                  name="message" 
                  placeholder="How can we help you?" 
                  required 
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 transition-all outline-none resize-none h-40"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button 
                  type="submit" 
                  className="group w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex justify-center items-center gap-3 transition-all transform hover:scale-[1.01] shadow-lg shadow-green-500/20"
                >
                  Send Message 
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper Components for cleaner code
function ContactInfoCard({ icon, title, value, link }: any) {
  return (
    <div className="flex items-center bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:border-green-500/50 transition-all group">
      <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/20 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="ml-4">
        <h4 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h4>
        {link ? (
          <a href={link} className="text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors text-base truncate block max-w-[200px]">
            {value}
          </a>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-base">{value}</p>
        )}
      </div>
    </div>
  );
}

function SocialLink({ href, icon }: any) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-600 hover:text-white transition-all shadow-sm"
    >
      {icon}
    </a>
  );
}

export default Contacsection;