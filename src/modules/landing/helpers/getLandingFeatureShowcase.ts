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
import { getPublicAssetUrl } from "../../shared/helpers/getPublicAssetUrl";

const PRODUCTS_STOCK_VIDEO_SRC = getPublicAssetUrl("files/video/landing-products-section.mp4");
const SELLS_REPORTS_VIDEO_SRC = getPublicAssetUrl("files/video/landing-sells-section.mp4");
const RECEIPTS_PROVIDERS_VIDEO_SRC = getPublicAssetUrl("files/video/landing-receipts-section.mp4");
const MULTI_KIOSCO_VIDEO_SRC = getPublicAssetUrl("files/video/landing-kiosco-selection.mp4");

export const getLandingFeatureShowcase = (): LandingFeatureShowcaseItem[] => [
  {
    badgeKey: "landing.showcase.multiKiosco.badge",
    titleStartKey: "landing.showcase.multiKiosco.titleStart",
    titleHighlightKey: "landing.showcase.multiKiosco.titleHighlight",
    titleEndKey: "landing.showcase.multiKiosco.titleEnd",
    subtitleKey: "landing.showcase.multiKiosco.subtitle",
    savesKey: "landing.showcase.multiKiosco.saves",
    accent: "blue",
    mediaVideoSrc: MULTI_KIOSCO_VIDEO_SRC,
    mediaAltKey: "landing.showcase.multiKiosco.mediaAlt",
    items: [
      {
        Icon: StorefrontOutlinedIcon,
        labelKey: "landing.showcase.multiKiosco.items.multipleKioscosOneAccount.label",
        detailKey: "landing.showcase.multiKiosco.items.multipleKioscosOneAccount.detail",
      },
      {
        Icon: GroupOutlinedIcon,
        labelKey: "landing.showcase.multiKiosco.items.sellerManagement.label",
        detailKey: "landing.showcase.multiKiosco.items.sellerManagement.detail",
      },
      {
        Icon: AdminPanelSettingsOutlinedIcon,
        labelKey: "landing.showcase.multiKiosco.items.rolePermissions.label",
        detailKey: "landing.showcase.multiKiosco.items.rolePermissions.detail",
        isClickable: true,
      },
    ],
  },
  {
    badgeKey: "landing.showcase.sellsReports.badge",
    titleStartKey: "landing.showcase.sellsReports.titleStart",
    titleHighlightKey: "landing.showcase.sellsReports.titleHighlight",
    titleEndKey: "landing.showcase.sellsReports.titleEnd",
    subtitleKey: "landing.showcase.sellsReports.subtitle",
    savesKey: "landing.showcase.sellsReports.saves",
    accent: "violet",
    mediaVideoSrc: SELLS_REPORTS_VIDEO_SRC,
    mediaAltKey: "landing.showcase.sellsReports.mediaAlt",
    items: [
      {
        Icon: QueryStatsOutlinedIcon,
        labelKey: "landing.showcase.sellsReports.items.realtimeReports.label",
        detailKey: "landing.showcase.sellsReports.items.realtimeReports.detail",
      },
      {
        Icon: HistoryOutlinedIcon,
        labelKey: "landing.showcase.sellsReports.items.sellsHistory.label",
        detailKey: "landing.showcase.sellsReports.items.sellsHistory.detail",
      },
      {
        Icon: PersonSearchOutlinedIcon,
        labelKey: "landing.showcase.sellsReports.items.sellerAnalysis.label",
        detailKey: "landing.showcase.sellsReports.items.sellerAnalysis.detail",
      },
    ],
  },
  {
    badgeKey: "landing.showcase.productsStock.badge",
    titleStartKey: "landing.showcase.productsStock.titleStart",
    titleHighlightKey: "landing.showcase.productsStock.titleHighlight",
    titleEndKey: "landing.showcase.productsStock.titleEnd",
    subtitleKey: "landing.showcase.productsStock.subtitle",
    savesKey: "landing.showcase.productsStock.saves",
    accent: "green",
    mediaVideoSrc: PRODUCTS_STOCK_VIDEO_SRC,
    mediaAltKey: "landing.showcase.productsStock.mediaAlt",
    items: [
      {
        Icon: Inventory2OutlinedIcon,
        labelKey: "landing.showcase.productsStock.items.manageProducts.label",
        detailKey: "landing.showcase.productsStock.items.manageProducts.detail",
      },
      {
        Icon: StyleOutlinedIcon,
        labelKey: "landing.showcase.productsStock.items.multiplePresentations.label",
        detailKey: "landing.showcase.productsStock.items.multiplePresentations.detail",
      },
      {
        Icon: WarningAmberOutlinedIcon,
        labelKey: "landing.showcase.productsStock.items.lowStockAlerts.label",
        detailKey: "landing.showcase.productsStock.items.lowStockAlerts.detail",
      },
    ],
  },
  {
    badgeKey: "landing.showcase.receiptsProviders.badge",
    titleStartKey: "landing.showcase.receiptsProviders.titleStart",
    titleHighlightKey: "landing.showcase.receiptsProviders.titleHighlight",
    titleEndKey: "landing.showcase.receiptsProviders.titleEnd",
    subtitleKey: "landing.showcase.receiptsProviders.subtitle",
    savesKey: "landing.showcase.receiptsProviders.saves",
    accent: "gold",
    mediaVideoSrc: RECEIPTS_PROVIDERS_VIDEO_SRC,
    mediaAltKey: "landing.showcase.receiptsProviders.mediaAlt",
    items: [
      {
        Icon: ReceiptLongOutlinedIcon,
        labelKey: "landing.showcase.receiptsProviders.items.fastReceiptUpload.label",
        detailKey: "landing.showcase.receiptsProviders.items.fastReceiptUpload.detail",
      },
      {
        Icon: LocalShippingOutlinedIcon,
        labelKey: "landing.showcase.receiptsProviders.items.providerControl.label",
        detailKey: "landing.showcase.receiptsProviders.items.providerControl.detail",
      },
      {
        Icon: HistoryOutlinedIcon,
        labelKey: "landing.showcase.receiptsProviders.items.historyAlwaysAvailable.label",
        detailKey: "landing.showcase.receiptsProviders.items.historyAlwaysAvailable.detail",
      },
    ],
  },
];
