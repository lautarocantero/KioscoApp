import type { OptionLink } from "@typings/ui/layout.types";


//──────────────────────────────────────────── 🌐 Links 🌐 ───────────────────────────────────────────//

export type LinksType = Pick<OptionLink, 'description' | 'icon' |  'url' |  'value' |  
'loading' |  'subtitle' |  'useData' |  'formatValue'>

//──────────────────────────────────────────── 🌐 Sidebar Account 🌐 ───────────────────────────────────────────//

export interface UserData {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  email: string;
}

export interface SidebarUserAvatarProps {
  avatarUrl?: string;
  name: string;
}

export interface SidebarUserInfoProps {
  name: string;
  role: string;
  isExpanded: boolean;
}

export type SidebarUserSettingsProps = Pick<SidebarUserInfoProps, 'isExpanded'>;