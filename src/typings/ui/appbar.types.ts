import type { Breakpoint } from "@mui/system";
import type { UnderlineVariant } from "./ui";
import type { ReactNode } from "react";


export interface LinkInterface {
  label: string;
  to: string;
  underline: Partial<Record<Breakpoint, UnderlineVariant>>;
}

export interface LinksComponentInterface {
  linksToShow: LinkInterface[];
}

export interface SellbarSectionProps {
  gridArea: string;
  title: string;
  children: ReactNode;
  flexContent?: boolean;
}
