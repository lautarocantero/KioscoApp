import { useCallback, useState } from "react";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import type { UseSidebarKioscoCardReturn } from "@typings/ui/sidebar.types";
import { useActiveKiosco } from "../../../../../../hooks/kiosco/useActiveKiosco";
import { useKioscoSelector } from "../../../../../../hooks/kiosco/useKioscoSelector";

// Wrapea los hooks de kiosco ya existentes (mismo patrón que useKioscoSelector
// usa KioscoSelectorPage) y le suma el estado de "lista desplegada" propio
// de la tarjeta del panel — nada de esto duplica el fetch/selección real.
export const useSidebarKioscoCard = (): UseSidebarKioscoCardReturn => {
  const { activeKiosco } = useActiveKiosco();
  const { kioscos, loading, error, entering, handleEnterKiosco } = useKioscoSelector();
  const [isListOpen, setIsListOpen] = useState(false);

  const toggleList = useCallback(() => setIsListOpen((prev) => !prev), []);

  const handleSelect = useCallback((kiosco: KioscoWithStats) => {
    void handleEnterKiosco(kiosco);
  }, [handleEnterKiosco]);

  return { activeKiosco, kioscos, loading, error, entering, isListOpen, toggleList, handleSelect };
};
