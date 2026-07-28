import { Box, Typography, type Theme } from "@mui/material";
import type { ReactNode } from 'react';
import { getTicketSummaryItems } from "./SummaryItems";
import type { TicketSummaryDetailsProps } from "@typings/seller/sellerComponentTypes";


const TicketSummaryDetailsComponent = ({ ticketSummary }: TicketSummaryDetailsProps): ReactNode => {

    if (!ticketSummary) return null;

    const summaryItems = getTicketSummaryItems(ticketSummary);

    return (
        <Box
            sx={(theme: Theme) => ({
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                backgroundColor: theme?.custom?.darkBackground,
                border: `1px solid ${theme?.custom?.darkGray}`,
                borderRadius: '0.8em',
                width: { xs: '90%', sm: '90%', md: "40em" },
                mb: '1.5em',
            })}
        >
            {summaryItems.map(({ id, icon: Icon, iconColor, label, value }, index) => (
                <Box
                    key={id}
                    sx={(theme: Theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6em',
                        flex: 1,
                        padding: '1em 1.2em',
                        borderBottom: {
                            xs: index < summaryItems.length - 1 ? `1px solid ${theme?.custom?.darkGray}` : 'none',
                            sm: 'none',
                        },
                        borderRight: {
                            xs: 'none',
                            sm: index < summaryItems.length - 1 ? `1px solid ${theme?.custom?.darkGray}` : 'none',
                        },
                    })}
                >
                    <Icon sx={(theme: Theme) => ({ color: iconColor(theme), fontSize: '1.3em' })} />
                    <Box sx={{ width: "100%" }}>
                        <Typography sx={(theme: Theme) => ({ color: theme?.custom?.darkWhite, fontSize: theme?.typography?.caption.fontSize })}>
                            {label}
                        </Typography>
                        <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontWeight: 600, fontSize: theme?.typography?.body2.fontSize, textAlign: { xs: "end", sm: "start" } })}>
                            {value}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default TicketSummaryDetailsComponent;