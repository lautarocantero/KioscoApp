import { Grid } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
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
    const { values, date, time, timezone, products, payment, ivaPercentage, currency } = useSellDetailForm();
    const { submitError, stepErrors } = useFormNavigation();

    return (
        <FormCard
            header={{
                title: "Detalles de la venta",
                subtitle: values._id,
                icon: <Inventory2OutlinedIcon />,
                status: values.status,
            }}
            showButtons
            submitText="Imprimir ticket"
            backText="Volver"
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