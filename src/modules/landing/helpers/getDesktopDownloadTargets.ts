import { OperatingSystemEnum } from "@typings/landing/landingEnums";
import type { DesktopDownloadTarget } from "@typings/landing/landingTypes";
import {
  STOCKO_LINUX_APPIMAGE_DOWNLOAD_URL,
  STOCKO_LINUX_DEB_DOWNLOAD_URL,
  STOCKO_RELEASES_URL,
} from "../../../config/constants";
import WindowsLogoIcon from "../pages/LandingPage/components/icons/WindowsLogoIcon";
import LinuxLogoIcon from "../pages/LandingPage/components/icons/LinuxLogoIcon";

export const getDesktopDownloadTargets = (): DesktopDownloadTarget[] => [
  {
    os: OperatingSystemEnum.Windows,
    labelKey: "landing.download.windows",
    descriptionKey: "landing.download.windowsDescription",
    Icon: WindowsLogoIcon,
    illustrationSrc: "/images/icons/decoration/windows.png",
    // Todavía no hay instalador de Windows: manda a la página de releases.
    href: STOCKO_RELEASES_URL,
    isPrimary: true,
    opensInNewTab: true,
  },
  {
    os: OperatingSystemEnum.Linux,
    labelKey: "landing.download.linux",
    descriptionKey: "landing.download.linuxDescription",
    Icon: LinuxLogoIcon,
    illustrationSrc: "/images/icons/decoration/linux.png",
    // .deb como opción principal: se instala con dpkg, sin depender de
    // libfuse2 (que Ubuntu 22.04+ ya no trae y rompe el AppImage en
    // silencio). El AppImage queda como alternativa portable.
    href: STOCKO_LINUX_DEB_DOWNLOAD_URL,
    isPrimary: false,
    opensInNewTab: false,
    secondaryDownload: {
      href: STOCKO_LINUX_APPIMAGE_DOWNLOAD_URL,
      labelKey: "landing.download.appImageAlternative",
    },
  },
];
