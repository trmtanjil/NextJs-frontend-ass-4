"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Cute Girl",
    role: "Designation",
    image: "https://i.pravatar.cc/150?img=47",
    message:
      "Lorem Ipsum is simply dummy text of the typesetting and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a book.",
  },
  {
    name: "John Doe",
    role: "CEO",
    image: "https://i.pravatar.cc/150?img=12",
    message:
      "Lorem Ipsum is simply dummy text of the printing industry. It has survived not only five centuries, but also the leap into electronic typesetting.",
  },
];

export default function OurClientSay() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  const next = () =>
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  const data = testimonials[index];

  return (
    <section className="bg-sky-100 py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Our Client Say!
        </h2>
        <p className="text-gray-600 mb-12">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </p>

        {/* Card */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-xl px-10 py-12 relative z-10">
            <div className="flex flex-col items-center">
              <img
                src={data.image}
                alt={data.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              <h4 className="text-xl font-bold text-gray-900">
                {data.name}
              </h4>
              <p className="text-sm text-gray-500 mb-6">{data.role}</p>

              <p className="text-gray-700 max-w-3xl leading-relaxed">
                {data.message}
              </p>
            </div>
          </div>

          {/* Left Button */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            <ChevronLeft />
          </button>

          {/* Right Button */}
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
