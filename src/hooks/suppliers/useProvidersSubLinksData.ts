// hooks/suppliers/useProvidersSubLinksData.ts
import type { LinkDataResult } from "@typings/ui/layout.types";

// TODO: reemplazar por fetch real cuando el backend esté listo
export const useProvidersListLinkData = (): LinkDataResult => ({
  value: "8",
  subtitle: "8 proveedores registrados",
});

export const useProvidersCreateLinkData = (): LinkDataResult => ({
  subtitle: "Alta de nuevo proveedor",
});

export const useProvidersEditLinkData = (): LinkDataResult => ({
  subtitle: "Modificá datos de un proveedor",
});