"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    content:
      "EternaLink has brought so much joy back into my life. I've made new friends and get to share my cooking skills with the younger generation. The events are always well organized and I look forward to them every week.",
    name: "Abena Mensah",
    role: "Elder, 78",
    avatar:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: 2,
    content:
      "As a caregiver to my father, I was struggling to provide him with meaningful social interactions. EternaLink has been a blessing - he's happier, more engaged, and loves teaching the youth about traditional herbal remedies.",
    name: "Kwame Osei",
    role: "Caregiver",
    avatar:
      "https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: 3,
    content:
      "Volunteering with EternaLink has been one of the most rewarding experiences of my life. The wisdom I've gained from the elders is invaluable, and I've learned so much about our cultural heritage.",
    name: "Akosua Boateng",
    role: "Youth Volunteer, 22",
    avatar:
      "https://images.unsplash.com/photo-1699726242536-bceab822e024?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D",
  },
  {
    id: 4,
    content:
      "I never thought I'd be teaching young people how to use smartphones at my age! The skill-sharing aspect of EternaLink works both ways - I share my traditional knowledge, and they help me navigate technology.",
    name: "Joseph Addo",
    role: "Elder, 82",
    avatar:
      "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?q=80&w=300&h=300&auto=format&fit=crop",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="section bg-gradient-to-br from-primary/5 to-secondary/10 dark:from-accent-2/20 dark:to-primary/20 font-sans">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Voices of{" "}
            <span className="text-accent-2 dark:text-primary">Connection</span>
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/80 dark:text-foreground/70">
            Hear from the people whose lives have been transformed through
            intergenerational connections and meaningful activities.
          </p>
        </div>

        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white dark:bg-accent-1 rounded-2xl shadow-xl p-8 md:p-12">
            {/* Quote icon */}
            <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div className="mb-8">
              <p className="text-foreground dark:text-foreground/90 text-lg md:text-xl italic mb-6">
                "{testimonials[activeIndex].content}"
              </p>
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground dark:text-foreground">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-sm text-foreground/70 dark:text-foreground/50">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-primary scale-125"
                      : "bg-gray-300 dark:bg-gray-700 hover:bg-primary/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Background decorative elements */}
          <div className="absolute -z-10 top-1/3 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -z-10 bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-secondary/20 blur-3xl"></div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white dark:bg-accent-1 p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">97%</div>
            <div className="text-sm text-foreground/80">Satisfaction Rate</div>
          </div>
          <div className="bg-white dark:bg-accent-1 p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">42</div>
            <div className="text-sm text-foreground/80">Communities Served</div>
          </div>
          <div className="bg-white dark:bg-accent-1 p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">3500+</div>
            <div className="text-sm text-foreground/80">Hours Shared</div>
          </div>
          <div className="bg-white dark:bg-accent-1 p-6 rounded-xl shadow-md">
            <div className="text-4xl font-bold text-primary mb-2">25+</div>
            <div className="text-sm text-foreground/80">
              Partner Organizations
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
