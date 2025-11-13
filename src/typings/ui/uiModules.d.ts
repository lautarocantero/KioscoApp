import type { Breakpoint } from "@mui/system";
import type { UnderlineVariant } from "./ui";

export interface LinkInterface {
  label: string;
  to: string;
  underline: Partial<Record<Breakpoint, UnderlineVariant>>;
}


export interface LinksComponentInterface {
  linksToShow: LinkInterface[];
}





