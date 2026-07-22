import { Box, IconButton, InputBase, Typography, type Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import type { SearchBarProps } from "@typings/shared/reactComponents";


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

  return (
    <Box
      role="search"
      sx={[
        (theme: Theme) => ({
          flex: 1,
          width: "100%",
          minWidth: "200px",
          maxWidth: fullWidth ? "100%" : "480px",
          display: "flex",
          justifyContent: 'space-between',
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 0.75,
          borderRadius: "8px",
          border: `1px solid ${theme.custom?.darkGray ?? theme.custom?.blackTranslucid}`,
          backgroundColor: theme.custom?.lightBackground,
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      <Box 
        sx={({
            display: "flex",
            justifyContent: 'flex-start',
            alignItems: "center",
            gap: 1,
            width: '90%'
          })}
      >
        <SearchIcon
          aria-hidden="true"
          sx={(theme: Theme) => ({
            fontSize: "1.1rem",
            color: theme.palette?.primary?.main ?? theme.custom?.translucidWhite,
            flexShrink: 0,
          })}
        />

        <InputBase
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputProps={{ "aria-label": placeholder }}
          sx={ (theme: Theme) => ({
            fontSize: "0.9rem",
            color: theme.custom?.fontColor,
            minWidth: "100%",
            "& input::placeholder": {
              color: theme.custom?.fontColor,
              opacity: 1,
            },
          })}
        />
      </Box>

      <Box>
        {value ? (
          <IconButton
            size="small"
            onClick={onClear}
            aria-label="Limpiar búsqueda"
            sx={{ p: 0.25, flexShrink: 0 }}
          >
            <DeleteIcon
              sx={(theme: Theme) => ({
                fontSize: "1.1rem",
                color: theme.palette?.primary?.main ?? theme.custom?.translucidWhite,
              })}
            />
          </IconButton>
        ) : showShortcutHint ? (
          <Typography
            variant="caption"
            sx={(theme: Theme) => ({
              color: theme.custom?.translucidFontColor,
              flexShrink: 0,
            })}
          >
            {shortcutHint}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
};

export default SearchBar;