// Sanitiza un input de descuento (%): solo dígitos, sin signo ni decimales.
export const sanitizePercentageInput = (raw: string): string => raw.replace(/[^0-9]/g, "");

// Clampea un porcentaje a [0, 100] — se usa tanto al calcular totales como
// al validar lo que ya se guardó (por si llega un valor fuera de rango).
export const clampPercentage = (value: number): number => Math.min(100, Math.max(0, value));
