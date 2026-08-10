import { Box } from "@mui/material";
import type { ReactNode } from "react";
import ReceiptSummaryCard from "./ReceiptSummaryCard";
import ReceiptAdviceCard from "./ReceiptAdviceCard";
import type { ReceiptSideCardsProps } from "@typings/receipt/receiptComponentTypes";
import { RECEIPT_ADVICE_ITEMS } from "../../../../../config/constants";


const ReceiptSideCards = ({summaryCardProps}: ReceiptSideCardsProps ): ReactNode => {

  return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <ReceiptSummaryCard {...summaryCardProps} />
            <ReceiptAdviceCard adviceItems={RECEIPT_ADVICE_ITEMS} />
          </Box>
  );
};

export default ReceiptSideCards;