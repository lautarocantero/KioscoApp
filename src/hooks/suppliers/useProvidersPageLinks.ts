// hooks/suppliers/useProvidersPageLinks.ts
import type { LinkDataResult, OptionLink } from "@typings/ui/layout.types";
import {
  useProvidersListLinkData,
  useProvidersCreateLinkData,
  useProvidersEditLinkData,
} from "./useProvidersSubLinksData";
import { ProvidersNavLinks } from "../../config/Links";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/providers-list": useProvidersListLinkData,
  "/providers-create": useProvidersCreateLinkData,
  "/providers-edit": useProvidersEditLinkData,
};

export const useProvidersPageLinks = (): OptionLink[] =>
  ProvidersNavLinks.map((link) => ({
    ...link,
    useData: dataHooksByUrl[link.url],
  }));