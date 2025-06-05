"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const Mission = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section bg-white dark:bg-accent-1 font-sans"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mission Statement */}
          <div className="animate-on-scroll opacity-0 transition-all duration-1000 delay-300 transform translate-y-8">
            <h2 className="text-3xl font-bold mb-6 text-accent-2 dark:text-primary">
              Our Mission
            </h2>
            <div className="prose prose-lg dark:prose-invert">
              <p className="mb-6 font-medium text-foreground dark:text-foreground">
                EternaLink exists to restore lost purpose and joy to the lives
                of elderly individuals and their concerned relatives by
                fostering deep, meaningful connections and engagement between
                generations.
              </p>
              <h3 className="text-xl font-semibold mb-4 text-accent-2 dark:text-primary">
                Our Vision
              </h3>
              <p className="mb-6 text-foreground dark:text-foreground">
                To create a world where every elderly person feels seen, valued,
                and connected through meaningful intergenerational relationships
                that honor the past and shape the future.
              </p>
              <div className="flex items-center gap-8 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    500+
                  </div>
                  <div className="text-sm text-foreground">
                    Elders Connected
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    50+
                  </div>
                  <div className="text-sm text-foreground">Events Hosted</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    200+
                  </div>
                  <div className="text-sm text-foreground">
                    Youth Volunteers
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image collage */}
          <div className="relative h-[500px] animate-on-scroll opacity-0 transition-all duration-1000 delay-500">
            <div className="absolute top-0 left-0 w-64 h-64 rounded-lg overflow-hidden shadow-lg transform -rotate-3 z-10">
              <Image
                src="https://images.unsplash.com/photo-1710116309099-dd220edf3f74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
                alt="Elderly person telling stories"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute top-16 right-0 w-72 h-72 rounded-lg overflow-hidden shadow-lg transform rotate-3 z-20">
              <Image
                src="https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Youth and elderly cooking together"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-10 w-80 h-64 rounded-lg overflow-hidden shadow-lg transform rotate-1 z-30">
              <Image
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Intergenerational learning"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full bg-accent-1 dark:bg-primary opacity-50"></div>
            <div className="absolute -top-10 right-20 w-16 h-16 rounded-full bg-primary dark:bg-accent-1 opacity-30"></div>
          </div>
        </div>
      </div>

      {/* CSS for the animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Mission;
