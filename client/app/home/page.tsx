"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  const handleStart = () => {
    if (status !== "authenticated") {
      router.push("/auth");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-xl"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-400 rounded-full opacity-5 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-orange-600 rounded-full opacity-8 blur-lg"></div>

      <div className="relative z-10 text-center px-6 flex flex-col items-center">
        {/* Main heading with enhanced styling */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl">
            🎧 Podify
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Description with better typography */}
        <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl leading-relaxed font-light text-center">
          Discover, stream, and enjoy podcasts on any topic you love. Your
          <span className="text-orange-400 font-medium"> personalized </span>
          podcast hub.
        </p>

        {/* Enhanced buttons */}
        <div className="flex flex-col  gap-6 items-center">
          <Button
            onClick={handleStart}
            className="px-10 py-6 bg-transparent border-2 border-orange-500 text-orange-400 font-semibold text-lg rounded-2xl hover:bg-orange-500 hover:text-black transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 min-w-[180px] text-center"
          >
            <span className="flex items-center gap-2">
              Get Started
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </span>
          </Button>
        </div>

        {/* Additional features section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="text-center p-6 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl mb-3">🎵</div>
            <h3 className="text-orange-400 font-semibold mb-2">
              High Quality Audio
            </h3>
            <p className="text-gray-400 text-sm">
              Crystal clear sound for the best listening experience
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-orange-400 font-semibold mb-2">
              Multi-Platform
            </h3>
            <p className="text-gray-400 text-sm">
              Listen anywhere, anytime on any device
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-orange-400 font-semibold mb-2">
              Smart Discovery
            </h3>
            <p className="text-gray-400 text-sm">
              Find new podcasts tailored to your interests
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
