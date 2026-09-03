import { Skeleton } from "@mui/material";
import { CardPayment } from "@mercadopago/sdk-react";
import type { CardPaymentBrickProps } from "@typings/membership/membershipComponentTypes";

// Wrapper presentacional del Card Payment Brick de Mercado Pago: la tarjeta
// se tokeniza en los campos iframe del propio Brick, nunca pasa por nuestro
// state ni por nuestra red. Solo tomamos el `token` del submit — no hay
// installments (recurrente mensual, no financiación de un pago único).
const CardPaymentBrick = ({ amount, payerEmail, ready, onSubmit, onError }: CardPaymentBrickProps): React.ReactNode => {
    if (!ready) return <Skeleton variant="rounded" height={220} />;

    return (
        <CardPayment
            initialization={{ amount, payer: { email: payerEmail } }}
            customization={{ paymentMethods: { minInstallments: 1, maxInstallments: 1 } }}
            onSubmit={({ token }) => onSubmit({ token })}
            onError={onError}
            locale="es-AR"
        />
    );
};

export default CardPaymentBrick;
