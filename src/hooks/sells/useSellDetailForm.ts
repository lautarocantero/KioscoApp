import { useFormikContext } from "formik";
import { useNavigate } from "react-router-dom";
import type { SellEditFormValues } from "@typings/sells/sellTypes";
import { buildPaymentDetail, computeIvaPercentage, mapProductsToSoldRows, parsePurchaseDate } from "../../modules/sells/helpers/ProductDialog/Formatter/formatDetail";

export const useSellDetailForm = () => {
    const { values } = useFormikContext<SellEditFormValues>();
    const navigate = useNavigate();

    const { date, time, timezone } = parsePurchaseDate(values.purchase_date);
    const products = mapProductsToSoldRows(values.products);
    const payment = buildPaymentDetail(values);
    const ivaPercentage = computeIvaPercentage(values.iva, values.sub_total);
    const currency = values.currency.toUpperCase();

    const goToPresentation = (productId: string, presentationId: string) => {
        navigate(`/products/${productId}/presentation/${presentationId}`);
    };

    return { values, date, time, timezone, products, payment, ivaPercentage, currency, goToPresentation };
};