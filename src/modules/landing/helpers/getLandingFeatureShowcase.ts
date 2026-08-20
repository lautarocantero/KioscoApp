import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import type { LandingFeatureShowcaseItem } from "@typings/landing/landingTypes";

const STOCKO_REPRESENTATION_SRC = "/images/backgroundImages/Stocko_representation.png";
// TODO: reemplazar por el video real de cada feature cuando esté grabado.
const STOCKO_SHOWCASE_PLACEHOLDER_VIDEO_SRC = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export const getLandingFeatureShowcase = (): LandingFeatureShowcaseItem[] => [
  {
    badgeKey: "landing.showcase.productsStock.badge",
    titleStartKey: "landing.showcase.productsStock.titleStart",
    titleHighlightKey: "landing.showcase.productsStock.titleHighlight",
    titleEndKey: "landing.showcase.productsStock.titleEnd",
    subtitleKey: "landing.showcase.productsStock.subtitle",
    accent: "green",
    mediaSrc: STOCKO_REPRESENTATION_SRC,
    mediaVideoSrc: STOCKO_SHOWCASE_PLACEHOLDER_VIDEO_SRC,
    mediaAltKey: "landing.showcase.productsStock.mediaAlt",
    bullets: [
      { Icon: Inventory2OutlinedIcon, labelKey: "landing.showcase.productsStock.bullets.manageProducts" },
      { Icon: StyleOutlinedIcon, labelKey: "landing.showcase.productsStock.bullets.multiplePresentations" },
      { Icon: WarningAmberOutlinedIcon, labelKey: "landing.showcase.productsStock.bullets.lowStockAlerts" },
    ],
  },
  {
    badgeKey: "landing.showcase.sellsReports.badge",
    titleStartKey: "landing.showcase.sellsReports.titleStart",
    titleHighlightKey: "landing.showcase.sellsReports.titleHighlight",
    titleEndKey: "landing.showcase.sellsReports.titleEnd",
    subtitleKey: "landing.showcase.sellsReports.subtitle",
    accent: "violet",
    mediaSrc: STOCKO_REPRESENTATION_SRC,
    mediaVideoSrc: STOCKO_SHOWCASE_PLACEHOLDER_VIDEO_SRC,
    mediaAltKey: "landing.showcase.sellsReports.mediaAlt",
    bullets: [
      { Icon: QueryStatsOutlinedIcon, labelKey: "landing.showcase.sellsReports.bullets.realtimeReports" },
      { Icon: HistoryOutlinedIcon, labelKey: "landing.showcase.sellsReports.bullets.sellsHistory" },
      { Icon: PersonSearchOutlinedIcon, labelKey: "landing.showcase.sellsReports.bullets.sellerAnalysis" },
    ],
  },
  {
    badgeKey: "landing.showcase.receiptsProviders.badge",
    titleStartKey: "landing.showcase.receiptsProviders.titleStart",
    titleHighlightKey: "landing.showcase.receiptsProviders.titleHighlight",
    titleEndKey: "landing.showcase.receiptsProviders.titleEnd",
    subtitleKey: "landing.showcase.receiptsProviders.subtitle",
    accent: "gold",
    mediaSrc: STOCKO_REPRESENTATION_SRC,
    mediaVideoSrc: STOCKO_SHOWCASE_PLACEHOLDER_VIDEO_SRC,
    mediaAltKey: "landing.showcase.receiptsProviders.mediaAlt",
    bullets: [
      { Icon: ReceiptLongOutlinedIcon, labelKey: "landing.showcase.receiptsProviders.bullets.fastReceiptUpload" },
      { Icon: LocalShippingOutlinedIcon, labelKey: "landing.showcase.receiptsProviders.bullets.providerControl" },
      { Icon: HistoryOutlinedIcon, labelKey: "landing.showcase.receiptsProviders.bullets.historyAlwaysAvailable" },
    ],
  },
  {
    badgeKey: "landing.showcase.multiKiosco.badge",
    titleStartKey: "landing.showcase.multiKiosco.titleStart",
    titleHighlightKey: "landing.showcase.multiKiosco.titleHighlight",
    titleEndKey: "landing.showcase.multiKiosco.titleEnd",
    subtitleKey: "landing.showcase.multiKiosco.subtitle",
    accent: "blue",
    mediaSrc: STOCKO_REPRESENTATION_SRC,
    mediaVideoSrc: STOCKO_SHOWCASE_PLACEHOLDER_VIDEO_SRC,
    mediaAltKey: "landing.showcase.multiKiosco.mediaAlt",
    bullets: [
      { Icon: StorefrontOutlinedIcon, labelKey: "landing.showcase.multiKiosco.bullets.multipleKioscosOneAccount" },
      { Icon: GroupOutlinedIcon, labelKey: "landing.showcase.multiKiosco.bullets.sellerManagement" },
      { Icon: AdminPanelSettingsOutlinedIcon, labelKey: "landing.showcase.multiKiosco.bullets.rolePermissions" },
    ],
  },
];
