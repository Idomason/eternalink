"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Dashboard layout components
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error("Failed to parse user data:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Navigation items
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      name: "Messages",
      href: "/dashboard/messages",
      icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    },
    {
      name: "Events",
      href: "/dashboard/events",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      name: "Connections",
      href: "/dashboard/connections",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      name: "Resources",
      href: "/dashboard/resources",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-accent-1">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 flex z-40 md:hidden ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`fixed inset-0 bg-black/50 transition-opacity ${
            isMenuOpen
              ? "opacity-100 ease-out duration-300"
              : "opacity-0 ease-in duration-200"
          }`}
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-accent-1 transition transform ${
            isMenuOpen
              ? "translate-x-0 ease-out duration-300"
              : "-translate-x-full ease-in duration-200"
          }`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="text-xl font-bold text-accent-2 dark:text-primary">
                EternaLink
              </h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-foreground hover:bg-primary/5 dark:hover:bg-primary/20"
                >
                  <svg
                    className="mr-4 h-6 w-6 text-foreground/70 group-hover:text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <div className="h-9 w-9 bg-primary/20 flex items-center justify-center rounded-full overflow-hidden">
                <span className="text-primary font-medium text-lg">
                  {user.firstName ? user.firstName.charAt(0) : ""}
                  {user.lastName ? user.lastName.charAt(0) : ""}
                </span>
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-foreground">
                  {user.firstName} {user.lastName}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-accent-1">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-accent-2 dark:text-primary">
                  EternaLink
                </h1>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-foreground hover:bg-primary/5 dark:hover:bg-primary/20"
                  >
                    <svg
                      className="mr-3 h-6 w-6 text-foreground/70 group-hover:text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-center">
                <div className="h-9 w-9 bg-primary/20 flex items-center justify-center rounded-full overflow-hidden">
                  <span className="text-primary font-medium text-lg">
                    {user.firstName ? user.firstName.charAt(0) : ""}
                    {user.lastName ? user.lastName.charAt(0) : ""}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">
                    {user.firstName} {user.lastName}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-medium text-primary hover:text-primary-dark"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-foreground hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

// Components for different roles
const ElderDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Welcome, {user.firstName}!
        </h2>
        <p className="text-foreground/70">
          Your EternaLink journey continues. Here's what's happening in your
          community today.
        </p>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Upcoming Events
        </h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
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
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-foreground">
                Community Storytelling
              </h4>
              <div className="mt-1 text-sm text-foreground/70">
                <p>Tomorrow, 3:00 PM - 5:00 PM</p>
                <p className="mt-1">
                  Join us for an afternoon of sharing life stories and
                  experiences with youth volunteers.
                </p>
              </div>
              <div className="mt-2">
                <button className="btn-primary-sm">RSVP</button>
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-primary"
                xmlns="http://www.w3.org/2000/svg"
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
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-foreground">
                Digital Skills Workshop
              </h4>
              <div className="mt-1 text-sm text-foreground/70">
                <p>Saturday, 10:00 AM - 12:00 PM</p>
                <p className="mt-1">
                  Learn how to use smartphones, tablets, and social media
                  effectively.
                </p>
              </div>
              <div className="mt-2">
                <button className="btn-primary-sm">RSVP</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/dashboard/events"
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            View all events
          </Link>
        </div>
      </div>

      {/* Connection Suggestions */}
      <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Suggested Connections
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
                <span className="text-primary font-medium">JD</span>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-foreground">
                  Jane Doe
                </h4>
                <p className="text-sm text-foreground/70">Volunteer</p>
                <p className="text-xs text-foreground/60 mt-1">
                  Interests: Reading, Music, History
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn-outline-sm border-primary text-primary hover:bg-primary hover:text-white w-full">
                Connect
              </button>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
                <span className="text-primary font-medium">TS</span>
              </div>
              <div className="ml-4">
                <h4 className="text-base font-medium text-foreground">
                  Tom Smith
                </h4>
                <p className="text-sm text-foreground/70">Volunteer</p>
                <p className="text-xs text-foreground/60 mt-1">
                  Interests: Gardening, Cooking, Art
                </p>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn-outline-sm border-primary text-primary hover:bg-primary hover:text-white w-full">
                Connect
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/dashboard/connections"
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            See more connections
          </Link>
        </div>
      </div>
    </div>
  );
};

const CaregiverDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Welcome, {user.firstName}!
        </h2>
        <p className="text-foreground/70">
          Here's your caregiver dashboard. Monitor activities and connect with
          community resources.
        </p>
      </div>

      {/* Care Recipients */}
      <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Care Recipients
        </h3>
        <div className="space-y-4">
          <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-4">
            <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
              <span className="text-primary font-medium">MS</span>
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-foreground">
                Martha Smith
              </h4>
              <p className="text-sm text-foreground/70">Age: 78</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  2 Upcoming Events
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Active Today
                </span>
              </div>
              <div className="mt-3">
                <Link
                  href="/dashboard/care/martha"
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-start pt-2">
            <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
              <span className="text-primary font-medium">RJ</span>
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-foreground">
                Robert Johnson
              </h4>
              <p className="text-sm text-foreground/70">Age: 82</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  1 Upcoming Event
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Last Active: 2 days ago
                </span>
              </div>
              <div className="mt-3">
                <Link
                  href="/dashboard/care/robert"
                  className="text-primary hover:text-primary-dark text-sm font-medium"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn-outline-sm border-primary text-primary hover:bg-primary hover:text-white">
            Add Care Recipient
          </button>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Caregiver Resources
        </h3>
        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="text-base font-medium text-foreground">
              Caregiver Support Group
            </h4>
            <p className="text-sm text-foreground/70 mt-1">
              Connect with other caregivers to share experiences and support.
            </p>
            <p className="text-sm text-foreground/70 mt-1">
              Next meeting: Friday, 6:00 PM
            </p>
            <div className="mt-3">
              <button className="btn-primary-sm">Join Meeting</button>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h4 className="text-base font-medium text-foreground">
              Respite Care Services
            </h4>
            <p className="text-sm text-foreground/70 mt-1">
              Information about available respite care options in your area.
            </p>
            <div className="mt-3">
              <Link
                href="/dashboard/resources/respite-care"
                className="text-primary hover:text-primary-dark text-sm font-medium"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/dashboard/resources"
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            View all resources
          </Link>
        </div>
      </div>
    </div>
  );
};

const VolunteerDashboard = ({ user }: { user: any }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Welcome, {user.firstName}!
        </h2>
        <p className="text-foreground/70">
          Thank you for volunteering with EternaLink. Here's your volunteer
          dashboard.
        </p>
      </div>

      {/* Volunteer Opportunities */}
      <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Volunteer Opportunities
        </h3>
        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-medium text-foreground">
                  Digital Skills Coach
                </h4>
                <p className="text-sm text-foreground/70 mt-1">
                  Help elders learn how to use technology for communication and
                  entertainment.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Technology
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Education
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-foreground/70">
                    <span className="font-medium">Time commitment:</span> 2
                    hours/week
                  </p>
                  <p className="text-sm text-foreground/70">
                    <span className="font-medium">Location:</span> Community
                    Center / Remote
                  </p>
                </div>
              </div>
              <button className="btn-primary-sm">Apply</button>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-medium text-foreground">
                  Companion Volunteer
                </h4>
                <p className="text-sm text-foreground/70 mt-1">
                  Visit and spend quality time with elders, engaging in
                  conversation and activities.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Companionship
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                    Social
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-foreground/70">
                    <span className="font-medium">Time commitment:</span> 3-4
                    hours/week
                  </p>
                  <p className="text-sm text-foreground/70">
                    <span className="font-medium">Location:</span> Various
                    (Elder's homes)
                  </p>
                </div>
              </div>
              <button className="btn-primary-sm">Apply</button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/dashboard/opportunities"
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            See all opportunities
          </Link>
        </div>
      </div>

      {/* Current Assignments */}
      <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">
          Your Current Assignments
        </h3>
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <div className="flex items-start">
            <div className="h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full">
              <span className="text-primary font-medium">JW</span>
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-foreground">
                James Wilson
              </h4>
              <p className="text-sm text-foreground/70">Age: 75</p>
              <p className="text-sm text-foreground/70 mt-1">
                Interests: History, Chess, Gardening
              </p>
              <div className="mt-2 flex space-x-3">
                <button className="btn-primary-sm">Message</button>
                <Link
                  href="/dashboard/volunteer/james"
                  className="btn-outline-sm border-gray-300 dark:border-gray-700 text-foreground"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <h5 className="text-sm font-medium text-foreground">
              Next Scheduled Visit
            </h5>
            <p className="text-sm text-foreground/70 mt-1">
              Wednesday, 2:00 PM - 4:00 PM
            </p>
            <div className="mt-2 flex">
              <button className="btn-outline-sm border-red-300 text-red-600 hover:bg-red-50 mr-2">
                Reschedule
              </button>
              <button className="btn-outline-sm border-green-300 text-green-600 hover:bg-green-50">
                Confirm
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href="/dashboard/assignments"
            className="text-primary hover:text-primary-dark text-sm font-medium"
          >
            View all assignments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 md:px-8">
        {user.role === "elder" && <ElderDashboard user={user} />}
        {user.role === "caregiver" && <CaregiverDashboard user={user} />}
        {user.role === "volunteer" && <VolunteerDashboard user={user} />}

        {/* If role is not set or unknown */}
        {!user.role && (
          <div className="bg-white dark:bg-accent-1 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Welcome to EternaLink!
            </h2>
            <p className="text-foreground/70 mb-4">
              It looks like your profile is not completely set up. Please
              complete your profile to access personalized dashboard features.
            </p>
            <Link href="/dashboard/profile" className="btn-primary">
              Complete Profile
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
