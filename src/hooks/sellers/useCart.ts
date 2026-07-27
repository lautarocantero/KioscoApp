import type { CartFormValues, CreateSellResponse, ProductTicketType, ProductTicketWithStockType, SellTicketType, TicketSummaryType } from "@typings/sells/sellTypes";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { Currency, PaymentMethod, SellStatusEnum } from "../../typings/sells/sellsEnum";
import type { AppDispatch, RootState } from "../../store/seller/sellerSlice";
import { iva } from "../../config/constants";
import { createSellThunk } from "../../store/sell/sellsThunks";
import { createPdfTicket } from "../../modules/shared/helpers/createPdfTicket";
import { cleanCartThunk, removeFromCartThunk } from "../../store/seller/sellerThunks";
import { AlertColor } from "@typings/ui/ui";
import { buildColumnsForCartProducts } from "../../modules/cart/components/cartColumns";
import type { UseCartReturn } from "@typings/seller/sellerTypes";
import { CartAmount } from "@typings/seller/sellerEnums";


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
    const { seller } = useSelector((state: RootState) => state);
    const { cart }: { cart: ProductTicketWithStockType[] } = seller;


    const dispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();

    const [ticketSummary, setTicketSummary] = useState<TicketSummaryType | null>(null);

    const productsTotalPrice: number = cart?.reduce((count: number, product: ProductTicketType) => count + product.price * product.stock_required, 0);
    const ivaPercentage: number = iva;
    const ivaAmount: number = (productsTotalPrice * ivaPercentage) / 100;
    const total: number = productsTotalPrice + ivaAmount;
    const paymentMethodRef: React.RefObject<PaymentMethod> = useRef<PaymentMethod>(PaymentMethod?.Transfer);

    const totalUnits: number = useMemo(
        () => cart?.reduce((count: number, product: ProductTicketType) => count + product.stock_required, 0) ?? 0,
        [cart]
    );

    //─── 🔎 Resumen del ticket confirmado (leído desde localStorage) 🔎 ───
    useEffect(() => {
        const ticketString: string | null = localStorage.getItem('last_ticket');
        if (!ticketString) return;

        const ticket: SellTicketType = JSON.parse(ticketString);

        setTicketSummary({
            sellId: ticket._id,
            ticketNumber: ticket._id,
            date: ticket.purchase_date,
            total: ticket.total_amount,
            productsCount: ticket.products.reduce((count, product) => count + product.stock_required, 0),
            paymentMethod: ticket.payment_method,
        });
    }, []);

    //─── 🔎 Generación de ticket: arma el ticket (completo o parcial), lo persiste,
    //     genera el PDF, vacía el carrito y navega a la confirmación 🔎 ───
    const generateTicket = async (formValues: CartFormValues): Promise<void> => {
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
    }

    //─── 🔎 Impresión / descarga manual del último ticket 🔎 ───
    const printTicket = (): void => {
        const ticketString: string | null = localStorage.getItem('last_ticket');
        if (!ticketString) return;
        const ticket: SellTicketType = JSON.parse(ticketString);
        createPdfTicket(ticket);
    }

    //─── 🔎 Vacía por completo el carrito actual 🔎 ───
    const handleClearCart = (): void => {
        dispatch(cleanCartThunk());
    }

    //─── 🔎 Resta una unidad del producto indicado en el carrito 🔎 ───
    const handleDecreaseProduct = (_id: string): void => {
        dispatch(removeFromCartThunk({ _id, amount: CartAmount.One }));
    }

    const handleIncreaseProduct = (_id: string): void => {
        // 📝 To do: dispatch del thunk que sume +1 unidad cuando exista
    }

    //─── 🔎 Vuelve a la pantalla de nueva venta sin vaciar el carrito 🔎 ───
    const goBackToSell = (): void => {
        navigate('/new-sell');
    }

    //─── 🔎 Inicia una nueva venta desde cero 🔎 ───
    const goToNewSell = (): void => {
        navigate('/new-sell');
    }

    //─── 🔎 Navega al detalle de la venta del ticket recién confirmado 🔎 ───
    const goToTicketDetail = (): void => {
        if (!ticketSummary) return;
        navigate(`/sell/${ticketSummary.sellId}`);
    }

    const columns = useMemo(
        () => buildColumnsForCartProducts(handleIncreaseProduct, handleDecreaseProduct),
        [cart]
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