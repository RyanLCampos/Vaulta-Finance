import { useEffect, useRef } from "react";

export default function InfiniteCarousel({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollLeft = container.scrollWidth / 3;

    const onScroll = () => {
      const maxScroll = container.scrollWidth;
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;

      if (scrollLeft < width) {
        container.scrollLeft = scrollLeft + maxScroll / 3;
      }

      if (scrollLeft > maxScroll - width * 2) {
        container.scrollLeft = scrollLeft - maxScroll / 3;
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="
        flex gap-6 overflow-x-scroll snap-x snap-mandatory
        lg:overflow-visible lg:snap-none
        scrollbar-hide
      "
    >
      {children}
      {children}
      {children}
    </div>
  );
}