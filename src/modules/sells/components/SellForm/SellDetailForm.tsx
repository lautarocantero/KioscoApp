import { Grid } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useTranslation } from "react-i18next";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import SellDetailInfoBar from "./SellDetailInfoBar";
import SellDetailProductsSold from "./SellDetailProductsSold";
import SellDetailSoldData from "./SellDetailSoldData";
import SellDetailPaymentData from "./SellDetailPaymentData";
import SellDetailAditionalData from "./SellDetailAditionalData";
import { useSellDetailForm } from "../../../../hooks/sells/useSellDetailForm";
import FormCard from "../../../shared/components/FormCard/FormCard";
import type { ReactNode } from "react";


const SellDetailFormComponent = (): ReactNode => {
    const { t } = useTranslation();
    const { values, date, time, timezone, products, payment, ivaPercentage, currency } = useSellDetailForm();
    const { submitError, stepErrors } = useFormNavigation();
    const isPartialPayment = payment.pendingAmount !== null && payment.pendingAmount > 0;

    return (
        <FormCard
            header={{
                title: t("sells.detail.header.title"),
                subtitle: values._id,
                icon: <Inventory2OutlinedIcon />,
                status: values.status,
            }}
            showButtons
            submitText={t("sells.detail.submit")}
            backText={t("sells.detail.back")}
            submitError={submitError}
            stepErrors={stepErrors}
            defaultBack="/sells"
        >
            <Grid container spacing={3}>
                <SellDetailInfoBar
                    purchaseDate={date}
                    purchaseTime={time}
                    timezone={timezone}
                    sellerName={values.seller_name}
                    paymentMethodLabel={values.payment_method}
                    currency={currency}
                    isPartialPayment={isPartialPayment}
                />
                <SellDetailProductsSold products={products} />
                <SellDetailPaymentData payment={payment} />
                <SellDetailAditionalData
                    subTotal={values.sub_total}
                    iva={values.iva}
                    ivaPercentage={ivaPercentage}
                    total={values.total_amount}
                    currency={currency}
                    sellId={values._id}
                    pendingBalance={payment.pendingAmount}
                    debtorName={payment.debtorName}
                    settlesSellId={values.settles_sell_id}
                    settledBySellId={values.settled_by_sell_id}
                />
                <SellDetailSoldData
                    subTotal={values.sub_total}
                    iva={values.iva}
                    ivaPercentage={ivaPercentage}
                    total={values.total_amount}
                />
            </Grid>
        </FormCard>
    );
};

export default SellDetailFormComponent;