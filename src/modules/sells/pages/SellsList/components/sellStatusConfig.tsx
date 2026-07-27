import { SellStatusEnum } from "@typings/sells/sellsEnum";
import { StatusColorEnum } from "@typings/ui/uiEnums";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import IncompleteCircleOutlinedIcon from "@mui/icons-material/IncompleteCircleOutlined";


export const SELL_STATUS_CONFIG: Record<SellStatusEnum, { label: string; icon: React.ReactElement; accent: StatusColorEnum }> = {
    [SellStatusEnum.Completada]: { label: "Completada", icon: <CheckCircleOutlineIcon fontSize="small" />, accent: StatusColorEnum.Green },
    [SellStatusEnum.Parcial]: { label: "Parcial", icon: <IncompleteCircleOutlinedIcon fontSize="small" />, accent: StatusColorEnum.Gold },
};