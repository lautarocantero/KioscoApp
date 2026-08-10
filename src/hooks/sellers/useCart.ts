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


export const useCart = (showSnackBar: (message: string, severity: AlertColor) => void): UseCartReturn => {
    const { _id, username } = useSelector((state: RootState) => state.auth);
    const cart: ProductTicketWithStockType[] = useSelector((state: RootState) => state.seller.cart);

    const dispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();

    const [ticketSummary, setTicketSummary] = useState<TicketSummaryType | null>(null);

    // Overrides de subtotal editados a mano, indexados por _id del producto
    const [subtotalOverrides, setSubtotalOverrides] = useState<Record<string, number>>({});

    // Si el carrito se vacía (por ej. después de generar el ticket, o clear manual),
    // limpiamos también los overrides para no arrastrarlos a la próxima venta
    useEffect(() => {
        if (!cart || cart.length === 0) {
            setSubtotalOverrides({});
        }
    }, [cart]);

    const getItemSubtotal = useCallback(
        (product: ProductTicketType): number => {
            const override = subtotalOverrides[String(product._id)];
            return override !== undefined
                ? override
                : calculateItemAmount(product.price, product.stock_required, product.sale_type);
        },
        [subtotalOverrides]
    );

    const cartWithSubtotals: ProductTicketWithStockType[] = useMemo(
        () => cart?.map((product) => ({ ...product, subtotal: getItemSubtotal(product) })) ?? [],
        [cart, getItemSubtotal]
    );

    const productsTotalPrice: number = useMemo(
        () => cartWithSubtotals.reduce((count, product) => count + (product.subtotal ?? 0), 0),
        [cartWithSubtotals]
    );
    const ivaPercentage: number = iva;
    const ivaAmount: number = (productsTotalPrice * ivaPercentage) / 100;
    const total: number = productsTotalPrice + ivaAmount;
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

    const handleSubtotalChange = useCallback((_id: string, value: number): void => {
        setSubtotalOverrides((prev) => ({ ...prev, [_id]: value }));
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
            seller_name: username,
            payment_method: formValues.payment_method,
            status: isPartial ? SellStatusEnum.Parcial : SellStatusEnum.Completada,
            amount_paid: isPartial ? formValues.amount_paid : total,
            debtor_name: isPartial ? formValues.debtor_name : null,
            products: cartWithSubtotals,
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
        setSubtotalOverrides({});
        navigate('/cart-order-confirmed');
    }, [cartWithSubtotals, productsTotalPrice, ivaPercentage, total, dispatch, navigate, showSnackBar]);

    const printTicket = useCallback((): void => {
        const ticketString: string | null = localStorage.getItem('last_ticket');
        if (!ticketString) return;
        const ticket: SellTicketType = JSON.parse(ticketString);
        createPdfTicket(ticket);
    }, []);

    const handleClearCart = useCallback((): void => {
        dispatch(cleanCartThunk());
        setSubtotalOverrides({});
    }, [dispatch]);

    const handleDecreaseProduct = useCallback((_id: string): void => {
        dispatch(removeFromCartThunk({ _id, amount: CartAmount.One }));
        setSubtotalOverrides((prev) => {
            if (!(_id in prev)) return prev;
            const { [_id]: _removed, ...rest } = prev;
            return rest;
        });
    }, [dispatch]);

    const handleIncreaseProduct = useCallback((_id: string): void => {
        dispatch(addOneUnitThunk({ _id }));
        setSubtotalOverrides((prev) => {
            if (!(_id in prev)) return prev;
            const { [_id]: _removed, ...rest } = prev;
            return rest;
        });
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

    const columns = useMemo(
        () => buildColumnsForCartProducts(handleIncreaseProduct, handleDecreaseProduct, handleSubtotalChange),
        [handleIncreaseProduct, handleDecreaseProduct, handleSubtotalChange]
    );

    return {
        cart: cartWithSubtotals,
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