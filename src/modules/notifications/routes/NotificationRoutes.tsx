import { Route } from "react-router-dom";
import type { ReactNode } from "react";
import NotificationsPage from "../pages/NotificationsPage/NotificationsPage";

const NotificationRoutes = (): ReactNode => {
    return (
        <>
            <Route path="/notifications" element={<NotificationsPage />} />
        </>
    );
};

export default NotificationRoutes;
