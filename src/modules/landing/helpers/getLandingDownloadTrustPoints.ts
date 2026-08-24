import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import CloudSyncOutlinedIcon from "@mui/icons-material/CloudSyncOutlined";
import type { LandingDownloadTrustPoint } from "@typings/landing/landingTypes";

export const getLandingDownloadTrustPoints = (): LandingDownloadTrustPoint[] => [
  {
    Icon: VerifiedUserOutlinedIcon,
    titleKey: "landing.download.trust.secure.title",
    subtitleKey: "landing.download.trust.secure.subtitle",
  },
  {
    Icon: BoltOutlinedIcon,
    titleKey: "landing.download.trust.fastInstall.title",
    subtitleKey: "landing.download.trust.fastInstall.subtitle",
  },
  {
    Icon: CloudSyncOutlinedIcon,
    titleKey: "landing.download.trust.autoUpdates.title",
    subtitleKey: "landing.download.trust.autoUpdates.subtitle",
  },
];
