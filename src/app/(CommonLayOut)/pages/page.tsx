import React from "react";

function Drpage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card */}
        <div className="group relative overflow-hidden rounded-3xl p-8 flex items-center min-h-[400px] hover:scale-[1.02] transition-transform duration-300">
          {/* Background with Strong Blur */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Hand Sanitizer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Stronger blur effect */}
            <div className="absolute inset-0 bg-sky-900/50 backdrop-blur-md"></div>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-900/70 to-transparent"></div>

          <div className="relative z-10 max-w-sm">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">Save 20%</h1>
            <p className="text-2xl md:text-3xl mb-3 text-white font-medium">On Sanitizers</p>
            <div className="w-16 h-1 bg-white/50 mb-4 rounded-full"></div>
            <p className="text-lg mb-8 text-white/90 font-light">
              99.9% Germ Protection
            </p>
            <button className="bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30 hover:border-white/50 transition-all px-8 py-4 rounded-full font-semibold text-white">
              Shop Now →
            </button>
          </div>
        </div>

        {/* Right Card */}
        <div className="group relative overflow-hidden rounded-3xl p-8 flex items-center min-h-[400px] hover:scale-[1.02] transition-transform duration-300">
          {/* Background with Strong Blur */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1584634731339-252c581abfc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Protective Gear"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"></div>
          </div>

          {/* White Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-l from-white/95 via-white/80 to-transparent md:from-white/90 md:via-white/60 md:to-transparent"></div>

          {/* Content */}
          <div className="relative z-10 ml-auto max-w-sm text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900">
              15% Off
            </h1>
            <p className="text-2xl md:text-3xl text-blue-700 mb-3 font-medium">
              Protective Gears
            </p>
            <div className="ml-auto w-16 h-1 bg-blue-600/30 mb-4 rounded-full"></div>
            <p className="text-lg text-gray-700 mb-8 font-light">
              Complete Covid Protection
            </p>
            <button className="bg-blue-600/90 backdrop-blur-sm hover:bg-blue-700 transition-all px-8 py-4 rounded-full font-semibold text-white shadow-lg hover:shadow-xl">
              Shop Now →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Drpage;