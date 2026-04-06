import React from 'react';

// মেডিকেল শপের থিম কালার (Tailwind কনফিগারেশনে এগুলো সেট করা ভালো)
const PRIMARY_COLOR = 'text-sky-600'; // আকাশী নীল - বিশ্বাসের প্রতীক
const SECONDARY_COLOR = 'bg-sky-50'; // হালকা আকাশী ব্যাকগ্রাউন্ড

export default function LoadingPage() {
    return (
        <div className={`fixed inset-0 flex flex-col items-center justify-center ${SECONDARY_COLOR} z-50`}>
            {/* ১. কাস্টম রিংস্পিনার - TailWind ক্লাস দিয়ে তৈরি */}
            <div className="relative mb-8">
                {/* বাইরের স্থির রিং */}
                <div className="w-20 h-20 border-4 border-sky-100 rounded-full"></div>
                
                {/* ভেতরের ঘুরন্ত রিং */}
                <div className={`absolute top-0 left-0 w-20 h-20 border-4 border-t-transparent ${PRIMARY_COLOR} border-r-transparent border-b-transparent rounded-full animate-spin`}></div>
                
                {/* একদম ভেতরের মেডিকেল আইকন বা ডট */}
                <div className={`absolute top-0 left-0 flex items-center justify-center w-20 h-20 ${PRIMARY_COLOR}`}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2.5} 
                        stroke="currentColor" 
                        className="w-10 h-10 animate-pulse" // পালস এনিমেশন
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" 
                        />
                    </svg>
                </div>
            </div>

            {/* ২. ব্র্যান্ডের নাম এবং লোডিং টেক্সট */}
            <div className="text-center">
                <h1 className={`text-4xl font-extrabold tracking-tight ${PRIMARY_COLOR} mb-3`}>
                    Medicare<span className="text-slate-900">Shop</span>
                </h1>
                
                <div className="flex items-center justify-center gap-1.5 text-slate-700">
                    <span className="text-lg font-medium">আপনার স্বাস্থ্যসেবা নিশ্চিত করা হচ্ছে</span>
                    {/* ৩টি ডট এনিমেশন */}
                    <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce"></span>
                    </span>
                </div>
            </div>

            {/* ৩. একটি ছোট স্কোয়ার ডিকোরেশন (ঐচ্ছিক) */}
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-sky-100 rounded-lg -rotate-12 opacity-50"></div>
            <div className="absolute top-20 right-20 w-12 h-12 bg-sky-200 rounded-full opacity-40"></div>
        </div>
    );
}