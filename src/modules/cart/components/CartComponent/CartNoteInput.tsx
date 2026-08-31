import { InputBase, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { CartNoteInputProps } from "@typings/cart/cartComponentTypes";

const CartNoteInput = ({ note, onNoteChange }: CartNoteInputProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <InputBase
      value={note}
      onChange={(e) => onNoteChange(e.target.value)}
      placeholder={t("cart.summary.notePlaceholder")}
      slotProps={{ input: { "aria-label": t("cart.summary.noteAriaLabel") } }}
      sx={(theme: Theme) => ({
        width: "100%",
        border: `1px solid ${theme.custom?.darkGray}`,
        borderRadius: "8px",
        padding: "0.4em 0.6em",
        fontSize: "0.85rem",
        color: theme.custom?.fontColor,
      })}
    />
  );
};

export default CartNoteInput;
