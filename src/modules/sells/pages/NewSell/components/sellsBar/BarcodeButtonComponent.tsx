import BarcodeReaderIcon from '@mui/icons-material/BarcodeReader';
import { Grid, TextField, Tooltip, Typography, type Theme } from "@mui/material";
import { useSellbar } from 'hooks/sells/useSellBar';

export const BarcodeButtonComponent = (): React.ReactNode => {
  const { barcode } = useSellbar();
  const { 
    shouldShow, 
    toggleShowInput, 
    showInput, 
    inputRef, 
    value, 
    onChange, 
    onKeyDown 
  } = barcode;

  if (!shouldShow) return null;

  return (
    <Grid
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={(theme: Theme) => ({
        flex: 1,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          right: 0,
          height: '50%',
          width: '0.1em',
          backgroundColor: theme?.custom?.darkBackground,
        },
      })}
    >
      <Tooltip title="Usar lectora de código de barras">
        <Grid
          onClick={toggleShowInput}
          sx={(theme: Theme) => ({
            borderRadius: '1em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4em',
            flexShrink: 0,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            height: "2em",
            '&:hover': {
              backgroundColor: theme?.custom?.white,
            },
            '&:hover .MuiSvgIcon-root, &:hover .barcode-label': {
              color: theme?.palette?.primary?.main,
            },
          })}
        >
          <BarcodeReaderIcon
            sx={(theme: Theme) => ({
              color: theme?.palette.primary.main,
              fontSize: theme?.typography?.h6?.fontSize,
              transition: 'color 0.3s ease',
            })}
          />
          {!showInput && (
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
          {showInput && (
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
              sx={{
                width: '10em',
                '& .MuiInputBase-root': { height: '2em' },
              }}
            />
          )}
        </Grid>
      </Tooltip>
    </Grid>
  );
};

export default BarcodeButtonComponent;