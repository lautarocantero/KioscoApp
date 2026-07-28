// hooks/account/useLinksData.ts
import type { LinkDataResult, OptionLink } from "@typings/ui/layout.types";
import {
  useAccountEditLinkData,
  useAccountSubscriptionLinkData,
} from "./useAccountLinksData";
import { AccountNavLinks } from "../../config/Links";

const dataHooksByUrl: Record<string, () => LinkDataResult> = {
  "/account-edit": useAccountEditLinkData,
  "/account-subscription": useAccountSubscriptionLinkData,
};

export const useAccountLinks = (): OptionLink[] =>
  AccountNavLinks.map((link) => ({
    ...link,
    useData: dataHooksByUrl[link.url],
  }));