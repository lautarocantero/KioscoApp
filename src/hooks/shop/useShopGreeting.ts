import { useSelector } from "react-redux";
import type { RootState } from "../../store/auth/authSlice";
import type { UseShopGreetingReturn } from "@typings/shop/shopTypes";

const DEFAULT_GREETING = "¡Hola! 👋";

// Saludo personalizado con el nombre real del usuario logueado (store de auth).
export const useShopGreeting = (): UseShopGreetingReturn => {
  const name = useSelector((state: RootState) => state.auth.name);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  if (!name) return { greeting: DEFAULT_GREETING, isLoading };

  return { greeting: `¡Hola, ${name}! 👋`, isLoading };
};
