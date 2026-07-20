import type { Breakpoint } from "@mui/system";
import type { UnderlineVariant } from "./ui";


export interface SharedAppBarInterface {
  showFilters: boolean,
}

export type SharedAppBarContentType = Pick<SharedAppBarInterface, 'showFilters'>

export interface SellBarTitleInterface {
  title: string;
}

export type SellbarSearchInterface = Pick<SharedAppBarInterface, "showFilters">

export type SellbarActionsInterface = Pick<SharedAppBarInterface, "showFilters">

export interface LinkInterface {
  label: string;
  to: string;
  underline: Partial<Record<Breakpoint, UnderlineVariant>>;
}

export interface LinksComponentInterface {
  linksToShow: LinkInterface[];
}

