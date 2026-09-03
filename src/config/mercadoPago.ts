// Public Key de Mercado Pago: segura de exponer client-side (a diferencia del
// Access Token, que es secreto y solo vive en el backend). Se usa para
// inicializar el Card Payment Brick (ver useMercadoPagoSdk).
export const MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY;
