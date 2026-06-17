import { renderHighlight } from "@/components/content/highlight";
import TimelineVertical from "@/components/timeline-vertical";

export type TimelineMilestone = {
  year: string;
  title: string;
  description: string;
  image?: string;
};

export type TimelineProps = {
  milestones: TimelineMilestone[];
  title?: string;
  highlight?: string;
};

export function Timeline({ milestones, title, highlight }: TimelineProps) {
  return (
    <section className="relative bg-primary py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {title ? (
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground text-center mb-12 lg:mb-20 uppercase">
            {renderHighlight(title, highlight)}
          </h2>
        ) : null}
        <TimelineVertical milestones={milestones} />
      </div>
    </section>
  );
}
