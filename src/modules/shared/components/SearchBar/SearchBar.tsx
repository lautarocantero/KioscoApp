// src/.../components/SearchBar/SearchBar.tsx
import { Box, IconButton, InputBase, Typography, type Theme, type SxProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onClear?: () => void;
  showShortcutHint?: boolean;
  shortcutHint?: string;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Buscar...",
  onClear,
  showShortcutHint = true,
  shortcutHint = "⌘",
  sx,
  fullWidth,
}: SearchBarProps): React.ReactNode => {
  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  return (
    <Box
      sx={[
        (theme: Theme) => ({
          flex: 1,
          width: "100%",
          minWidth: "200px",
          maxWidth: fullWidth ? "100%" : "480px",
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.75,
          borderRadius: "8px",
          border: `1px solid ${theme.custom?.posBorder ?? theme.custom?.blackTranslucid}`,
          backgroundColor: theme.custom?.posBackground,
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <SearchIcon
        sx={(theme: Theme) => ({
          fontSize: "1.1rem",
          color: theme.custom?.posAccent ?? theme.custom?.fontColorTransparent,
          flexShrink: 0,
        })}
      />

      <InputBase
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        sx={(theme: Theme) => ({
          flex: 1,
          fontSize: "0.9rem",
          color: theme.custom?.posText ?? theme.custom?.fontColor,
          "& input::placeholder": {
            color: theme.custom?.posPlaceholder ?? theme.custom?.fontColorTransparent,
            opacity: 1,
          },
        })}
      />

      {value ? (
        <IconButton
          size="small"
          onClick={handleClear}
          aria-label="Limpiar búsqueda"
          sx={{ p: 0.25, flexShrink: 0 }}
        >
          <DeleteIcon
            sx={(theme: Theme) => ({
              fontSize: "1.1rem",
              color: theme.custom?.posAccent ?? theme.custom?.fontColorTransparent,
            })}
          />
        </IconButton>
      ) : showShortcutHint ? (
        <Typography
          variant="caption"
          sx={(theme: Theme) => ({
            color: theme.custom?.posPlaceholder ?? theme.custom?.fontColorTransparent,
            flexShrink: 0,
          })}
        >
          {shortcutHint}
        </Typography>
      ) : null}
    </Box>
  );
};

export default SearchBar;