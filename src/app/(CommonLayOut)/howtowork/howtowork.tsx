"use client";

import { Info, UserPlus, ShoppingCart, Truck, CreditCard, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Account Creation",
    description: "Create your personal account using name, email, and phone number. Easy process!",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Info,
    title: "Browse & Consult",
    description: "Search for specific medicine categories or use our unique AI ChatBot for advice.",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: ShoppingCart,
    title: "Order Placement",
    description: "Add items to your cart and provide your accurate shipping address in Bangladesh.",
    bgColor: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: Truck,
    title: "Product Verification",
    description: "Our licensed pharmacists carefully review every prescription and item before shipment.",
    bgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "Pay using local methods like bKash, Rocket, or choose Cash on Delivery.",
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
];

export default function HowItWorks() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 animate-fade-in-down">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100/50">
            <Sparkles size={36} className="animate-pulse" />
          </div>
          <h1 className="text-5xl font-black text-gray-950 leading-tight">
            How MediCare Works
          </h1>
          <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
            Your simple and safe way to order medical supplies in Bangladesh. We’ve streamlined the process in just 5 essential steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className={`bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center text-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-100/30 group animate-fade-in`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Step Number */}
                <span className="absolute top-8 right-10 text-9xl font-black text-gray-100 opacity-60 transition-opacity duration-300 group-hover:opacity-20">
                  {`0${index + 1}`}
                </span>

                {/* Icon Container */}
                <div className={`w-28 h-28 ${step.bgColor} ${step.iconColor} rounded-[2rem] flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={48} />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-950 mb-5 relative z-10 group-hover:text-green-700 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed relative z-10 group-hover:text-gray-800 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* Final CTA (Optional) */}
        <div className="text-center mt-20 animate-fade-in animate-delay-1000">
            <a href="/allproduct" className="inline-block bg-green-600 text-white font-bold px-10 py-5 rounded-2xl hover:bg-green-700 hover:scale-105 transition-all text-lg shadow-lg shadow-green-600/20 active:scale-95">
              Start Browsing Now
            </a>
        </div>

      </div>
    </div>
  );
}