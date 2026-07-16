import type { SxProps, Theme } from "@mui/material";

export interface CardCarouselItem {
    id: string;
    content: React.ReactNode;
    /** Ancho en px de esta card en particular. Si se omite, usa `defaultCardWidth`. */
    width?: number;
}

export interface CardCarouselProps {
    /** Cards a renderizar, en orden. Cada una puede declarar su propio `width`. */
    items: CardCarouselItem[];
    /** Ancho usado para los items que no declaran `width` propio. */
    defaultCardWidth?: number;
    gap?: number;
    /** Ancho máximo del viewport completo (contiene la card activa + el peek de la siguiente). */
    maxViewportWidth?: number | string;
    /** Index controlado (opcional). Si no se pasa, el componente maneja su propio estado. */
    activeIndex?: number;
    onIndexChange?: (index: number) => void;
    hintText?: string | ((index: number, total: number) => string | undefined);
    showDots?: boolean;
    showArrows?: boolean;
    sx?: SxProps<Theme>;
}

export type UseCardCarouselParams = Pick<
    CardCarouselProps,
    "items" | "defaultCardWidth" | "gap" | "activeIndex" | "onIndexChange" | "hintText" | "showArrows" 
>;

export interface DetailCarouselLayout {
    isMobile: boolean;
    /** Gap entre cards del CardCarousel. */
    gap: number;
    /** Padding horizontal para el Box que envuelve al CardCarousel. */
    boxPaddingX: number;
    /** Ancho de la card de detalle (form). */
    detailWidth: number;
    /** Ancho de la card de analíticas. */
    analyticsWidth: number;
    /** Listo para pasar directo al prop `hintText` de CardCarousel. */
    hintText: (index: number, total: number) => string | undefined;
}
