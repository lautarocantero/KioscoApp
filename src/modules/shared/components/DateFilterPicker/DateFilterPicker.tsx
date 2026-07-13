import type { FC } from "react";
import { useState } from "react";
import { Box, Typography, InputAdornment, type Theme } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { datePickerInputSx, fieldLabelSx } from "../sharedSx/sharedSx";
import type { DateFilterPickerProps } from "@typings/ui/datePicker.types";


const DateFilterPicker: FC<DateFilterPickerProps> = ({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  disableFuture = false,
  disablePast = false,
  isActive = false,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Typography sx={fieldLabelSx}>{label}</Typography>
      <DatePicker
        value={value}
        onChange={onChange}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        format="D [de] MMM [de] YYYY"
        minDate={minDate}
        maxDate={maxDate}
        disableFuture={disableFuture}
        disablePast={disablePast}
        disabled={disabled}
        slots={{ openPickerButton: () => null }}
        slotProps={{
          textField: {
            size: "small",
            onClick: () => !disabled && setOpen(true),
            sx: (theme: Theme) => datePickerInputSx(theme, isActive),
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthOutlinedIcon
                  fontSize="small"
                  sx={(theme: Theme) => ({
                    color: isActive ? theme.palette.primary.main : "inherit",
                  })}
                />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};

export default DateFilterPicker;