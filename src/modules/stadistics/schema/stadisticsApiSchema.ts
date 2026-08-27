import { z } from "zod";

// Valida la respuesta de GET /sell/monthly-report antes de confiar en ella
// (rule 9): viene de la red, no del tipado estático de TS.
export const MonthlySalesReportSchema = z.object({
    month: z.string(),
    totalSales: z.number(),
    totalRevenue: z.number(),
    averageTicket: z.number(),
});

// Valida la respuesta de GET /sell/monthly-report/detail antes de confiar en
// ella (rule 9) — espejo de MonthlyReportDetailType en el back.
const DailySalePointSchema = z.object({
    isoDate: z.string(),
    label: z.string(),
    amount: z.number(),
    isBest: z.boolean(),
});

const MonthlyReportSummarySchema = z.object({
    totalSales: z.number(),
    totalRevenue: z.number(),
    averageTicket: z.number(),
    ticketsPerDay: z.number(),
    previous: z.object({
        totalSales: z.number(),
        totalRevenue: z.number(),
        averageTicket: z.number(),
    }).nullable(),
});

const BestWeekSchema = z.object({
    label: z.string(),
    amount: z.number(),
});

const DailySalesSummarySchema = z.object({
    avgPerDay: z.number(),
    closedDays: z.number(),
    bestDay: DailySalePointSchema.nullable(),
    worstDay: DailySalePointSchema.nullable(),
    bestWeek: BestWeekSchema.nullable(),
});

const PaymentMethodBreakdownSchema = z.object({
    method: z.string(),
    amount: z.number(),
    percentage: z.number(),
});

const SellerReportRowSchema = z.object({
    sellerId: z.string(),
    sellerName: z.string(),
    amount: z.number(),
    ticketsCount: z.number(),
    participationPct: z.number(),
    changePct: z.number().nullable(),
    isNew: z.boolean(),
    maxTicketAmount: z.number(),
});

const HourlyBucketSchema = z.object({
    label: z.string(),
    amount: z.number(),
    isPeak: z.boolean(),
    isLow: z.boolean(),
});

const StockAlertsSchema = z.object({
    outOfStockCount: z.number(),
    outOfStockSoldInComparisonCount: z.number(),
    estimatedLostRevenue: z.number(),
    deadStockCount: z.number(),
    deadStockValue: z.number(),
    oldestDeadStock: z.object({
        name: z.string(),
        days: z.number(),
    }).nullable(),
});

const CurrentAccountSummarySchema = z.object({
    debtorsCount: z.number(),
    totalDebt: z.number(),
    collectedThisMonth: z.number(),
    newDebtThisMonth: z.number(),
    paymentsCount: z.number(),
});

const MonthlyReportMetaSchema = z.object({
    availableMonths: z.array(z.string()),
    canCompare: z.boolean(),
    daysInMonth: z.number(),
    generatedAt: z.string(),
});

export const MonthlyReportDetailSchema = z.object({
    month: z.string(),
    comparisonMonth: z.string().nullable(),
    meta: MonthlyReportMetaSchema,
    summary: MonthlyReportSummarySchema,
    dailySales: z.array(DailySalePointSchema),
    dailySalesSummary: DailySalesSummarySchema,
    paymentMethods: z.array(PaymentMethodBreakdownSchema),
    sellers: z.array(SellerReportRowSchema),
    sellersNote: z.object({
        sellerName: z.string(),
        maxTicketAmount: z.number(),
    }).nullable(),
    hourlyBuckets: z.array(HourlyBucketSchema),
    hourlySummary: z.object({
        peakLabel: z.string().nullable(),
        lowLabel: z.string().nullable(),
    }),
    stockAlerts: StockAlertsSchema,
    currentAccount: CurrentAccountSummarySchema,
});
