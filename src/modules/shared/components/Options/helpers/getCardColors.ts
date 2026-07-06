import type { Theme } from "@mui/material";

export const getCardColors = (theme: Theme): Record<string, string> => ({
  // Sells — Azul
  '/sells':                                  theme?.palette?.primary?.main,
  '/new-sell':                               theme?.palette?.primary?.main,
  '/sells-history':                          theme?.palette?.primary?.main,
  '/sells-history/:ticket_id':               theme?.palette?.primary?.main,
  '/cart':                                   theme?.palette?.primary?.main,
  '/cart-order-confirmed':                   theme?.palette?.primary?.main,


  // Shop — Verde
  '/shop':                                   theme?.palette?.primary?.main,
  '/shop-administrators':                    theme?.palette?.primary?.main,
  '/shop-administrators-list':               theme?.palette?.primary?.main,
  '/shop-administrators-create':             theme?.palette?.primary?.main,
  '/shop-administrators-edit':               theme?.palette?.primary?.main,
  '/shop-sellers':                           theme?.palette?.primary?.main,
  '/shop-sellers-list':                      theme?.palette?.primary?.main,
  '/shop-sellers-create':                    theme?.palette?.primary?.main,
  '/shop-sellers-edit':                      theme?.palette?.primary?.main,
  '/shop-stadistics':                        theme?.palette?.primary?.main,


  // Providers — Violeta
  '/providers':                              theme?.palette?.primary?.main,
  '/providers-list':                         theme?.palette?.primary?.main,
  '/providers-create':                       theme?.palette?.primary?.main,
  '/providers-edit':                         theme?.palette?.primary?.main,


  // Products — Gris oscuro
  '/products':                               theme?.palette?.primary?.main,
  '/products-list':                          theme?.palette?.primary?.main,
  '/products-create':                        theme?.palette?.primary?.main,
  '/products-edit':                          theme?.palette?.primary?.main,
  '/products/:productId/presentations/new':  theme?.palette?.primary?.main,


  // Categories — Naranja
  '/categories':                             theme?.palette?.primary?.main,
  '/categories-list':                        theme?.palette?.primary?.main,
  '/categories-create':                      theme?.palette?.primary?.main,
  '/categories-edit':                        theme?.palette?.primary?.main,


  // Account — Marrón dorado
  '/account':                                theme?.palette?.primary?.main,
  '/account-edit':                           theme?.palette?.primary?.main,
  '/account-subscription':                   theme?.palette?.primary?.main,
});