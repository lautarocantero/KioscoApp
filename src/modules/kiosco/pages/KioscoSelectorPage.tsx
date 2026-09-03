import { Box, Stack, Typography, type Theme } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useKioscoSelector } from "../../../hooks/kiosco/useKioscoSelector";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import { useAutoStartTutorial } from "@hooks/tutorial/useAutoStartTutorial";
import { TutorialIdEnum } from "@typings/tutorial/enums";
import { selectKioscoTutorialSteps } from "../tutorial/selectKioscoTutorialSteps";
import LoadingScreen from "../../shared/components/LoadingScreen/LoadingScreen";
import type { RootState } from "../../../store/auth/authSlice";
import KioscoGrid from "../components/KioscoGrid/KioscoGrid";
import KioscoEmptyState from "../components/KioscoEmptyState/KioscoEmptyState";
import KioscoSelectorHeaderBar from "../components/KioscoSelectorHeaderBar/KioscoSelectorHeaderBar";
import SearchBar from "../../shared/components/SearchBar/SearchBar";

const KioscoSelectorPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { name } = useSelector((state: RootState) => state.auth);
    const { kioscos, filteredKioscos, loading, entering, handleEnterKiosco, query, onQueryChange, clearQuery, isEmpty, noResults } =
        useKioscoSelector();
    const isPageLoading = useInitialPageLoading(loading);
    // Los targets "crear"/"unirme" del tutorial solo existen en el DOM
    // cuando se muestra el estado vacío (KioscoEmptyState) — con kioscos ya
    // creados se renderiza KioscoGrid en su lugar, así que el tutorial no
    // aplica.
    useAutoStartTutorial(TutorialIdEnum.SelectKiosco, selectKioscoTutorialSteps, !isPageLoading && isEmpty);

    // El header (logout, idioma, tema) queda SIEMPRE montado, incluso
    // mientras carga: esta es la única pantalla sin AppShell/sidebar, así
    // que es la única salida del usuario si el fetch de kioscos tarda o
    // se cuelga. Por eso el gate usa fullViewport={false} y tapa solo el
    // área de contenido (saludo/buscador/grilla), como en los dominios
    // "form" anidados en AppLayout — nunca reemplaza la página entera.
    return (
        <Box
            component="main"
            sx={(theme: Theme) => ({
                minHeight: "100vh",
                width: "100%",
                backgroundColor: theme.custom.background,
                display: "flex",
                justifyContent: "center",
                p: { xs: 2, sm: 4 },
            })}
        >
            <Box sx={{ width: "100%", maxWidth: "1160px", display: "flex", flexDirection: "column" }}>
                <KioscoSelectorHeaderBar />

                {isPageLoading ? (
                    <LoadingScreen label="Cargando tus kioscos..." fullViewport={false} />
                ) : (
                    <>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 3 }}>
                            <Box
                                sx={(theme: Theme) => ({
                                    width: 48,
                                    height: 48,
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: theme.custom.lightMain,
                                })}
                            >
                                <StorefrontOutlinedIcon sx={{ color: "#fff" }} />
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                                    {t("kiosco.selector.greeting", { name })}
                                </Typography>
                                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                                    {t("kiosco.selector.accessCount", { count: kioscos.length })}
                                </Typography>
                            </Box>
                        </Stack>

                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
                            {t("kiosco.selector.title")}
                        </Typography>
                        <Typography variant="body1" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mb: 4 })}>
                            {t("kiosco.selector.subtitle")}
                        </Typography>

                        {!isEmpty && (
                            <Box sx={{ mb: 3 }}>
                                <SearchBar
                                    value={query}
                                    onChange={onQueryChange}
                                    onClear={clearQuery}
                                    placeholder={t("kiosco.selector.searchPlaceholder")}
                                    showShortcutHint={false}
                                    fullWidth
                                />
                            </Box>
                        )}

                        <Box sx={{ mb: 4 }}>
                            {isEmpty ? (
                                <KioscoEmptyState />
                            ) : (
                                <KioscoGrid
                                    kioscos={filteredKioscos}
                                    loading={loading}
                                    noResults={noResults}
                                    entering={entering}
                                    onEnter={handleEnterKiosco}
                                    onCreate={() => navigate("/create-kiosco")}
                                    onJoin={() => navigate("/join-kiosco")}
                                />
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default KioscoSelectorPage;
