import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { addOneUnitThunk, addToCartThunk, selectPresentationThunk } from "../../store/cart/cartThunks";
import type { Presentation } from "../../typings/presentation/presentationTypes";
import { AlertColor } from "../../typings/ui/ui";
import type { AppDispatch } from "../../store/cart/cartSlice";
import { getPresentationByBarcode } from "../../store/presentation/presentationThunks";
import type { UseCartBarBarcodeParams, UseCartBarResult } from "@typings/cart/cartTypes";
import type { ProductTicketWithStockType } from "@typings/sells/sellTypes";

/*══════════════════════════════════════════════════════════════════════╗
║ 📷 useSellbarBarcode                                                  ║
║ Maneja el input de escaneo, la búsqueda de la presentation por        ║
║ código de barras, y su alta en el carrito.                            ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useSellbarBarcode = ({ cart, showSnackBar }: UseCartBarBarcodeParams): UseCartBarResult['barcode'] => {
    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    const [showBarcodeInput, setShowInput] = useState(false);
    const [barcode, setBarcode] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!showBarcodeInput) return;
        inputRef.current?.focus();
    }, [showBarcodeInput]);

    const getPresentation = async ({ barcode }: { barcode: string }): Promise<Presentation> => {
        const prod: Presentation | undefined = await dispatch(getPresentationByBarcode(barcode));

        if (!prod) {
            showSnackBar(t("cart.snackbar.barcodeNotFound"), AlertColor.Error);
            throw new Error("No se ha seleccionado un producto");
        }

        await dispatch(selectPresentationThunk({ presentationData: prod }));
        return prod;
    };

    const handleAddToCart = async () => {
        if (barcode === "") return;

        let product: Presentation;

        try {
            product = await getPresentation({ barcode });
        } catch {
            setBarcode("");
            return;
        }

        {/*─────────────────── 🔎 Sin stock disponible 🔎 ───────────────────*/}

        if (product.stock <= 0) {
            setBarcode("");
            showSnackBar(t("cart.snackbar.noStockAvailableForBarcode"), AlertColor.Error);
            return;
        }

        const productObject: ProductTicketWithStockType | undefined = cart?.find((prod) => prod._id === product._id);

        {/*─────────────────── 🔎 Si el producto ya se encuentra en el carrito 🔎 ───────────────────*/}

        if (productObject) {
            await dispatch(addOneUnitThunk({ _id: productObject._id }));
            setBarcode("");
            const nameEdited: string = productObject.name.length > 25 ? `${productObject.name.slice(0, 25)}...` : productObject.name;
            showSnackBar(t("cart.snackbar.addedToCart", { name: nameEdited }), AlertColor.Success);
            return;
        }

        {/*─────────────────── 🔎 Si el producto no se escaneo o agrego antes 🔎 ───────────────────*/}

        const {
            _id, name, description, image_url,
            brand, sku, model_type,
            model_size, price, expiration_date,
            product_id, stock, sale_type,
        } = product;

        const productTicket: ProductTicketWithStockType = {
            _id,
            name,
            description,
            image_url,
            brand,
            sku,
            model_type,
            model_size,
            price,
            expiration_date,
            stock_required: 1,
            product_id,
            stock,
            sale_type,
        };

        const wasAdded = await dispatch(addToCartThunk({ productData: productTicket }));

        if (!wasAdded) {
            setBarcode("");
            showSnackBar(t("cart.snackbar.addToCartFailedGeneric"), AlertColor.Error);
            return;
        }

        const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;

        setBarcode("");
        showSnackBar(t("cart.snackbar.addedToCart", { name: nameEdited }), AlertColor.Success);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            void handleAddToCart();
        }
    };

    const toggleShowInput = () => setShowInput((prev) => !prev);

    return {
        showBarcodeInput,
        value: barcode,
        inputRef,
        toggleShowInput,
        onChange: setBarcode,
        onKeyDown: handleKeyDown,
    };
};