import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

const SCROLL_STEP_PX = 160;

export interface UseHorizontalScrollArrowsResult {
  scrollRef: RefObject<HTMLDivElement | null>;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
}

/*══════════════════════════════════════════════════════════════════════╗
║ 🔎 useHorizontalScrollArrows                                          ║
║ Reemplaza la scrollbar nativa de una fila horizontal (ej. chips de    ║
║ categoría) por flechas — expone si hay contenido oculto a cada lado   ║
║ y funciones para desplazarse. itemCount fuerza el recálculo cuando la ║
║ lista cambia (ej. categorías que llegan async y agrandan el scrollWidth).║
╚══════════════════════════════════════════════════════════════════════╝*/
export const useHorizontalScrollArrows = (itemCount: number): UseHorizontalScrollArrowsResult => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, itemCount]);

  // Convierte la rueda del mouse (vertical) en scroll horizontal mientras el
  // cursor está sobre la fila — así no hace falta shift+scroll ni arrastrar.
  // Tiene que ser un listener nativo (no onWheel de React) para poder hacer
  // preventDefault: React registra los listeners de wheel como passive por
  // default, así que un onWheel en JSX no puede frenar el scroll de la página.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (event: WheelEvent): void => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;

      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [itemCount]);

  const scrollLeft = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -SCROLL_STEP_PX, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: SCROLL_STEP_PX, behavior: "smooth" });
  }, []);

  return { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight };
};

export default useHorizontalScrollArrows;
