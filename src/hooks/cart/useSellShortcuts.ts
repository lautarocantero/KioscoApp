import { useEffect } from "react";
import { SELL_SEARCH_INPUT_ID, SELL_BARCODE_TOGGLE_ID, CART_GENERATE_TICKET_BUTTON_ID } from "../../config/constants";

const EDITABLE_TAGS = ["INPUT", "TEXTAREA", "SELECT"];

const isEditingElsewhere = (): boolean => {
  const active = document.activeElement;
  if (!active) return false;
  if (EDITABLE_TAGS.includes(active.tagName)) return true;
  return active.getAttribute("contenteditable") === "true";
};

/*══════════════════════════════════════════════════════════════════════╗
║ ⌨️  useSellShortcuts                                                  ║
║                                                                       ║
║ Atajos globales de /new-sell: "/" enfoca el buscador, F2 abre/enfoca ║
║ el lector de código de barras, F9 genera el ticket. Apunta a los     ║
║ elementos por id de DOM (mismo patrón que PRODUCTS_EXHIBITOR_ANCHOR  ║
║ _ID/goToCart) en vez de prop-drilling refs entre header y carrito.   ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const useSellShortcuts = (): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "/") {
        if (isEditingElsewhere()) return;
        event.preventDefault();
        document.getElementById(SELL_SEARCH_INPUT_ID)?.focus();
        return;
      }

      if (event.key === "F2") {
        event.preventDefault();
        document.getElementById(SELL_BARCODE_TOGGLE_ID)?.click();
        return;
      }

      if (event.key === "F9") {
        event.preventDefault();
        document.getElementById(CART_GENERATE_TICKET_BUTTON_ID)?.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
};

export default useSellShortcuts;
