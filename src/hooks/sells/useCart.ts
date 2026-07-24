import type { ProductTicketType, SellTicketType, UseCartReturn } from "@typings/sells/sellTypes";
import { useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { Currency, PaymentMethod } from "../../typings/sells/sellsEnum";
import type { AppDispatch, RootState } from "../../store/seller/sellerSlice";
import { iva } from "../../config/constants";
import { createSellThunk } from "../../store/sell/sellsThunks";
import { createPdfTicket } from "../../modules/shared/helpers/createPdfTicket";
import { cleanCartThunk } from "../../store/seller/sellerThunks";
import { AlertColor } from "@typings/ui/ui";


export const useCart = (showSnackBar: (message: string, severity: AlertColor) => void): UseCartReturn => {
    const { seller } = useSelector((state: RootState) => state);
    const { cart }: { cart: ProductTicketType[] } = seller;

    const dispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();

    const productsTotalPrice: number = cart?.reduce((count: number, product: ProductTicketType) => count + product.price * product.stock_required, 0);
    const ivaPercentage: number = iva;
    const ivaAmount: number = (productsTotalPrice * ivaPercentage) / 100;
    const total: number = productsTotalPrice + ivaAmount;
    const paymentMethodRef: React.RefObject<PaymentMethod> = useRef<PaymentMethod>(PaymentMethod?.Transfer);

    const totalUnits: number = useMemo(
        () => cart?.reduce((count: number, product: ProductTicketType) => count + product.stock_required, 0) ?? 0,
        [cart]
    );

    //─── 🔎 Generación de ticket 🔎 ───
    const generateTicket = async (): Promise<void> => {
        const ticket: SellTicketType = {
            _id: crypto.randomUUID(),
            purchase_date: new Date().toLocaleDateString('es-AR',
              {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              }),
            modification_date: null,
            seller_id: '0123',
            seller_name: 'Claudia',
            payment_method: paymentMethodRef?.current,
            products: cart,
            sub_total: productsTotalPrice,
            iva: ivaPercentage,
            total_amount: total,
            currency: Currency?.Ars,
        }

        localStorage.setItem('last_ticket', JSON.stringify(ticket));
        const response: string | undefined = await dispatch(createSellThunk({ data: ticket }));

        if (!response) {
            showSnackBar(`Ocurrio un error al agregar el producto.`, AlertColor.Error);
            throw new Error('Ocurrio un error registrando la compra, intentalo de nuevo');
        }

        createPdfTicket(ticket);
        await dispatch(cleanCartThunk());
        navigate('/cart-order-confirmed');
    }

    const handleClearCart = (): void => {
        dispatch(cleanCartThunk());
    }

    const goBackToSell = (): void => {
        navigate('/new-sell');
    }

    const goToNewSell = (): void => {
        navigate('/new-sell');
    }

    return {
        cart,
        productsTotalPrice,
        ivaPercentage,
        ivaAmount,
        total,
        totalUnits,
        paymentMethodRef,
        generateTicket,
        handleClearCart,
        goBackToSell,
        goToNewSell,
    };
};