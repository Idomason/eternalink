"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-accent-1/10 to-white dark:from-accent-2/20 dark:to-accent-1">
      <div className="container-custom flex flex-col items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-accent-2 dark:text-primary">
            404
          </h1>
          <h2 className="mt-4 text-2xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="mt-6 text-foreground/70 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved, deleted, or never existed.
          </p>

          <div className="mt-12 max-w-lg mx-auto">
            <div className="relative w-full h-64">
              <Image
                src="/images/not-found.svg"
                alt="Page not found illustration"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
            <Link
              href="/contact"
              className="btn-outline border-primary text-primary hover:bg-primary hover:text-white"
            >
              Contact Support
            </Link>
          </div>

          <div className="mt-8 text-foreground/60 text-sm">
            <p>
              Looking for something specific? Try searching or exploring these
              links:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/about" className="text-primary hover:underline">
                About Us
              </Link>
              <Link href="/events" className="text-primary hover:underline">
                Events
              </Link>
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
              <Link href="/register" className="text-primary hover:underline">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
