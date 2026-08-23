import { useEffect, useRef, useState } from "react";

const INTERSECTION_THRESHOLD = 0.2;

export const useScrollInAnimation = <T extends HTMLElement = HTMLDivElement>() => {
  const ref = useRef<T>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasEntered(true);
        observer.disconnect();
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, hasEntered };
};
