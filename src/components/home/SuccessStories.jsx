"use client";

import { motion } from "framer-motion";

const stories = [
  {
    title: "Found a technical co-founder in 5 days",
    name: "Aisha Rahman",
    role: "Founder, BuildFlow",
    text: "StartupForge helped me connect with the right developer quickly. We built our MVP and started user testing within weeks.",
  },
  {
    title: "Built a full product team",
    name: "Mahi Hasan",
    role: "Founder, EduSpark",
    text: "I posted my startup idea, received quality applications, and assembled a small but strong team without wasting time.",
  },
  {
    title: "Got my first startup role",
    name: "Sabbir Karim",
    role: "Frontend Developer",
    text: "I found an opportunity that matched my skills and joined a startup I actually believed in. The process was smooth and fast.",
  },
];

export default function SuccessStories() {
  return (
    <section className="bg-background py-20 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-blue-400">
              Success Stories
            </p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl text-foreground">
              Real results from real people
            </h2>
            <p className="mt-4 max-w-2xl text-default-500">
              See how founders and collaborators are using StartupForge to build
              teams, find opportunities, and launch faster.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story, index) => (
            <motion.article
              key={story.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="h-full rounded-3xl border border-divider bg-white dark:bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-blue-400/40 hover:bg-default-100 dark:hover:bg-white/10"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-2xl text-blue-300">
                “
              </div>

              <h3 className="text-xl font-semibold text-foreground">{story.title}</h3>

              <p className="mt-4 text-sm leading-7 text-default-600">
                {story.text}
              </p>

              <div className="mt-6 border-t border-divider pt-5">
                <p className="font-semibold text-foreground">{story.name}</p>
                <p className="text-sm text-default-500">{story.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}