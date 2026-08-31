import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/auth/authSlice";
import type { UseSellPageHeaderResult } from "@typings/cart/cartTypes";
import { useActiveKiosco } from "../kiosco/useActiveKiosco";
import { formatSellHeaderDate } from "../../modules/cart/helpers/formatSellHeaderDate";

const CLOCK_REFRESH_MS = 60_000;

//─── 🔎 Datos de contexto del header de /new-sell: kiosco activo, vendedor 🔎 ───
// logueado y la fecha/hora actual (refrescada cada minuto para un POS en uso).
export const useSellPageHeader = (): UseSellPageHeaderResult => {
  const { activeKiosco } = useActiveKiosco();
  const sellerName = useSelector((state: RootState) => state.auth.name);
  const [dateLabel, setDateLabel] = useState(() => formatSellHeaderDate());

  useEffect(() => {
    const interval = setInterval(() => setDateLabel(formatSellHeaderDate()), CLOCK_REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  return {
    kioscoName: activeKiosco?.name ?? "",
    sellerName: sellerName ?? "",
    dateLabel,
  };
};

export default useSellPageHeader;
