import type { ProductTicketWithStockType, PurchaseDateParts, SellEditFormValues, SoldProductRow } from "@typings/sells/sellTypes";
import { MONTHS_ES } from "../../../../../config/constants";
import { SellStatusEnum } from "@typings/sells/sellsEnum";


/*══════════ 📅 parsePurchaseDate ══════════╗
║ Recibe purchase_date crudo (Date.toString()  ║
║ del backend, ej: "Wed Jul 01 2026 00:00:00   ║
║ GMT-0300 (Argentina Standard Time)") y lo     ║
║ separa en fecha/hora/timezone para la UI.     ║
╚═══════════════════════════════════════════╝*/
export const parsePurchaseDate = (rawDate: string): PurchaseDateParts => {
    const parsed = new Date(rawDate);

    if (Number.isNaN(parsed.getTime())) {
        return { date: rawDate, time: "", timezone: "" };
    }

    const day = String(parsed.getDate()).padStart(2, "0");
    const month = MONTHS_ES[parsed.getMonth()];
    const year = parsed.getFullYear();
    const hours = String(parsed.getHours()).padStart(2, "0");
    const minutes = String(parsed.getMinutes()).padStart(2, "0");

    const gmtMatch = rawDate.match(/GMT([+-]\d{2})(\d{2})/);
    const timezone = gmtMatch ? `GMT ${gmtMatch[1]}:${gmtMatch[2]}` : "";

    return {
        date: `${day} ${month} ${year}`,
        time: `${hours}:${minutes}`,
        timezone,
    };
};

/*══════════ 🛒 mapProductsToSoldRows ══════════╗
║ products en una Sell es ProductTicketType[],   ║
║ no Presentation[] — usa product_id como id      ║
║ (identifica la presentación vendida) y           ║
║ stock_required como la cantidad vendida en       ║
║ esa línea de venta.                              ║
╚═══════════════════════════════════════════════╝*/
export const mapProductsToSoldRows = (products: ProductTicketWithStockType[]): SoldProductRow[] => {
    return products.map((product) => ({
        id: product._id,
        productId: product.product_id,
        presentationId: product._id,
        name: product.name,
        sku: product.sku,
        imageUrl: product.image_url || undefined,
        quantity: product.stock_required,
        unitPrice: product.price,
        subtotal: product.price * product.stock_required,
    }));
};

export const computeIvaPercentage = (iva: number, subTotal: number): number => {
    if (!subTotal) return 0;
    return Math.round((iva / subTotal) * 100);
};

/*══════════ 💳 buildPaymentDetail ══════════╗
║ El endpoint no devuelve un objeto de pago     ║
║ detallado (aprobación, referencia), solo       ║
║ payment_method. Se arma un PaymentDetail con   ║
║ lo disponible y placeholders para lo que falta.║
╚═══════════════════════════════════════════╝*/
export const buildPaymentDetail = (values: SellEditFormValues) => ({
    method: values.payment_method,
    status: values.status,
    amountPaid: values.status === SellStatusEnum.Parcial ? values.amount_paid : null,
    debtorName: values.status === SellStatusEnum.Parcial ? values.debtor_name : null,
    pendingAmount: values.status === SellStatusEnum.Parcial && values.amount_paid !== null
        ? values.total_amount - values.amount_paid
        : null,
});

export const formatAmount = (value: number): string => `$${value.toLocaleString("es-AR")}`;