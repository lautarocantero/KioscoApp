import BarcodeReaderIcon from '@mui/icons-material/BarcodeReader';
import { Box, TextField, Tooltip, Typography, type Theme } from "@mui/material";
import type { BarcodeButtonComponentProps } from '@typings/sells/SellComponentTypes';
import type { ReactNode } from 'react';


export const BarcodeButtonComponent = ({ barcode }: BarcodeButtonComponentProps): ReactNode => {

  const {
    toggleShowInput,
    showBarcodeInput,
    inputRef,
    value,
    onChange,
    onKeyDown
  } = barcode;


  return (
    <Tooltip title="Usar lectora de código de barras">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        onClick={toggleShowInput}
        sx={(theme: Theme) => ({
          flex: 1,
          position: 'relative',
          cursor: 'pointer',
          border: `1px solid ${theme?.custom?.darkGray}`,
          borderRadius: "8px",
          width: "100%",
          '&:hover': {
                backgroundColor: theme?.custom?.darkBackground,
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
              <BarcodeReaderIcon
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
                  color: theme?.palette.primary.main,
                  fontSize: theme?.typography?.body1?.fontSize,
                  whiteSpace: 'nowrap',
                })}
              >
                Escanear
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
                placeholder="Escanee aquí"
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