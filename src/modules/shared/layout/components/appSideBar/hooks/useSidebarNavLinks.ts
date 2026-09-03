import type { OptionLink } from "@typings/ui/layout.types";
import { SidebarNavLinks } from "../../../../../../config/Links";
import { dataHooksByUrl } from "../../../../../../hooks/shop/dataHooksByUrl";

// Le agrega a cada link del riel el hook de datos reales correspondiente
// (cuando existe), para que SidebarSectionHeader pueda resolver un
// subtítulo con dato real en vez del subtítulo estático de Links.tsx.
export const useSidebarNavLinks = (): OptionLink[] =>
  SidebarNavLinks.map((link) => ({
    ...link,
    useData: dataHooksByUrl[link.url],
  }));
