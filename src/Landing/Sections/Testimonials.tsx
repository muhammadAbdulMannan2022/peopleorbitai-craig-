import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  summary: string;
  body: string;
  rating: number;
  avatar: string;
  name: string;
  jobTitle: string;
  jobColor: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    summary: "So Comfortable to wear and Nice Quality",
    body: "Wore these with my training tee and pods to a graduation bbq and the young bucks was all over it. Love the look and feel.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sallie1",
    name: "Sallie Butler",
    jobTitle: "Inspector",
    jobColor: "text-cyan-500",
  },
  {
    id: 2,
    summary: "Exceptional Design and Comfort",
    body: "The attention to detail in the stitching and the choice of fabric is unparalleled. It fits perfectly and feels like a second skin.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sallie2",
    name: "Marcus Aurelius",
    jobTitle: "Design Lead",
    jobColor: "text-sky-500",
  },
  {
    id: 3,
    summary: "Perfect for Every Occasion",
    body: "Whether it's a casual meeting or a formal event, this piece stands out. I've received countless compliments on its unique style.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sallie3",
    name: "Sallie Butler",
    jobTitle: "Personnel manager",
    jobColor: "text-blue-500",
  },
  {
    id: 4,
    summary: "Amazing Experience and Fast Delivery",
    body: "The team was very professional. Everything arrived on time and the quality exceeded my expectations. Highly recommended!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sallie4",
    name: "John Doe",
    jobTitle: "Operations Manager",
    jobColor: "text-emerald-500",
  },
  {
    id: 5,
    summary: "Great Support and Great Product",
    body: "Whenever I have a question, the support team is there. The product itself is built to last and looks beautiful in our office.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?u=sallie5",
    name: "Jane Smith",
    jobTitle: "Creative Director",
    jobColor: "text-purple-500",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-2xl shadow-slate-200/30 flex flex-col min-w-[280px] w-[85vw] md:w-[450px] border border-gray-50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 snap-center md:snap-start shrink-0 select-none">
    <div className="flex-1 flex  flex-col justify-between">
      <div className=" min-h-40">
        <span className="text-[#414D55] font-bold text-lg block mb-6">
          Reviews
        </span>
        <h3 className="text-[#414D55] font-extrabold text-xl mb-4 leading-snug line-clamp-1">
          {testimonial.summary}
        </h3>
        <p className="text-[#696D6E] leading-relaxed text-sm mb-6 overflow-hidden line-clamp-5 ">
          {testimonial.body}
        </p>
      </div>
      <div className="flex gap-1 mb-4 ">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={18} fill="#facc15" className="text-yellow-400" />
        ))}
      </div>
    </div>

    <div className="pt-8 border-t border-gray-100 mt-auto flex items-center gap-4">
      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-full h-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
          draggable="false"
        />
      </div>
      <div className="flex flex-col">
        <span
          className={`text-[10px] md:text-xs font-bold uppercase tracking-wider ${testimonial.jobColor}`}
        >
          {testimonial.jobTitle}
        </span>
        <span className="text-[#1a1a2e] font-bold text-base md:text-lg">
          {testimonial.name}
        </span>
      </div>
    </div>
  </div>
);

export const TestimonialSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Dragging state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const updateActiveIndex = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft: currentLeft, children } = scrollRef.current;
      if (children.length > 0) {
        const cardWidth = (children[0] as HTMLElement).offsetWidth + 32; // card + gap
        const index = Math.round(currentLeft / cardWidth);
        setActiveIndex(Math.min(Math.max(0, index), testimonials.length - 1));
      }
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", updateActiveIndex);
      return () => el.removeEventListener("scroll", updateActiveIndex);
    }
  }, [updateActiveIndex]);

  // Auto-play Logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const {
          scrollLeft: currentLeft,
          scrollWidth,
          offsetWidth,
          children,
        } = scrollRef.current;
        const cardWidth = (children[0] as HTMLElement).offsetWidth + 32;

        let nextScroll = currentLeft + cardWidth;

        // Loop back to start if at the end
        if (nextScroll >= scrollWidth - offsetWidth) {
          nextScroll = 0;
        }

        scrollRef.current.scrollTo({
          left: nextScroll,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.scrollSnapType = "none"; // Disable snapping during drag
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // multiplier for drag speed
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging.current || !scrollRef.current) return;
    isDragging.current = false;
    scrollRef.current.style.scrollSnapType = "x mandatory"; // Re-enable snapping
    scrollRef.current.style.cursor = "grab";
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth =
        (scrollRef.current.children[0] as HTMLElement).offsetWidth + 32;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 px-4 overflow-hidden relative">
      <div className="mx-auto ">
        {/* Header */}
        <div className="relative mx-auto max-w-7xl mb-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div></div>
          <div className="w-full text-center">
            <h2 className="text-5xl md:text-7xl font-black text-title-2nd mb-6 tracking-tight">
              Testimonial
            </h2>
            <p className="text-gray-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto">
              What client think about us?
            </p>
          </div>

          {/* Nav Buttons (Overlay on large screens, hidden on small screens) */}
          <div className="hidden lg:flex gap-4 absolute right-0 bottom-4 z-51">
            <button
              onClick={() => scroll("left")}
              className="group w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#818cf8] transition-all duration-300 shadow-xl active:scale-95 hover:cursor-pointer"
              aria-label="Previous"
            >
              <ChevronLeft
                size={28}
                className="transition-transform group-hover:-translate-x-0.5"
              />
            </button>
            <button
              onClick={() => scroll("right")}
              className="group w-14 h-14 rounded-full bg-white border border-gray-100 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#818cf8] transition-all duration-300 shadow-xl active:scale-95 hover:cursor-pointer"
              aria-label="Next"
            >
              <ChevronRight
                size={28}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        {/* Mobile Only Nav Buttons */}
        <div className="flex lg:hidden gap-4 mb-5 items-center justify-center">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#818cf8]"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#818cf8]"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        {/* Slider Container */}
        <div className="absolute w-30 h-full bg-linear-to-r from-white to-transparent z-50 top-0 left-0"></div>
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={() => {
            handleMouseUpOrLeave();
            setIsPaused(false);
          }}
          onMouseEnter={() => setIsPaused(true)}
          className="flex gap-8 overflow-x-auto pb-16 no-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing px-4 md:px-0 "
        >
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
          {/* Ghost card for spacing at the end */}
          <div className="min-w-px md:min-w-10 shrink-0" />
        </div>
        <div className="absolute w-30 h-full bg-linear-to-l from-white to-transparent z-50 top-0 right-0"></div>
        {/* Footer Actions / Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-4">
          {/* Pagination Dots */}
          <div className="flex items-center gap-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (scrollRef.current) {
                    const cardWidth =
                      (scrollRef.current.children[0] as HTMLElement)
                        .offsetWidth + 32;
                    scrollRef.current.scrollTo({
                      left: i * cardWidth,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`transition-all duration-500 rounded-full ${
                  i === activeIndex
                    ? "w-10 h-3 bg-[#818cf8]"
                    : "w-3 h-3 bg-slate-200 hover:bg-slate-300"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};
