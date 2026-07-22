import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addOneUnitThunk, addToCartThunk, selectProductThunk } from "../../store/seller/sellerThunks";
import type { Presentation } from "../../typings/presentation/presentationTypes";
import { AlertColor } from "../../typings/ui/ui";
import type { ProductTicketType, UseSellbarBarcodeParams, UseSellbarResult } from "@typings/sells/sellTypes";
import type { AppDispatch } from "../../store/sell/sellSlice";
import { getPresentationByBarcode } from "../../store/presentation/presentationThunks";

/*══════════════════════════════════════════════════════════════════════╗
║ 📷 useSellbarBarcode                                                  ║
║ Maneja el input de escaneo, la búsqueda de la presentation por        ║
║ código de barras, y su alta en el carrito.                            ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useSellbarBarcode = ({ cart, showSnackBar }: UseSellbarBarcodeParams): UseSellbarResult['barcode'] => {
    const dispatch = useDispatch<AppDispatch>();

    const [showBarcodeInput, setShowInput] = useState(false);
    const [barcode, setBarcode] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!showBarcodeInput) return;
        inputRef.current?.focus();
    }, [showBarcodeInput]);

    const getPresentation = async ({ barcode }: { barcode: string }): Promise<Presentation> => {
        const product: Presentation = await getPresentation({ barcode });

        if (!product) {
            showSnackBar(`No se encontró el código de barras`, AlertColor.Error);
            throw new Error("No se ha seleccionado un producto");
        }

        await dispatch(selectProductThunk({ productData: product }));
        return product;
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

        const productObject: ProductTicketType | undefined = cart?.find((prod) => prod._id === product._id);

        {/*─────────────────── 🔎 Si el producto ya se encuentra en el carrito 🔎 ───────────────────*/}

        if (productObject) {
            await dispatch(addOneUnitThunk({ _id: productObject._id }));
            setBarcode("");
            const nameEdited: string = productObject.name.length > 25 ? `${productObject.name.slice(0, 25)}...` : productObject.name;
            showSnackBar(`Agregado '${nameEdited}' al carrito`, AlertColor.Success);
            return;
        }

        {/*─────────────────── 🔎 Si el producto no se escaneo o agrego antes 🔎 ───────────────────*/}

        const {
            _id, name, description, image_url,
            brand, sku, model_type,
            model_size, price, expiration_date,
        } = product;

        const productTicket: ProductTicketType = {
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
        };

        await dispatch(addToCartThunk({ productData: productTicket }));

        const nameEdited: string = name.length > 25 ? `${name.slice(0, 25)}...` : name;

        setBarcode("");
        showSnackBar(`Agregado '${nameEdited}' al carrito`, AlertColor.Success);
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