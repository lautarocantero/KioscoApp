import { useEffect, useRef, useState } from "react";
import type { EyeOffset, UseMascotEyeTrackingReturn } from "@typings/cart/cartTypes";

const EYE_RANGE_X_PX = 12;
const EYE_RANGE_Y_FACTOR = 0.6;

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

// Los ojos de la mascota del carrito siguen el mouse dentro de un rango
// acotado, tomando como centro el contenedor de la bolsa (containerRef).
export const useMascotEyeTracking = (): UseMascotEyeTrackingReturn => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [eyeOffset, setEyeOffset] = useState<EyeOffset>({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent): void => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height * 0.72;

            const dx = clamp((event.clientX - centerX) / (rect.width * 0.9), -1, 1);
            const dy = clamp((event.clientY - centerY) / (rect.height * 0.9), -1, 1);

            setEyeOffset({
                x: Number((dx * EYE_RANGE_X_PX).toFixed(2)),
                y: Number((dy * EYE_RANGE_X_PX * EYE_RANGE_Y_FACTOR).toFixed(2)),
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return { containerRef, eyeOffset };
};

export default useMascotEyeTracking;
