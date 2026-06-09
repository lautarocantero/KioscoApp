import type { Theme } from "@mui/material";

export const getCardColors = (theme: Theme): Record<string, string> => ({
  // Sells — Azul
  '/sells':                                  theme.custom.accentSells,
  '/new-sell':                               theme.custom.accentSells,
  '/sells-history':                          theme.custom.accentSells,
  '/sells-history/:ticket_id':               theme.custom.accentSells,
  '/cart':                                   theme.custom.accentSells,
  '/cart-order-confirmed':                   theme.custom.accentSells,


  // Shop — Verde
  '/shop':                                   theme.custom.accentShop,
  '/shop-administrators':                    theme.custom.accentShop,
  '/shop-administrators-list':               theme.custom.accentShop,
  '/shop-administrators-create':             theme.custom.accentShop,
  '/shop-administrators-edit':               theme.custom.accentShop,
  '/shop-sellers':                           theme.custom.accentShop,
  '/shop-sellers-list':                      theme.custom.accentShop,
  '/shop-sellers-create':                    theme.custom.accentShop,
  '/shop-sellers-edit':                      theme.custom.accentShop,
  '/shop-stadistics':                        theme.custom.accentShop,


  // Providers — Violeta
  '/providers':                              theme.custom.accentProviders,
  '/providers-list':                         theme.custom.accentProviders,
  '/providers-create':                       theme.custom.accentProviders,
  '/providers-edit':                         theme.custom.accentProviders,


  // Products — Gris oscuro
  '/products':                               theme.custom.accentProducts,
  '/products-list':                          theme.custom.accentProducts,
  '/products-create':                        theme.custom.accentProducts,
  '/products-edit':                          theme.custom.accentProducts,
  '/products/:productId/presentations/new':  theme.custom.accentProducts,


  // Categories — Naranja
  '/categories':                             theme.custom.accentCategories,
  '/categories-list':                        theme.custom.accentCategories,
  '/categories-create':                      theme.custom.accentCategories,
  '/categories-edit':                        theme.custom.accentCategories,


  // Account — Marrón dorado
  '/account':                                theme.custom.accentAccount,
  '/account-edit':                           theme.custom.accentAccount,
  '/account-subscription':                   theme.custom.accentAccount,
});