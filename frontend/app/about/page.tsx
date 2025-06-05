import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-2/30 to-primary/30 dark:from-accent-1/30 dark:to-primary/30 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              About{" "}
              <span className="text-accent-2 dark:text-primary">
                EternaLink
              </span>
            </h1>
            <p className="text-lg text-foreground/80 mb-8">
              Bridging generations through meaningful connections, preserving
              wisdom, and fostering relationships that enrich lives.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-white dark:bg-accent-1">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-accent-2 dark:text-primary">
                Our Mission
              </h2>
              <p className="text-foreground dark:text-foreground/90 mb-6">
                EternaLink exists to restore lost purpose and joy to the lives
                of elderly individuals and their concerned relatives by
                fostering deep, meaningful connections and engagement between
                generations.
              </p>
              <h2 className="text-3xl font-bold mb-6 text-accent-2 dark:text-primary">
                Our Vision
              </h2>
              <p className="text-foreground dark:text-foreground/90">
                To create a world where every elderly person feels seen, valued,
                and connected through meaningful intergenerational relationships
                that honor the past and shape the future.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1710116309099-dd220edf3f74?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8"
                alt="Elderly and youth connecting"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <blockquote className="text-lg italic">
                    "When generations connect, magic happens."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-accent-1/30 dark:bg-accent-2/10">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Our{" "}
              <span className="text-accent-2 dark:text-primary">Values</span>
            </h2>
            <p className="max-w-2xl mx-auto text-foreground/80">
              The principles that guide our work and shape our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-accent-1 p-8 rounded-xl shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Respect
              </h3>
              <p className="text-foreground/80">
                We honor the dignity, experiences, and contributions of all
                individuals, regardless of age, background, or ability.
              </p>
            </div>

            <div className="bg-white dark:bg-accent-1 p-8 rounded-xl shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 3l-6 6m0 0V4m0 5h5M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Connection
              </h3>
              <p className="text-foreground/80">
                We believe in the power of meaningful relationships to combat
                isolation, foster understanding, and create community.
              </p>
            </div>

            <div className="bg-white dark:bg-accent-1 p-8 rounded-xl shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                Legacy
              </h3>
              <p className="text-foreground/80">
                We value the preservation of knowledge, traditions, and skills
                across generations, ensuring valuable wisdom is not lost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white dark:bg-accent-1">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Our <span className="text-accent-2 dark:text-primary">Team</span>
            </h2>
            <p className="max-w-2xl mx-auto text-foreground/80">
              Meet the dedicated individuals working to build bridges between
              generations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member */}
            <div className="bg-white dark:bg-accent-1 rounded-xl shadow-md overflow-hidden">
              <div className="relative h-80">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="John Doe - Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-foreground">
                  John Doe
                </h3>
                <p className="text-accent-2 dark:text-primary mb-4">
                  Founder & CEO
                </p>
                <p className="text-foreground/80 mb-4">
                  With a passion for elder care and community building, John
                  founded EternaLink to address the growing isolation among
                  elderly populations.
                </p>
              </div>
            </div>

            {/* Team Member */}
            <div className="bg-white dark:bg-accent-1 rounded-xl shadow-md overflow-hidden">
              <div className="relative h-80">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Jane Smith - Programs Director"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-foreground">
                  Jane Smith
                </h3>
                <p className="text-accent-2 dark:text-primary mb-4">
                  Programs Director
                </p>
                <p className="text-foreground/80 mb-4">
                  Jane brings 15 years of experience in community programming
                  and has developed our core event initiatives to maximize
                  engagement.
                </p>
              </div>
            </div>

            {/* Team Member */}
            <div className="bg-white dark:bg-accent-1 rounded-xl shadow-md overflow-hidden">
              <div className="relative h-80">
                <Image
                  src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Samuel Johnson - Outreach Coordinator"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1 text-foreground">
                  Samuel Johnson
                </h3>
                <p className="text-accent-2 dark:text-primary mb-4">
                  Outreach Coordinator
                </p>
                <p className="text-foreground/80 mb-4">
                  Samuel works directly with elders and youth to identify needs,
                  facilitate connections, and ensure everyone feels welcome and
                  valued.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
