import { Box, Grid, Stack, Typography, type Theme } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useKioscoSelector } from "../../../hooks/kiosco/useKioscoSelector";
import type { RootState } from "../../../store/auth/authSlice";
import KioscoCard from "../components/KioscoCard/KioscoCard";
import KioscoCardSkeleton from "../components/KioscoCard/KioscoCardSkeleton";
import KioscoSelectorActionRow from "../components/KioscoSelectorActionRow/KioscoSelectorActionRow";

const KioscoSelectorPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { name } = useSelector((state: RootState) => state.auth);
    const { kioscos, loading, entering, handleEnterKiosco } = useKioscoSelector();

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
            <Box sx={{ width: "100%", maxWidth: "1100px" }}>
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

                {loading && kioscos.length === 0 ? (
                    <Grid container spacing={3} sx={{ mb: 4 }}>
                        {[0, 1, 2].map((index) => (
                            <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                                <KioscoCardSkeleton />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    kioscos.length > 0 && (
                        <Grid container spacing={3} sx={{ mb: 4 }}>
                            {kioscos.map((kiosco, index) => (
                                <Grid key={kiosco._id} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <KioscoCard
                                        kiosco={kiosco}
                                        colorIndex={index}
                                        entering={entering === kiosco._id}
                                        onEnter={() => handleEnterKiosco(kiosco)}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )
                )}

                <Stack spacing={2}>
                    <KioscoSelectorActionRow
                        icon={<AddCircleOutlineOutlinedIcon />}
                        title={t("kiosco.selector.createRow.title")}
                        subtitle={t("kiosco.selector.createRow.subtitle")}
                        accent="lightMain"
                        endIcon={<ChevronRightOutlinedIcon />}
                        onClick={() => navigate("/create-kiosco")}
                    />
                    <KioscoSelectorActionRow
                        icon={<PersonAddAltOutlinedIcon />}
                        title={t("kiosco.selector.joinRow.title")}
                        subtitle={t("kiosco.selector.joinRow.subtitle")}
                        accent="lightSecondary"
                        endIcon={<ChevronRightOutlinedIcon />}
                        onClick={() => navigate("/join-kiosco")}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default KioscoSelectorPage;
