import React from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Button } from "@mui/material";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DataTable from "../../../shared/components/DataTable/DataTable";
import TableIconHeader from "../../../shared/components/DataTable/TableIconHeader";
import TableFilterTabs from "../../../shared/components/DataTable/TableFilterTabs";
import { getTableActionButtonSx } from "../../../shared/components/DataTable/getTableActionButtonSx";
import AppLayout from "../../../shared/layout/AppLayout";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import LoadingScreen from "../../../shared/components/LoadingScreen/LoadingScreen";
import { useSells } from "../../../../hooks/sells/useSells";
import type { Sell } from "@typings/sells/sellTypes";
import { SellFilterEnum } from "@typings/sells/sellsEnum";
import { SELLS_PERIOD_VALUES } from "@typings/sells/enums";
import { SELL_FILTER_OPTIONS } from "../../helpers/sellFilterOptions";
import { formatSellsPeriodRangeLabel } from "../../helpers/formatSellsPeriodRangeLabel";
import { exportSellsToCsv } from "../../helpers/exportSellsToCsv";
import SettleDebtDialog from "./components/SettleDebtDialog";
import SellsContextBand from "./components/SellsContextBand";

const SellsListPage = (): React.ReactNode => {
    const { t } = useTranslation();
    const {
        sells,
        loading,
        error,
        deleteDialog,
        clearError,
        handleDeleteCancel,
        handleDeleteConfirm,
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
        counts,
        columns,
        settleDebtDialog,
        settleDebtIsSubmitting,
        settleDebtErrorMessage,
        handleSettleDebtCancel,
        handleSettleDebtConfirm,
        handleViewPartials,
        partialsFilterChipRef,
        period,
        setPeriod,
        periodAvailability,
        periodRange,
        kpis,
        sparkline,
        sparklineBestDay,
        facts,
        partialsAlert,
        hasSellsInPeriod,
    } = useSells();
    const isPageLoading = useInitialPageLoading(loading);

    if (isPageLoading) return <LoadingScreen label="Cargando ventas..." />;

    return (
        <AppLayout fullWidth>
            <TableIconHeader
                icon={<PointOfSaleOutlinedIcon />}
                title={t("sells.table.header.title")}
                subtitle={t("sells.table.header.subtitle")}
            />

            <SellsContextBand
                period={period}
                periodOptions={SELLS_PERIOD_VALUES}
                periodAvailability={periodAvailability}
                onPeriodChange={setPeriod}
                rangeLabel={formatSellsPeriodRangeLabel(period, periodRange, t)}
                kpis={kpis}
                sparkline={sparkline}
                sparklineBestDay={sparklineBestDay}
                facts={facts}
                partialsAlert={partialsAlert}
                hasSellsInPeriod={hasSellsInPeriod}
                loading={loading}
                error={error}
                onViewPartials={handleViewPartials}
            />

            <DataTable<Sell>
                rows={sells}
                columns={columns}
                getRowId={(row) => row._id}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage={t("sells.table.emptyMessage")}
                height={"35em"}
                search={{ value: searchTerm, onChange: setSearchTerm, placeholder: t("sells.table.searchPlaceholder") }}
                newItem={{
                    label: t("sells.table.newItem"),
                    href: "/new-sell",
                }}
                extraActions={
                    <Button
                        onClick={() => exportSellsToCsv(sells, `ventas-${dayjs().format("YYYY-MM-DD")}.csv`, t)}
                        disabled={loading || sells.length === 0}
                        disableElevation
                        startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: "1.1rem" }} />}
                        sx={(theme) => getTableActionButtonSx(theme, "primary")}
                    >
                        {t("sells.contextBand.csv.exportButton")}
                    </Button>
                }
                filters={
                    <TableFilterTabs
                        ariaLabel={t("sells.table.header.title")}
                        value={filter}
                        onChange={setFilter}
                        firstTabRef={partialsFilterChipRef}
                        options={SELL_FILTER_OPTIONS.map((option) => ({
                            value: option,
                            label: option === SellFilterEnum.All ? t("sells.filters.all") : t(`sells.status.${option}`),
                            count: counts[option],
                        }))}
                    />
                }
                deleteDialog={{
                    open: deleteDialog.open,
                    title: t("sells.table.deleteDialog.title"),
                    description: (
                        <>{t("sells.table.deleteDialog.descriptionPrefix")} <strong>{deleteDialog.name}</strong>{t("sells.table.deleteDialog.descriptionSuffix")}</>
                    ),
                    warningText: t("sells.table.deleteDialog.warningText"),
                    confirmLabel: t("sells.table.deleteDialog.confirmLabel"),
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />

            <SettleDebtDialog
                settleDebtDialog={settleDebtDialog}
                isSubmitting={settleDebtIsSubmitting}
                errorMessage={settleDebtErrorMessage}
                onConfirm={() => void handleSettleDebtConfirm()}
                onCancel={handleSettleDebtCancel}
            />
        </AppLayout>
    );
};

export default SellsListPage;
