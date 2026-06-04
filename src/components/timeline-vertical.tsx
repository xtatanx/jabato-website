"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Beer, Sparkles } from "lucide-react";
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
  const lastIndex = milestones.length - 1;

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });

  const heightPercentage = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={timelineRef} className="relative">
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-brand/20" />
      <motion.div
        className="absolute top-0 left-1/2 w-0.5 -translate-x-1/2 origin-top bg-brand"
        style={{ height: heightPercentage }}
      />

      <div className="mx-auto max-w-5xl space-y-14 md:space-y-20">
        {milestones.map((milestone, index) => {
          const isLeft = index % 2 === 0;
          const isFirst = index === 0;
          const isLast = index === lastIndex;
          const showIcon = isFirst || isLast;

          return (
            <motion.article
              key={`${milestone.year}-${milestone.title}`}
              className={`relative flex pl-14 md:pl-0 ${
                isLeft
                  ? "md:flex-row md:pr-[50%]"
                  : "md:flex-row-reverse md:pl-[50%]"
              }`}
              itemScope
              itemType="https://schema.org/Event"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute top-0 left-6 z-10 md:left-1/2 md:-translate-x-1/2">
                {showIcon ? (
                  <motion.div
                    className="flex size-12 items-center justify-center rounded-full border-4 border-primary bg-brand text-primary md:size-14"
                    initial={{ scale: 0.85, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                  >
                    {isFirst ? (
                      <Beer className="size-5 md:size-6" aria-hidden />
                    ) : (
                      <Sparkles className="size-5 md:size-6" aria-hidden />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    className="size-4 rounded-full border-[3px] border-primary bg-brand md:size-5"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35 }}
                  />
                )}
              </div>

              <div
                className={`flex flex-col gap-3 md:gap-4 ${
                  isLeft
                    ? "md:items-end md:pr-12 md:text-right"
                    : "md:items-start md:pl-12 md:text-left"
                }`}
              >
                <time
                  itemProp="startDate"
                  dateTime={milestone.year}
                  className="text-4xl font-extrabold text-brand md:text-6xl lg:text-7xl"
                >
                  {milestone.year}
                </time>
                <h3
                  itemProp="name"
                  className="text-xl font-extrabold uppercase text-primary-foreground md:text-3xl"
                >
                  {milestone.title}
                </h3>
                <p
                  itemProp="description"
                  className="max-w-md text-sm leading-relaxed text-primary-foreground/90 md:text-base"
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
