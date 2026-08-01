import type { CartFormValues, CreateSellResponse, ProductTicketType, ProductTicketWithStockType, SellTicketType, TicketSummaryType } from "@typings/sells/sellTypes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { Currency, PaymentMethod, SellStatusEnum } from "../../typings/sells/sellsEnum";
import type { AppDispatch, RootState } from "../../store/seller/sellerSlice";
import { iva } from "../../config/constants";
import { createSellThunk } from "../../store/sell/sellsThunks";
import { createPdfTicket } from "../../modules/shared/helpers/createPdfTicket";
import { cleanCartThunk, removeFromCartThunk, addOneUnitThunk } from "../../store/seller/sellerThunks";
import { AlertColor } from "@typings/ui/ui";
import { buildColumnsForCartProducts } from "../../modules/cart/components/cartColumns";
import type { UseCartReturn } from "@typings/seller/sellerTypes";
import { CartAmount } from "@typings/seller/sellerEnums";
import { calculateItemAmount, isWeightSaleType } from "../../modules/shared/helpers/saleTypeHelper";


/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useCart                                                            ║
║                                                                       ║
║ Maneja el estado y las acciones del carrito de venta:                ║
║   1. Lee el cart desde el store del seller                            ║
║   2. Calcula totales (subtotal, IVA, total, unidades)                ║
║   3. Genera el ticket de venta (completa o parcial) y su PDF          ║
║   4. Maneja el resumen del último ticket confirmado (localStorage)    ║
║   5. Expone acciones de navegación y manipulación del carrito         ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useCart = (showSnackBar: (message: string, severity: AlertColor) => void): UseCartReturn => {
    // 🔧 Solo se suscribe a seller.cart, no al store completo
    const cart: ProductTicketWithStockType[] = useSelector((state: RootState) => state.seller.cart);

    const dispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();

    const [ticketSummary, setTicketSummary] = useState<TicketSummaryType | null>(null);

    const productsTotalPrice: number = useMemo(
    () => cart?.reduce((count, product) => count + calculateItemAmount(product.price, product.stock_required, product.sale_type), 0) ?? 0,
    [cart]
);
    const ivaPercentage: number = iva;
    const ivaAmount: number = (productsTotalPrice * ivaPercentage) / 100;
    const total: number = productsTotalPrice + ivaAmount;
    const paymentMethodRef: React.RefObject<PaymentMethod> = useRef<PaymentMethod>(PaymentMethod?.Transfer);

    const totalUnits: number = useMemo(
        () => cart?.reduce((count: number, product: ProductTicketType) => count + product.stock_required, 0) ?? 0,
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
            seller_id: '0123',
            seller_name: 'Claudia',
            payment_method: formValues.payment_method,
            status: isPartial ? SellStatusEnum.Parcial : SellStatusEnum.Completada,
            amount_paid: isPartial ? formValues.amount_paid : total,
            debtor_name: isPartial ? formValues.debtor_name : null,
            products: cart,
            sub_total: productsTotalPrice,
            iva: ivaPercentage,
            total_amount: total,
            currency: Currency?.Ars,
        }

        const response: CreateSellResponse | undefined = await dispatch(createSellThunk({ data: ticket }));

        if (!response) {
            showSnackBar(`Ocurrio un error al agregar el producto.`, AlertColor.Error);
            throw new Error('Ocurrio un error registrando la compra, intentalo de nuevo');
        }

        const savedTicket: SellTicketType = { ...ticket, _id: response._id };

        localStorage.setItem('last_ticket', JSON.stringify(savedTicket));
        createPdfTicket(savedTicket);
        await dispatch(cleanCartThunk());
        navigate('/cart-order-confirmed');
    }, [cart, productsTotalPrice, ivaPercentage, total, dispatch, navigate, showSnackBar]);

    const printTicket = useCallback((): void => {
        const ticketString: string | null = localStorage.getItem('last_ticket');
        if (!ticketString) return;
        const ticket: SellTicketType = JSON.parse(ticketString);
        createPdfTicket(ticket);
    }, []);

    const handleClearCart = useCallback((): void => {
        dispatch(cleanCartThunk());
    }, [dispatch]);

    const handleDecreaseProduct = useCallback((_id: string): void => {
        dispatch(removeFromCartThunk({ _id, amount: CartAmount.One }));
    }, [dispatch]);

    const handleIncreaseProduct = useCallback((_id: string): void => {
        dispatch(addOneUnitThunk({ _id }));
    }, [dispatch]);

    const goBackToSell = useCallback((): void => {
        navigate('/new-sell');
    }, [navigate]);

    const goToNewSell = useCallback((): void => {
        navigate('/new-sell');
    }, [navigate]);

    const goToTicketDetail = useCallback((): void => {
        if (!ticketSummary) return;
        navigate(`/sell/${ticketSummary.sellId}`);
    }, [ticketSummary, navigate]);

    // 🔧 Ya no depende de [cart]: las funciones son estables por useCallback
    const columns = useMemo(
        () => buildColumnsForCartProducts(handleIncreaseProduct, handleDecreaseProduct),
        [handleIncreaseProduct, handleDecreaseProduct]
    );

    return {
        cart,
        productsTotalPrice,
        ivaPercentage,
        ivaAmount,
        total,
        totalUnits,
        paymentMethodRef,
        ticketSummary,
        generateTicket,
        printTicket,
        handleClearCart,
        goBackToSell,
        goToNewSell,
        goToTicketDetail,
        columns,
    };
};