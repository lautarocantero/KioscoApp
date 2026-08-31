import type { CartFormValues, CreateSellResponse, ProductTicketType, ProductTicketWithStockType, SellTicketType, TicketSummaryType } from "@typings/sells/sellTypes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PaymentMethod, SellStatusEnum } from "../../typings/sells/sellsEnum";
import { useCurrencyOption } from "../ui/useCurrencyOption";
import type { AppDispatch, RootState } from "../../store/cart/cartSlice";
import { iva } from "../../config/constants";
import { createSellThunk } from "../../store/sell/sellsThunks";
import { fetchNotificationsThunk } from "../../store/notification/notificationThunks";
import { createPdfTicket } from "../../modules/shared/helpers/createPdfTicket";
import { cleanCartThunk, removeFromCartThunk, addOneUnitThunk } from "../../store/cart/cartThunks";
import { parseApiError } from "../../utils/errors/parseApiError";
import { AlertColor } from "@typings/ui/ui";
import type { UseCartReturn } from "@typings/cart/cartTypes";
import { CartAmount } from "@typings/cart/cartEnums";
import { calculateItemAmount, isWeightSaleType } from "../../modules/shared/helpers/saleTypeHelper";
import { calculateCartTotals } from "../../modules/cart/helpers/calculateCartTotals";
import { sanitizePercentageInput } from "../../modules/cart/helpers/clampPercentage";


export const useCart = (showSnackBar: (message: string, severity: AlertColor) => void): UseCartReturn => {
    const { t } = useTranslation();
    const { _id, name } = useSelector((state: RootState) => state.auth);
    const cart: ProductTicketWithStockType[] = useSelector((state: RootState) => state.cart.cart);

    const dispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();
    const { currency } = useCurrencyOption();

    const [ticketSummary, setTicketSummary] = useState<TicketSummaryType | null>(null);

    // Descuento por ítem (%, como string crudo del input), indexado por _id.
    // Vive local al hook — mismo patrón que antes usaban los overrides de
    // subtotal: no hace falta que sobreviva a un reload, solo mientras dura
    // la venta en curso.
    const [itemDiscounts, setItemDiscounts] = useState<Record<string, string>>({});
    const [globalDiscount, setGlobalDiscount] = useState<string>("0");
    const [note, setNote] = useState<string>("");

    const resetDiscountsAndNote = useCallback((): void => {
        setItemDiscounts({});
        setGlobalDiscount("0");
        setNote("");
    }, []);

    // Si el carrito se vacía (por ej. después de generar el ticket, o clear manual),
    // limpiamos también los descuentos/nota para no arrastrarlos a la próxima venta
    useEffect(() => {
        if (!cart || cart.length === 0) {
            resetDiscountsAndNote();
        }
    }, [cart, resetDiscountsAndNote]);

    const ivaPercentage: number = iva;

    const totals = useMemo(
        () => calculateCartTotals(
            (cart ?? []).map((product) => ({
                lineBase: calculateItemAmount(product.price, product.stock_required, product.sale_type),
                itemDiscountPercentage: Number(itemDiscounts[String(product._id)]) || 0,
            })),
            Number(globalDiscount) || 0,
            ivaPercentage
        ),
        [cart, itemDiscounts, globalDiscount, ivaPercentage]
    );

    const cartWithSubtotals: ProductTicketWithStockType[] = useMemo(
        () => (cart ?? []).map((product, index) => ({
            ...product,
            subtotal: totals.lines[index],
            discountPercentage: Number(itemDiscounts[String(product._id)]) || 0,
        })),
        [cart, totals.lines, itemDiscounts]
    );

    const productsTotalPrice: number = totals.subtotal;
    const discountAmount: number = totals.discountAmount;
    const ivaAmount: number = totals.ivaAmount;
    const total: number = totals.total;
    const paymentMethodRef: React.RefObject<PaymentMethod> = useRef<PaymentMethod>(PaymentMethod?.Transfer);

    const totalUnits: number = useMemo(
        () => cart?.reduce((count: number, product: ProductTicketType) =>
            count + (isWeightSaleType(product.sale_type) ? 1 : product.stock_required), 0) ?? 0,
        [cart]
    );

    useEffect(() => {
        const ticketString: string | null = localStorage.getItem('last_ticket');
        if (!ticketString) return;

        const ticket: SellTicketType = JSON.parse(ticketString);

        setTicketSummary({
            sellId: ticket._id,
            ticketNumber: ticket._id,
            date: ticket.purchase_date,
            total: ticket.total_amount,
            productsCount: ticket.products.reduce(
                (count, product) => count + (isWeightSaleType(product.sale_type) ? 1 : product.stock_required),
                0
            ),
            paymentMethod: ticket.payment_method,
        });
    }, []);

    const handleItemDiscountChange = useCallback((_id: string, value: string): void => {
        setItemDiscounts((prev) => ({ ...prev, [_id]: sanitizePercentageInput(value) }));
    }, []);

    const handleGlobalDiscountChange = useCallback((value: string): void => {
        setGlobalDiscount(sanitizePercentageInput(value));
    }, []);

    const handleNoteChange = useCallback((value: string): void => {
        setNote(value);
    }, []);

    const generateTicket = useCallback(async (formValues: CartFormValues): Promise<void> => {
        const isPartial = formValues.status === SellStatusEnum.Parcial;

        const ticket: SellTicketType = {
            _id: crypto.randomUUID(),
            purchase_date: new Date().toLocaleDateString('es-AR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
            modification_date: null,
            seller_id: _id ?? "",
            seller_name: name,
            payment_method: formValues.payment_method,
            status: isPartial ? SellStatusEnum.Parcial : SellStatusEnum.Completada,
            amount_paid: isPartial ? formValues.amount_paid : total,
            debtor_name: isPartial ? formValues.debtor_name : null,
            products: cartWithSubtotals,
            // sub_total queda neto de descuento por ítem Y global, así el IVA
            // (guardado como %) sigue siendo consistente con total_amount:
            // total_amount = sub_total * (1 + iva/100).
            sub_total: totals.net,
            iva: ivaPercentage,
            total_amount: total,
            currency,
            settles_sell_id: null,
            settled_by_sell_id: null,
        }

        try {
            const response: CreateSellResponse | undefined = await dispatch(createSellThunk({ data: ticket }));

            if (!response) {
                showSnackBar(t("cart.snackbar.createSellFailed"), AlertColor.Error);
                return;
            }

            const savedTicket: SellTicketType = { ...ticket, _id: response._id };

            localStorage.setItem('last_ticket', JSON.stringify(savedTicket));
            createPdfTicket(savedTicket);
            // El back crea la notificación de venta (y la de stock bajo si corresponde)
            // como efecto de create-sell; refrescamos acá para que el vendedor que
            // vendió la vea en la campana al toque, sin esperar al polling.
            void dispatch(fetchNotificationsThunk());
            await dispatch(cleanCartThunk());
            resetDiscountsAndNote();
            navigate('/cart-order-confirmed');
        } catch (error) {
            const message = await parseApiError(error, t("cart.snackbar.createSellFailed"));
            showSnackBar(message, AlertColor.Error);
        }
    }, [cartWithSubtotals, totals.net, ivaPercentage, total, currency, dispatch, navigate, showSnackBar, t, resetDiscountsAndNote, _id, name]);

    const printTicket = useCallback((): void => {
        const ticketString: string | null = localStorage.getItem('last_ticket');
        if (!ticketString) return;
        const ticket: SellTicketType = JSON.parse(ticketString);
        createPdfTicket(ticket);
    }, []);

    const handleClearCart = useCallback((): void => {
        dispatch(cleanCartThunk());
        resetDiscountsAndNote();
    }, [dispatch, resetDiscountsAndNote]);

    const handleDecreaseProduct = useCallback((_id: string): void => {
        dispatch(removeFromCartThunk({ _id, amount: CartAmount.One }));
    }, [dispatch]);

    const handleIncreaseProduct = useCallback((_id: string): void => {
        dispatch(addOneUnitThunk({ _id }));
    }, [dispatch]);

    const goToNewSell = useCallback((): void => {
        navigate('/new-sell');
    }, [navigate]);

    const goToTicketDetail = useCallback((): void => {
        if (!ticketSummary) return;
        navigate(`/sell/${ticketSummary.sellId}`);
    }, [ticketSummary, navigate]);

    return {
        cart: cartWithSubtotals,
        productsTotalPrice,
        discountAmount,
        globalDiscount,
        note,
        ivaPercentage,
        ivaAmount,
        total,
        totalUnits,
        paymentMethodRef,
        ticketSummary,
        generateTicket,
        printTicket,
        handleClearCart,
        goToNewSell,
        goToTicketDetail,
        handleIncreaseProduct,
        handleDecreaseProduct,
        handleItemDiscountChange,
        handleGlobalDiscountChange,
        handleNoteChange,
    };
};