import { Box, Collapse, Skeleton, Typography, type Theme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSidebarKioscoCard } from "../hooks/useSidebarKioscoCard";
import { getRoleLabel } from "../../../../helpers/getRoleLabel";

// "Tienda activa" — siempre arriba del panel. Al tocarla despliega el
// resto de las tiendas del usuario para cambiar de contexto sin salir
// del panel de la sección en la que se está.
const SidebarKioscoCard = (): React.ReactNode => {
  const { activeKiosco, kioscos, loading, error, entering, isListOpen, toggleList, handleSelect } = useSidebarKioscoCard();

  if (loading && !activeKiosco) {
    return (
      <Box sx={{ width: "100%", px: 2, py: 1.5 }}>
        <Skeleton variant="text" width="60%" height={14} />
        <Skeleton variant="text" width="80%" height={22} />
      </Box>
    );
  }

  if (!activeKiosco) return null;

  const otherKioscos = kioscos.filter((kiosco) => kiosco._id !== activeKiosco._id);

  return (
    <Box sx={{ width: "100%", borderBottom: (theme: Theme) => `1px solid ${theme.custom.darkGray}` }}>
      <Box
        component="button"
        type="button"
        onClick={toggleList}
        aria-expanded={isListOpen}
        sx={(theme: Theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          border: "none",
          background: "none",
          cursor: "pointer",
          px: 2,
          py: 1.5,
          color: theme.custom.white,
          textAlign: "left",
        })}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={(theme: Theme) => ({ fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em", color: theme.custom.translucidWhite })}>
            TIENDA ACTIVA
          </Typography>
          <Typography noWrap sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
            {activeKiosco.name}
          </Typography>
        </Box>

        {otherKioscos.length > 0 && (
          <ExpandMoreIcon
            sx={{ fontSize: "1.1rem", flexShrink: 0, transition: "transform 0.2s", transform: isListOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        )}
      </Box>

      {otherKioscos.length > 0 && (
        <Collapse in={isListOpen} timeout={220}>
          <Box component="ul" sx={{ listStyle: "none", m: 0, px: 1, pb: 1 }}>
            {error && (
              <Typography sx={(theme: Theme) => ({ fontSize: "0.72rem", color: theme.palette.error.main, px: 1, pb: 1 })}>
                {error}
              </Typography>
            )}
            {otherKioscos.map((kiosco) => (
              <Box component="li" key={kiosco._id}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => handleSelect(kiosco)}
                  disabled={entering === kiosco._id}
                  sx={(theme: Theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    border: "none",
                    background: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                    px: 1.5,
                    py: "6px",
                    color: theme.custom.white,
                    opacity: entering === kiosco._id ? 0.6 : 1,
                    "&:hover": { backgroundColor: theme.custom.darkGray },
                  })}
                >
                  <Typography noWrap sx={{ fontSize: "0.82rem", fontWeight: 500 }}>
                    {kiosco.name}
                  </Typography>
                  <Typography sx={(theme: Theme) => ({ fontSize: "0.68rem", color: theme.custom.translucidWhite })}>
                    {getRoleLabel(kiosco.role)}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

export default SidebarKioscoCard;
