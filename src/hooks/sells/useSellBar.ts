import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState as SellerRootState } from "../../store/seller/sellerSlice";
import { addOneUnitThunk, addToCartThunk, selectProductThunk } from "../../store/seller/sellerThunks";
import { getPresentationsById } from "store/presentation/presentationThunks";
import type { Presentation } from "../../typings/presentation/presentationTypes";
import type { ProductTicketType } from "../../typings/seller/sellerTypes";
import { AlertColor } from "../../typings/ui/ui";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";
import { useProductsListData } from "../products/useProductListData";
import type { AppDispatch } from "store/sell/sellSlice";

export const useSellbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { showSnackBar } = useContext(SnackBarContext)!;
    const { cart } = useSelector((state: SellerRootState) => state.seller);

    /*──────────────── 🔎 Search ────────────────*/
    const { searchTerm, setSearchTerm } = useProductsListData();
    const handleClearSearch = () => setSearchTerm("");

    /*──────────────── 📷 Barcode ────────────────*/
    const [showBarcodeInput, setShowInput] = useState(false);
    const [barcode, setBarcode] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!showBarcodeInput) return;
        inputRef.current?.focus();
    }, [showBarcodeInput]);


    const getPresentation = async ({ id }: { id: string }): Promise<Presentation> => {
        const prod: Presentation[] | undefined = await dispatch(getPresentationsById(id));

        if (!prod) {
            showSnackBar(`Código de barras inexistente`, AlertColor.Error);
            throw new Error("No se ha seleccionado un producto");
        }

        await dispatch(selectProductThunk({ productData: prod[0] }));
        return prod[0];
    };

    const handleAddToCart = async () => {
        if (barcode === "") return;

        const product: Presentation = await getPresentation({ id: barcode });

        if (!product) {
            showSnackBar(`Código de barras inexistente`, AlertColor.Error);
            return;
        }

        const productObject: ProductTicketType | undefined = cart?.find((prod) => prod._id === barcode);

        {/*─────────────────── 🔎 Si el producto ya se encuentra en el carrito 🔎 ───────────────────*/}

        if (productObject) {
            await dispatch(addOneUnitThunk({ _id: productObject?._id }));
            setBarcode("");
            const nameEdited: string = productObject?.name.length > 25 ? `${productObject?.name.slice(0, 25)}...` : productObject?.name;
            showSnackBar(`Agregado '${nameEdited}' al carrito`, AlertColor.Success);
            return;
        }

        {/*─────────────────── 🔎 Si el producto no se escaneo o agrego antes 🔎 ───────────────────*/}

        const {
            _id, name, description, image_url,
            brand, product_id, sku, model_type,
            model_size, price, expiration_date,
        } = product;

        const productTicket: ProductTicketType = {
            _id,
            name,
            description,
            image_url,
            brand,
            product_id,
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

    /*──────────────── 🛒 Cart ────────────────*/
    const goToCart = () => navigate('/cart');

    return {
        search: {
            value: searchTerm,
            onChange: setSearchTerm,
            onClear: handleClearSearch,
        },
        barcode: {
            showBarcodeInput,
            value: barcode,
            inputRef,
            toggleShowInput,
            onChange: setBarcode,
            onKeyDown: handleKeyDown,
        },
        cart: {
            count: cart?.length,
            goToCart,
        },
    };
};