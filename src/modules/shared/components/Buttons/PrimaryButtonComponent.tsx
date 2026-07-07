
//─────────────────── Componente 🧩: PrimaryButtonComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Botón principal reutilizable para acciones destacadas dentro de la interfaz.  
// Permite personalizar texto, color, tipo, ancho, padding y atributos de prueba (`data-testid`).  
// Se integra como acción primaria en formularios, flujos de usuario y pantallas clave.  

//-----------------------------------------------------------------------------//

import { Button, type Theme } from "@mui/material";
import type { PrimaryButtonComponentProps } from "@typings/ui/buttons.types";

const PrimaryButtonComponent = ({
  buttonText,
  buttonOnClick,
  buttonWidth = "280px",
  buttonType = "button",
  buttonColor = "default",
  dataTestId = 'default',
  padding = 1,
  marginTop = '1.5em',
  icon = null,
}: PrimaryButtonComponentProps): React.ReactNode => {
  return (
    <Button
      sx={{
        backgroundColor: (theme: Theme) =>
          buttonColor === "default"
            ? theme?.palette?.primary?.main
            : theme?.palette?.error?.main,
        color: (theme: Theme) => theme?.custom?.white,
        mt: {xs:marginTop, md: '0'},
        width: buttonWidth,
        borderRadius: "0.4em",
        padding: padding,
        textTransform: "none",
        fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
      }}
      onClick={buttonOnClick}
      type={buttonType}
      role="button"
      data-testid={dataTestId}
    >
      {icon}{buttonText}
    </Button>
  );
};

export default PrimaryButtonComponent;
