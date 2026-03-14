"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  image?: string;
}

interface TimelineVerticalProps {
  milestones: TimelineMilestone[];
}

export default function TimelineVertical({
  milestones,
}: TimelineVerticalProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Track scroll progress relative to the timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  // Apply spring physics for ultra-smooth animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to height percentage
  const heightPercentage = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={timelineRef} className="relative">
      {/* Background Line - Centered */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-brand/20" />

      {/* Animated Progress Line - Centered with Motion */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-1 bg-brand origin-top"
        style={{
          height: heightPercentage,
          willChange: "transform",
        }}
      />

      <div className="max-w-5xl mx-auto space-y-12 md:space-y-16 lg:space-y-20">
        {milestones.map((milestone, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.article
              key={milestone.year}
              className={`relative flex ${
                isLeft
                  ? "md:flex-row md:pr-[50%] md:pl-0"
                  : "md:flex-row-reverse md:pl-[50%] md:pr-0"
              } pl-16 md:pl-0 md:pr-0`}
              itemScope
              itemType="https://schema.org/Event"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Dot - Centered on line */}
              <motion.div
                className={`absolute top-0 w-7 h-7 md:w-10 md:h-10 bg-brand rounded-full border-4 md:border-[5px] border-primary z-10 ${
                  isLeft
                    ? "left-8 md:left-1/2 md:-translate-x-1/2"
                    : "left-8 md:left-1/2 md:-translate-x-1/2"
                }`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              />

              <div
                className={`flex flex-col gap-3 md:gap-4 ${
                  isLeft
                    ? "md:pr-10 lg:pr-12 md:items-end md:text-right"
                    : "md:pl-10 lg:pl-12 md:items-start md:text-left"
                }`}
              >
                <time
                  itemProp="startDate"
                  dateTime={milestone.year}
                  className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-brand"
                >
                  {milestone.year}
                </time>
                <h3
                  itemProp="name"
                  className="text-xl md:text-3xl lg:text-4xl font-extrabold text-primary-foreground uppercase"
                >
                  {milestone.title}
                </h3>
                {milestone.image && (
                  <motion.div
                    className="w-full max-w-sm aspect-video relative rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={milestone.image}
                      alt={`${milestone.title} - ${milestone.year}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}
                <p
                  itemProp="description"
                  className="text-sm md:text-base lg:text-lg text-primary-foreground/90 leading-relaxed max-w-md"
                >
                  {milestone.description}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
