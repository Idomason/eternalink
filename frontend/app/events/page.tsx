"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Event data
const events = [
  {
    id: "echoes-expressions",
    title: "Echoes & Expressions Day",
    date: "Every Tuesday",
    location: "Accra Cultural Centre",
    image: "/events/echoes-expressions.jpg",
    description:
      "Elders sip tea, share life stories, act out folktales, and offer meaningful advice in a joyful, expressive gathering.",
    price: "₵25",
    category: "cultural",
    upcoming: "2023-05-16T10:00:00",
  },
  {
    id: "rhythm-reminisce",
    title: "Rhythm & Reminisce Day",
    date: "Every Thursday",
    location: "Community Hall, East Legon",
    image: "/events/rhythm-reminisce.jpg",
    description:
      "Elders dance to classic tunes, sing along to old favourites, and enjoy fun music games that spark joyful memories.",
    price: "₵30",
    category: "music",
    upcoming: "2023-05-18T14:00:00",
  },
  {
    id: "spotlight-stories",
    title: "Spotlight & Stories Day",
    date: "Every Friday",
    location: "Silver Screen Cinema, Osu",
    image: "/events/spotlight-stories.jpg",
    description:
      "Elders showcase their hidden talents and watch meaningful films followed by simple group discussions.",
    price: "₵20",
    category: "entertainment",
    upcoming: "2023-05-19T16:00:00",
  },
  {
    id: "create-compete",
    title: "Create & Compete Day",
    date: "Every Saturday",
    location: "Arts Centre, Accra",
    image: "/events/create-compete.jpg",
    description:
      "Elders make beautiful crafts and enjoy fun games that test their memory and creativity.",
    price: "₵25",
    category: "craft",
    upcoming: "2023-05-20T09:00:00",
  },
  {
    id: "flavours-festivals",
    title: "Flavours & Festivals Day",
    date: "Every Sunday",
    location: "Food Court, Accra Mall",
    image: "/events/flavours-festivals.jpg",
    description:
      "Elders cook traditional meals and share stories about cultural festivals from their communities.",
    price: "₵35",
    category: "culinary",
    upcoming: "2023-05-21T12:00:00",
  },
];

// Categories for filtering
const categories = [
  { value: "all", label: "All Events" },
  { value: "cultural", label: "Cultural" },
  { value: "music", label: "Music" },
  { value: "entertainment", label: "Entertainment" },
  { value: "craft", label: "Craft" },
  { value: "culinary", label: "Culinary" },
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on category and search query
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-2/30 to-primary/30 dark:from-accent-1/30 dark:to-primary/30 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our{" "}
              <span className="text-accent-2 dark:text-primary">Events</span>
            </h1>
            <p className="text-lg text-foreground/80 mb-8">
              Join us for specially designed programs that foster meaningful
              connections between generations and celebrate the wisdom of our
              elders.
            </p>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="section bg-white dark:bg-accent-1">
        <div className="container-custom">
          {/* Filters */}
          <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Search */}
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent-1 text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-3 top-3 text-gray-400">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-accent-1 text-foreground"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="card transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {event.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {event.title}
                    </h3>
                    <div className="flex items-center mb-2 text-sm text-foreground/70">
                      <svg
                        className="w-4 h-4 mr-1 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center mb-4 text-sm text-foreground/70">
                      <svg
                        className="w-4 h-4 mr-1 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <p className="text-foreground/80 mb-6 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/events/${event.id}`}
                        className="btn-primary"
                      >
                        Book Now
                      </Link>
                      <span className="text-sm text-foreground/60">
                        Next: {new Date(event.upcoming).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <div className="text-4xl text-foreground/30 mb-4">😢</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  No events found
                </h3>
                <p className="text-foreground/70">
                  Try adjusting your search or filter to find what you're
                  looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section bg-gradient-to-r from-accent-2/50 to-primary/50 dark:from-accent-1/50 dark:to-primary/50 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">
            Want to host a special event?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            If you'd like to organize a custom event for your elder loved ones
            or community, we're happy to help create meaningful experiences
            tailored to your needs.
          </p>
          <Link
            href="/contact"
            className="btn-outline border-white text-white hover:bg-white hover:text-primary px-8 py-3"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
