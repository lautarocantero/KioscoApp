import { OperatingSystemEnum } from "@typings/landing/landingEnums";
import type { DesktopDownloadTarget } from "@typings/landing/landingTypes";
import { STOCKO_RELEASES_URL } from "../../../config/constants";
import WindowsLogoIcon from "../pages/LandingPage/components/icons/WindowsLogoIcon";
import LinuxLogoIcon from "../pages/LandingPage/components/icons/LinuxLogoIcon";

export const getDesktopDownloadTargets = (): DesktopDownloadTarget[] => [
  {
    os: OperatingSystemEnum.Windows,
    labelKey: "landing.download.windows",
    descriptionKey: "landing.download.windowsDescription",
    Icon: WindowsLogoIcon,
    illustrationSrc: "/images/icons/decoration/windows.png",
    href: STOCKO_RELEASES_URL,
    isPrimary: true,
  },
  {
    os: OperatingSystemEnum.Linux,
    labelKey: "landing.download.linux",
    descriptionKey: "landing.download.linuxDescription",
    Icon: LinuxLogoIcon,
    illustrationSrc: "/images/icons/decoration/linux.png",
    href: STOCKO_RELEASES_URL,
    isPrimary: false,
  },
];
