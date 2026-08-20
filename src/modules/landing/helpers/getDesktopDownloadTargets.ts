import { OperatingSystemEnum } from "@typings/landing/landingEnums";
import type { DesktopDownloadTarget } from "@typings/landing/landingTypes";
import { STOCKO_RELEASES_URL } from "../../../config/constants";
import WindowsLogoIcon from "../pages/LandingPage/components/icons/WindowsLogoIcon";
import LinuxLogoIcon from "../pages/LandingPage/components/icons/LinuxLogoIcon";

export const getDesktopDownloadTargets = (): DesktopDownloadTarget[] => [
  {
    os: OperatingSystemEnum.Windows,
    labelKey: "landing.download.windows",
    Icon: WindowsLogoIcon,
    href: STOCKO_RELEASES_URL,
  },
  {
    os: OperatingSystemEnum.Linux,
    labelKey: "landing.download.linux",
    Icon: LinuxLogoIcon,
    href: STOCKO_RELEASES_URL,
  },
];
