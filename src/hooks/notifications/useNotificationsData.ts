import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { UseNotificationsDataReturn } from "@typings/notifications/notificationTypes";
import type { AppDispatch, RootState } from "../../store/notification/notificationSlice";
import { fetchNotificationsThunk } from "../../store/notification/notificationThunks";

// Cada cuánto se re-consulta la lista mientras la app está abierta, para
// que las notificaciones creadas por otros vendedores lleguen sin recargar.
const POLL_INTERVAL_MS = 45_000;

export const useNotificationsData = (): UseNotificationsDataReturn => {
    const dispatch = useDispatch<AppDispatch>();

    const items = useSelector((state: RootState) => state.notification.items);
    const loading = useSelector((state: RootState) => state.notification.loading);
    const error = useSelector((state: RootState) => state.notification.errorMessage);

    useEffect(() => {
        void dispatch(fetchNotificationsThunk());

        const intervalId = setInterval(() => {
            void dispatch(fetchNotificationsThunk());
        }, POLL_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    return { items, loading, error };
};

export default useNotificationsData;
