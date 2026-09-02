import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";

// Mismo criterio que el buscador del mockup: matchea contra "nombre +
// dirección" concatenados, case-insensitive. Query vacía = no filtra.
export const filterKioscosByQuery = (kioscos: KioscoWithStats[], query: string): KioscoWithStats[] => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return kioscos;

    return kioscos.filter((kiosco) => `${kiosco.name} ${kiosco.address}`.toLowerCase().includes(normalized));
};
