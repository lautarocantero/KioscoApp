// modules/sells/utils/sellDetailMappers.ts
import type { ProductTicketType } from "@typings/seller/sellerTypes";
import type { PaymentDetail, PurchaseDateParts, SellEditFormValues, SoldProductRow } from "@typings/sells/sellTypes";
import { MONTHS_ES } from "config/constants";


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
export const mapProductsToSoldRows = (products: ProductTicketType[]): SoldProductRow[] => {
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
export const buildPaymentDetail = (sell: SellEditFormValues): PaymentDetail => {
    const { date, time } = parsePurchaseDate(sell.purchase_date);

    return {
        methodLabel: sell.payment_method,
        approved: true, // 🔶 hardcodeado: el backend no informa estado de aprobación
        reference: "N/D", // 🔶 hardcodeado: el backend no informa comprobante/referencia
        paymentDate: sell.modification_date || `${date} • ${time}`,
    };
};

export const formatAmount = (value: number): string => `$${value.toLocaleString("es-AR")}`;