"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-accent-2/70 to-primary/50 flex items-center justify-center overflow-hidden font-sans">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 -z-10">
        <div className="relative w-full h-full">
          <Image
            src="https://plus.unsplash.com/premium_photo-1666955143692-8c83bebde5cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Elderly people enjoying activities"
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
            className="brightness-[0.48]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-accent-2/70 to-primary/50" />
        </div>
      </div>

      {/* Hero content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={`text-white transition-opacity duration-1000 ${
              mounted ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">Connecting</span>
              <span className="block text-accent-1">Generations</span>
              <span className="block">Through Joy</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg text-white/90">
              EternaLink bridges the generational gap through meaningful
              activities that foster deep connections between elderly
              individuals and the youth.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/register" className="btn-primary">
                Register Now
              </Link>
              <Link
                href="/events"
                className="btn-outline border-2 border-accent-2 bg-accent-2 hover:scale-105 text-white hover:bg-accent-2 hover:text-white"
              >
                Browse Events
              </Link>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl border border-white/30 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">
                Upcoming Event
              </h2>
              <div className="bg-white/20 rounded-lg p-4 mb-4">
                <div className="text-white font-semibold mb-1">
                  Echoes & Expressions Day
                </div>
                <div className="text-white/80 text-sm mb-1">
                  May 15, 2023 • 10:00 AM
                </div>
                <div className="text-white/80 text-sm">
                  Accra Cultural Centre
                </div>
              </div>
              <p className="text-white/90 text-sm mb-4">
                Elders sip tea, share life stories, act out folktales, and offer
                meaningful advice in a joyful, expressive gathering.
              </p>
              <Link
                href="/events/echoes-expressions"
                className="btn-primary w-full block text-center"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="text-white dark:text-accent-1"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,117.3C672,96,768,96,864,122.7C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
