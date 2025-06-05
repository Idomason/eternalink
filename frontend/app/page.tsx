import Link from "next/link";
import Image from "next/image";

// Home page components
import Hero from "@/components/home/Hero";
import Mission from "@/components/home/Mission";
import EventsPreview from "@/components/home/EventsPreview";
import CallToAction from "@/components/home/CallToAction";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Mission Section */}
      <Mission />

      {/* Events Preview */}
      <EventsPreview />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Call to Action */}
      <CallToAction />
    </>
  );
}
