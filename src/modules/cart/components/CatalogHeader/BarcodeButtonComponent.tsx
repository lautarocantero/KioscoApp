import { alpha, Box, TextField, Tooltip, Typography, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { BarcodeButtonComponentProps } from '@typings/cart/cartComponentTypes';
import type { ReactNode } from 'react';
import { SELL_BARCODE_TOGGLE_ID } from '../../../../config/constants';
import BarcodeIcon from '../../../shared/components/Icons/BarcodeIcon';


export const BarcodeButtonComponent = ({ barcode }: BarcodeButtonComponentProps): ReactNode => {
  const { t } = useTranslation();

  const {
    toggleShowInput,
    showBarcodeInput,
    inputRef,
    value,
    onChange,
    onKeyDown
  } = barcode;


  return (
    <Tooltip title={t("cart.catalog.barcode.tooltip")}>
      <Box
        id={SELL_BARCODE_TOGGLE_ID}
        role="button"
        tabIndex={0}
        aria-label={t("cart.catalog.barcode.scanLabel")}
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={toggleShowInput}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          toggleShowInput();
        }}
        sx={(theme: Theme) => ({
          flex: '0 0 auto',
          position: 'relative',
          cursor: 'pointer',
          border: `1px solid ${theme?.custom?.lightMain}`,
          borderRadius: "12px",
          // Fondo fijo (no sigue el modo claro/oscuro), igual que la barra
          // de búsqueda: este botón está pensado como una "pill" blanca
          // sobre el header, siempre con el mismo contraste violeta/blanco.
          backgroundColor: theme?.custom?.white,
          height: "3.25em",
          // Ocupa el espacio que dejó libre el botón de carrito (eliminado):
          // antes era ancho de contenido, ahora tiene un piso más grande.
          // En mobile queda solo el ícono (ver label más abajo), así que no
          // fuerza el mismo ancho — si no, empuja el buscador a un tamaño
          // inusable en una pantalla angosta.
          minWidth: { xs: "3.5em", sm: "13em" },
          px: { xs: "0.8em", sm: "1.1em" },
          '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.12),
          }
        })}
      >
          <Box
            sx={{
              alignItems: 'center',
              borderRadius: '1em',
              display: 'flex',
              gap: '0.4em',
              flexShrink: 0,
              transition: 'all 0.3s ease',
              height: "2em",
            }}
          >
              <BarcodeIcon
                sx={(theme: Theme) => ({
                  color: theme?.palette.primary.main,
                  fontSize: theme?.typography?.body1?.fontSize,
                  transition: 'color 0.3s ease',
                })}
              />
            {!showBarcodeInput && (
              <Typography
                className="barcode-label"
                sx={(theme: Theme) => ({
                  display: { xs: 'none', sm: 'block' },
                  color: theme?.palette.primary.main,
                  fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
                  whiteSpace: 'nowrap',
                })}
              >
                {t("cart.catalog.barcode.scanLabel")}
              </Typography>
            )}
            {showBarcodeInput && (
              <TextField
                inputRef={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                variant="outlined"
                size="small"
                onKeyDown={onKeyDown}
                onClick={(e) => e.stopPropagation()}
                placeholder={t("cart.catalog.barcode.placeholder")}
                focused={true}
                sx={(theme: Theme) => ({
                  width: '10em',
                  backgroundColor: theme?.custom?.darkBackground,
                  '& .MuiInputBase-root': { height: '2em' },
                })}
              />
            )}
          </Box>
      </Box>
    </Tooltip>
  );
};

export default BarcodeButtonComponent;