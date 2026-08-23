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
import type { LandingFeatureShowcaseItem, LandingMediaDecoration } from "@typings/landing/landingTypes";
import { LandingDecorationPosition } from "@typings/landing/landingEnums";

const PRODUCTS_STOCK_VIDEO_SRC = "/files/video/landing-products-section.mp4";
const SELLS_REPORTS_VIDEO_SRC = "/files/video/landing-sells-section.mp4";
const RECEIPTS_PROVIDERS_VIDEO_SRC = "/files/video/landing-receipts-section.mp4";
const MULTI_KIOSCO_VIDEO_SRC = "/files/video/landing-kiosco-selection.mp4";

// Decoraciones genéricas (cajas) para las features que no tienen un ícono temático propio.
const STOCKO_SHOWCASE_MEDIA_DECORATIONS: LandingMediaDecoration[] = [
  { src: "/images/icons/decoration/2boxes.png", position: LandingDecorationPosition.BottomLeft },
  { src: "/images/icons/decoration/3boxes.png", position: LandingDecorationPosition.BottomRight },
];

const RECEIPTS_PROVIDERS_DECORATIONS: LandingMediaDecoration[] = [
  { src: "/images/icons/decoration/receipt.png", position: LandingDecorationPosition.BottomRight },
];

const MULTI_KIOSCO_MEDIA_DECORATIONS: LandingMediaDecoration[] = [
  { src: "/images/icons/decoration/kiosco.png", position: LandingDecorationPosition.BottomLeft },
];

const SELLS_REPORTS_MEDIA_DECORATIONS: LandingMediaDecoration[] = [
  { src: "/images/icons/decoration/sells.png", position: LandingDecorationPosition.BottomLeft },
  { src: "/images/icons/decoration/reports.png", position: LandingDecorationPosition.BottomRight },
];

export const getLandingFeatureShowcase = (): LandingFeatureShowcaseItem[] => [
  {
    badgeKey: "landing.showcase.multiKiosco.badge",
    titleStartKey: "landing.showcase.multiKiosco.titleStart",
    titleHighlightKey: "landing.showcase.multiKiosco.titleHighlight",
    titleEndKey: "landing.showcase.multiKiosco.titleEnd",
    subtitleKey: "landing.showcase.multiKiosco.subtitle",
    accent: "blue",
    mediaVideoSrc: MULTI_KIOSCO_VIDEO_SRC,
    mediaDecorations: MULTI_KIOSCO_MEDIA_DECORATIONS,
    mediaAltKey: "landing.showcase.multiKiosco.mediaAlt",
    bullets: [
      { Icon: StorefrontOutlinedIcon, labelKey: "landing.showcase.multiKiosco.bullets.multipleKioscosOneAccount" },
      { Icon: GroupOutlinedIcon, labelKey: "landing.showcase.multiKiosco.bullets.sellerManagement" },
      { Icon: AdminPanelSettingsOutlinedIcon, labelKey: "landing.showcase.multiKiosco.bullets.rolePermissions" },
    ],
  },
  {
    badgeKey: "landing.showcase.sellsReports.badge",
    titleStartKey: "landing.showcase.sellsReports.titleStart",
    titleHighlightKey: "landing.showcase.sellsReports.titleHighlight",
    titleEndKey: "landing.showcase.sellsReports.titleEnd",
    subtitleKey: "landing.showcase.sellsReports.subtitle",
    accent: "violet",
    mediaVideoSrc: SELLS_REPORTS_VIDEO_SRC,
    mediaDecorations: SELLS_REPORTS_MEDIA_DECORATIONS,
    mediaAltKey: "landing.showcase.sellsReports.mediaAlt",
    bullets: [
      { Icon: QueryStatsOutlinedIcon, labelKey: "landing.showcase.sellsReports.bullets.realtimeReports" },
      { Icon: HistoryOutlinedIcon, labelKey: "landing.showcase.sellsReports.bullets.sellsHistory" },
      { Icon: PersonSearchOutlinedIcon, labelKey: "landing.showcase.sellsReports.bullets.sellerAnalysis" },
    ],
  },
  {
    badgeKey: "landing.showcase.productsStock.badge",
    titleStartKey: "landing.showcase.productsStock.titleStart",
    titleHighlightKey: "landing.showcase.productsStock.titleHighlight",
    titleEndKey: "landing.showcase.productsStock.titleEnd",
    subtitleKey: "landing.showcase.productsStock.subtitle",
    accent: "green",
    mediaVideoSrc: PRODUCTS_STOCK_VIDEO_SRC,
    mediaDecorations: STOCKO_SHOWCASE_MEDIA_DECORATIONS,
    mediaAltKey: "landing.showcase.productsStock.mediaAlt",
    bullets: [
      { Icon: Inventory2OutlinedIcon, labelKey: "landing.showcase.productsStock.bullets.manageProducts" },
      { Icon: StyleOutlinedIcon, labelKey: "landing.showcase.productsStock.bullets.multiplePresentations" },
      { Icon: WarningAmberOutlinedIcon, labelKey: "landing.showcase.productsStock.bullets.lowStockAlerts" },
    ],
  },
  {
    badgeKey: "landing.showcase.receiptsProviders.badge",
    titleStartKey: "landing.showcase.receiptsProviders.titleStart",
    titleHighlightKey: "landing.showcase.receiptsProviders.titleHighlight",
    titleEndKey: "landing.showcase.receiptsProviders.titleEnd",
    subtitleKey: "landing.showcase.receiptsProviders.subtitle",
    accent: "gold",
    mediaVideoSrc: RECEIPTS_PROVIDERS_VIDEO_SRC,
    mediaDecorations: RECEIPTS_PROVIDERS_DECORATIONS,
    mediaAltKey: "landing.showcase.receiptsProviders.mediaAlt",
    bullets: [
      { Icon: ReceiptLongOutlinedIcon, labelKey: "landing.showcase.receiptsProviders.bullets.fastReceiptUpload" },
      { Icon: LocalShippingOutlinedIcon, labelKey: "landing.showcase.receiptsProviders.bullets.providerControl" },
      { Icon: HistoryOutlinedIcon, labelKey: "landing.showcase.receiptsProviders.bullets.historyAlwaysAvailable" },
    ],
  },
];
