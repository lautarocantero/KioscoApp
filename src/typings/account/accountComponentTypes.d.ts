
//──────────────────────────────────────────── 🌐 Links 🌐 ───────────────────────────────────────────//

export interface LinksInterface {
    icon: React.ReactNode,
    description: string,
    url: string,
}

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