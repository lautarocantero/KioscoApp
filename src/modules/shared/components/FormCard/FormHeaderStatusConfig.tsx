import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IncompleteCircleOutlinedIcon from "@mui/icons-material/IncompleteCircleOutlined";
import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { FormHeaderStatusConfigEntry } from "@typings/shared/reactComponents";
import { StatusColorEnum } from "@typings/ui/uiEnums";


export const FORM_HEADER_STATUS_CONFIG: Record<SellStatusEnum, FormHeaderStatusConfigEntry> = {
    [SellStatusEnum.Completada]: { label: "Completada", icon: <CheckCircleOutlineIcon fontSize="small" />, accent: StatusColorEnum.Green },
    [SellStatusEnum.Parcial]: { label: "Parcial", icon: <IncompleteCircleOutlinedIcon fontSize="small" />, accent: StatusColorEnum.Gold },
};