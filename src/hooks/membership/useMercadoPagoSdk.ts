import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { MP_PUBLIC_KEY } from "../../config/mercadoPago";
import type { UseMercadoPagoSdkReturn } from "@typings/membership/membershipTypes";

// Inicializa el SDK de Mercado Pago (Card Payment Brick) una sola vez. Sin
// VITE_MP_PUBLIC_KEY configurada no rompe la página — deja `ready` en false
// para que el checkout muestre un estado de "no disponible" en vez de
// intentar montar el Brick sin haber inicializado el SDK.
export const useMercadoPagoSdk = (): UseMercadoPagoSdkReturn => {
    const { t } = useTranslation();
    const [ready, setReady] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!MP_PUBLIC_KEY) {
            setError(t("membership.checkout.cardUnavailable"));
            return;
        }

        initMercadoPago(MP_PUBLIC_KEY);
        setReady(true);
    }, [t]);

    return { ready, error };
};

export default useMercadoPagoSdk;
