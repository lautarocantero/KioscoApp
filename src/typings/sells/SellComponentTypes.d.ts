import type { Product } from "../product/productTypes";
import type { Presentation } from "../presentation/presentationTypes";
import type { DialogDataInterface, DialogVariantDataType, PaymentDetail, SellTicketType, SoldProductRow, TicketSummaryType } from "./sellTypes";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import type { ViewMode } from "../../modules/sells/components/ProductsExhibitorList/ProductToolbar";
import type { ReactNode } from "react";
import type { SvgIconProps } from "@mui/material";
import type { PaymentMethod } from "./sellsEnum";


   //────────────────────────────────────────── 📑 Sells List 📑 ───────────────────────────────────────────//

    export interface SellFormProps {
        mode?: FormModeComplexEnum;
    }

    export interface EmptyProductListProps {
        isEmpty: boolean
    }

   //────────────────────────────────────────── 📑 Sells Detail 📑 ───────────────────────────────────────────//

   export interface SellDetailHeaderProps {
    ticketNumber: string;
    status: SellStatus;
    }

    export interface SellDetailInfoBarProps {
        purchaseDate: string;
        purchaseTime: string;
        timezone: string;
        sellerName: string;
        paymentMethodLabel: string;
        currency: string;
    }

    export interface SellDetailProductsSoldProps {
        products: SoldProductRow[];
    }

    export interface SellDetailPaymentDataProps {
        payment: {
            method: PaymentMethod;
            status: SellStatusEnum;
            amountPaid: number | null;
            debtorName: string | null;
            pendingAmount: number | null;
        };
    }

    export interface SellDetailSoldDataProps {
        subTotal: number;
        iva: number;
        ivaPercentage: number;
        total: number;
    }

    export interface SellDetailAditionalDataProps {
        subTotal: number;
        iva: number;
        ivaPercentage: number;
        total: number;
        currency: string;
        sellId: string;
        pendingBalance: number | null;
        debtorName: string | null;
    }

    export interface SellDetailPendingBalanceProps {
        pendingBalance: number | null;
        debtorName: string | null;
    }

    export interface SellDetailActionsProps {
        onBack: () => void;
        onPrintReceipt: () => void;
    }

   //────────────────────────────────────────── 📑 Sells Table 📑 ───────────────────────────────────────────//
   

    export interface SellsTableProps {
       isLoading: boolean;
       sells: SellTicketType[];
    }

    export interface SellDataProps {
        currentSell: SellTicketType | null;
    }

    export type SellCartDataProps = Pick<SellDataProps, 'currentSell'>;

    export type SellCartProductsProps = Pick<SellDataProps, 'currentSell'>;

 