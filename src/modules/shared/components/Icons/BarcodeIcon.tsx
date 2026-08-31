import { createSvgIcon } from "@mui/material/utils";

// MUI no trae un ícono de código de barras "clásico" (@mui/icons-material
// solo tiene BarcodeReader, el lector/pistola). Mismo path que usa el
// mockup de referencia de /new-sell (Nueva Venta.dc.html).
const BarcodeIcon = createSvgIcon(
  <path d="M2 4h2v16H2V4zm3 0h1v16H5V4zm2 0h3v16H7V4zm4 0h1v16h-1V4zm2 0h2v16h-2V4zm3 0h1v16h-1V4zm2 0h3v16h-3V4zm4 0h2v16h-2V4z" />,
  "Barcode"
);

export default BarcodeIcon;
