import { useState, type ChangeEvent, type KeyboardEvent, type ReactNode } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { formatCurrency } from "../../../cart/helpers/formatCurrency";

type CartSubtotalCellProps = {
  productId: string;
  value: number;
  onChange: (productId: string, value: number) => void;
};

const EditableNumberCell = ({ productId, value, onChange }: CartSubtotalCellProps): ReactNode => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftValue, setDraftValue] = useState<string>(String(value));

  const startEditing = (): void => {
    setDraftValue(String(value));
    setIsEditing(true);
  };

  const commitValue = (): void => {
    const parsed = Number(draftValue);
    if (!Number.isNaN(parsed) && parsed > 0) {
      onChange(productId, parsed);
    }
    setIsEditing(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDraftValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") commitValue();
    if (event.key === "Escape") setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TextField
        // eslint-disable-next-line jsx-a11y/no-autofocus -- foco se mueve en respuesta a un click explícito del usuario, no al cargar la página
        autoFocus
        type="number"
        size="small"
        value={draftValue}
        onChange={handleChange}
        onBlur={commitValue}
        onKeyDown={handleKeyDown}
        inputProps={{ min: 0.01, step: "0.01", style: { textAlign: "center" } }}
        sx={{ width: "6.5em" }}
      />
    );
  }

  return (
    <Box
      onClick={startEditing}
      sx={{ cursor: "pointer", width: "100%", textAlign: "center", "&:hover": { opacity: 0.8 } }}
    >
      <Typography variant="body2">{formatCurrency(value)}</Typography>
    </Box>
  );
};

export default EditableNumberCell;