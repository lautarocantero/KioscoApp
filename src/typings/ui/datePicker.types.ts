import type { Dayjs } from "dayjs";

export interface DateFilterPickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  disabled?: boolean;
}