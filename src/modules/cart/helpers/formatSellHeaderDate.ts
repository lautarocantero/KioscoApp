import dayjs from "dayjs";
import "dayjs/locale/es";

// "Vie 28 · 18:40" — dayjs en locale "es" devuelve el día abreviado en
// minúscula y con punto ("vie."); se capitaliza y se quita el punto.
export const formatSellHeaderDate = (date: Date = new Date()): string => {
  const formatted = dayjs(date).locale("es").format("ddd D · HH:mm").replace(".", "");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};
