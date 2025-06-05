"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Event data
const events = [
  {
    id: "echoes-expressions",
    title: "Echoes & Expressions Day",
    date: "Every Tuesday",
    image:
      "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Elders sip tea, share life stories, act out folktales, and offer meaningful advice in a joyful, expressive gathering.",
  },
  {
    id: "rhythm-reminisce",
    title: "Rhythm & Reminisce Day",
    date: "Every Thursday",
    image:
      "https://images.unsplash.com/photo-1465821185615-20b3c2fbf41b?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Elders dance to classic tunes, sing along to old favourites, and enjoy fun music games that spark joyful memories.",
  },
  {
    id: "spotlight-stories",
    title: "Spotlight & Stories Day",
    date: "Every Friday",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Elders showcase their hidden talents and watch meaningful films followed by simple group discussions.",
  },
  {
    id: "create-compete",
    title: "Create & Compete Day",
    date: "Every Saturday",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Elders make beautiful crafts and enjoy fun games that test their memory and creativity.",
  },
  {
    id: "flavours-festivals",
    title: "Flavours & Festivals Day",
    date: "Every Sunday",
    image:
      "https://images.unsplash.com/photo-1514986888952-8cd320577b68?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Elders cook traditional meals and share stories about cultural festivals from their communities.",
  },
];

const EventsPreview = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeEvent = events[activeIndex];

  return (
    <section className="section bg-accent-1/30 dark:bg-accent-2/10 relative overflow-hidden font-sans">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"></div>

      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            <span className="text-accent-2 dark:text-primary">Event</span>{" "}
            Programs
          </h2>
          <p className="max-w-2xl mx-auto text-foreground/80 dark:text-foreground/70">
            Join our specially designed programs that create meaningful
            connections between generations while celebrating the wisdom and joy
            of our elders.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Featured event */}
          <div className="rounded-xl overflow-hidden bg-white dark:bg-accent-1 shadow-lg transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1">
            <div className="relative h-72">
              <Image
                src={
                  activeEvent.image ||
                  "https://images.unsplash.com/photo-1445384763658-0400939829cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={activeEvent.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">{activeEvent.title}</h3>
                <p className="text-white/80">{activeEvent.date}</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-foreground dark:text-foreground/90 mb-6">
                {activeEvent.description}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  href={`/events/${activeEvent.id}`}
                  className="btn-primary"
                >
                  Book Now
                </Link>
                <span className="text-sm text-foreground/60 dark:text-foreground/50">
                  Next event: May 16, 2023
                </span>
              </div>
            </div>
          </div>

          {/* Event list */}
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 flex gap-4 items-center ${
                  index === activeIndex
                    ? "bg-primary/10 dark:bg-primary/20 border-l-4 border-primary"
                    : "bg-white dark:bg-accent-1 hover:bg-primary/5 dark:hover:bg-primary/10"
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={
                      event.image ||
                      "https://images.unsplash.com/photo-1445384763658-0400939829cd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3
                    className={`font-semibold ${
                      index === activeIndex
                        ? "text-accent-2 dark:text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {event.title}
                  </h3>
                  <p className="text-sm text-foreground/70">{event.date}</p>
                </div>
              </div>
            ))}
            <div className="mt-6">
              <Link
                href="/events"
                className="inline-flex items-center text-accent-2 dark:text-primary font-medium hover:underline"
              >
                View All Events
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsPreview;
