// hooks/categories/useLinksData.ts
import type { LinkDataResult, OptionLink } from "@typings/ui/layout.types";
import { CategoriesNavLinks } from "../../config/Links";
import { useCategoriesCreateLinkData, useCategoriesEditLinkData, useCategoriesListLinkData } from "./useCategoriesData";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/categories-list": useCategoriesListLinkData,
  "/categories-create": useCategoriesCreateLinkData,
  "/categories-edit": useCategoriesEditLinkData,
};

export const useCategoriesLinks = (): OptionLink[] =>
  CategoriesNavLinks.map((link) => ({
    ...link,
    useData: dataHooksByUrl[link.url],
  }));