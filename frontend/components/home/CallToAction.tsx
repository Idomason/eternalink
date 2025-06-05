"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        container.classList.add("animate-reveal");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="section bg-gradient-to-r from-accent-2 to-primary dark:from-accent-1 dark:to-primary text-white overflow-hidden">
      <div
        ref={containerRef}
        className="container-custom relative opacity-0 transform translate-y-10 transition-all duration-1000"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Community Today
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Whether you're an elder seeking connection, a caregiver looking
              for support, or a youth wanting to volunteer, there's a place for
              you in our EternaLink family.
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Subscription Details
              </h3>
              <p className="mb-4 opacity-90">
                Support our mission with a small monthly contribution that helps
                us organize quality events and create meaningful experiences.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/20 rounded-lg p-4 text-center flex-1">
                  <div className="font-bold text-2xl mb-1">₵50</div>
                  <div className="text-sm opacity-80">Monthly</div>
                </div>
                <div className="bg-primary-dark rounded-lg p-4 text-center flex-1 transform scale-110 shadow-lg">
                  <div className="font-bold text-2xl mb-1">₵500</div>
                  <div className="text-sm opacity-80">Yearly (Save ₵100)</div>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Send payment to: 0599531912 (Mobile Money)</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Send your name and email as reference</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="btn-outline border-white hover:bg-white hover:text-primary px-8 py-3"
              >
                Register Now
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-accent-1 underline underline-offset-4 flex items-center"
              >
                Contact Us
                <svg
                  className="h-5 w-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative h-[500px] w-full">
              <div className="absolute top-0 right-0 w-64 h-80 rounded-xl overflow-hidden shadow-2xl transform rotate-6 z-10">
                <Image
                  src="https://images.unsplash.com/photo-1454418747937-bd95bb945625?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Elder teaching youth"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-80 rounded-xl overflow-hidden shadow-2xl transform -rotate-6 z-20">
                <Image
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Youth helping elder with technology"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/20 animate-float"></div>
            <div className="absolute bottom-20 right-10 w-10 h-10 rounded-full bg-white/10 animate-float-slow"></div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-reveal {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default CallToAction;
