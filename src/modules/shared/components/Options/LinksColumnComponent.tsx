import { Box, Grid, Link, type Theme } from '@mui/material';
import { Link as LinkReactRouter } from 'react-router-dom';
import type { LinksColumnProps, OptionLink } from '../../../../typings/ui/uiModules';

const CARD_COLORS: Record<string, string> = {
  // Sells — Azul
  '/sells':                            '#0386EE',
  '/new-sell':                         '#0386EE',
  '/sells-history':                    '#0386EE',
  '/sells-history/:ticket_id':         '#0386EE',
  '/cart':                             '#0386EE',
  '/cart-order-confirmed':             '#0386EE',

  // Shop — Verde
  '/shop':                             '#1D9E75',
  '/shop-administrators':              '#1D9E75',
  '/shop-administrators-list':         '#1D9E75',
  '/shop-administrators-create':       '#1D9E75',
  '/shop-administrators-edit':         '#1D9E75',
  '/shop-sellers':                     '#1D9E75',
  '/shop-sellers-list':                '#1D9E75',
  '/shop-sellers-create':              '#1D9E75',
  '/shop-sellers-edit':                '#1D9E75',
  '/shop-stadistics':                  '#1D9E75',

  // Providers — Violeta
  '/providers':                        '#534AB7',
  '/providers-list':                   '#534AB7',
  '/providers-create':                 '#534AB7',
  '/providers-edit':                   '#534AB7',

  // Products — Gris oscuro
  '/products':                         '#1f1f24',
  '/products-list':                    '#1f1f24',
  '/products-create':                  '#1f1f24',
  '/products-edit':                    '#1f1f24',
  '/products/:productId/variants/new': '#1f1f24',

  // Categories — Naranja
  '/categories':                       '#C2580A',
  '/categories-list':                  '#C2580A',
  '/categories-create':                '#C2580A',
  '/categories-edit':                  '#C2580A',

  // Account — Marrón dorado
  '/account':                          '#854F0B',
  '/account-edit':                     '#854F0B',
  '/account-subscription':             '#854F0B',
};

const DEFAULT_COLOR = '#333333';

const LinksColumnComponent = ({ links, appTheme }: LinksColumnProps): React.ReactNode => {
  return (
    <Grid size={{ xs: 6, sm: 6 }}>
      {links.map((link: OptionLink) => {
        const accent = CARD_COLORS[link.url] ?? DEFAULT_COLOR;
        return (
          <Link
            key={link.url}
            component={LinkReactRouter}
            to={link.url}
            sx={(theme: Theme) => ({
              display: "flex",
              flexDirection: "row",
              alignItems: "stretch",       // ← ambas columnas misma altura
              mb: 1.5,
              minHeight: "110px",
              borderRadius: "14px",
              overflow: "hidden",          // ← recorta el acento en las esquinas
              textDecoration: "none",
              backgroundColor: theme.custom?.white,
              border: `0.5px solid ${
                !appTheme ? "rgba(255,255,255,0.08)" : theme.custom?.blackTranslucid
              }`,
              // Efecto 3D: sombra hacia abajo-derecha, como luz viniendo de arriba-izquierda
              boxShadow: `
                0 1px 3px rgba(0, 0, 0, 0.06),
                4px 8px 16px rgba(0, 0, 0, 0.10),
                8px 16px 28px rgba(0, 0, 0, 0.08)
              `,
              cursor: "pointer",
              transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s ease, background-color 0.15s",
              "&:hover": {
                boxShadow: `
                  0 2px 4px rgba(0, 0, 0, 0.08),
                  6px 12px 20px rgba(0, 0, 0, 0.14),
                  12px 24px 36px rgba(0, 0, 0, 0.12)
                `,
                transform: "translateY(-4px) translateX(-2px)",
                backgroundColor: !appTheme
                  ? "rgba(255,255,255,0.10)"
                  : theme.custom?.backgroundLigth,
              },
            })}
          >
            {/* Acento lateral — fondo de color con ícono */}
            <Box
              sx={{
                width: "64px",
                flexShrink: 0,
                backgroundColor: accent,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.7rem",
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {link.icon}
            </Box>

            {/* Contenido de texto — fondo neutro del tema */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "4px",
                flex: 1,
                p: "16px 16px",
              }}
            >
               <Box
                sx={(theme: Theme) => ({
                  fontSize: "0.78rem",
                  fontWeight: 400,
                  color: theme.custom?.fontColorDark,
                  lineHeight: 1.3,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                })}
              >
                {link.description}
              </Box>
                {link.value && (
                  <Box
                    sx={{
                      fontSize: "1.6rem",
                      fontWeight: 600,
                      color: accent,
                      lineHeight: 1.1,
                    }}
                  >
                    {link.value}
                  </Box>
                )}
                <Box
                  sx={(theme: Theme) => ({
                    fontSize: "0.70rem",
                    color: theme.custom?.fontColorDark,
                    lineHeight: 1.4,
                    mt: link.value ? "2px" : 0,
                  })}
                >
                  {link.subtitle ?? "Ver sección →"}
                </Box>
            </Box>
          </Link>
        );
      })}
    </Grid>
  );
};

export default LinksColumnComponent;
