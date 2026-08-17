import { API_URL } from "../../../config/api";
import type { NotificationEntity } from "@typings/notifications/notificationTypes";
import { createHttpClient } from "../../shared/api/httpClient";

const baseUrl = createHttpClient(`${API_URL}/notification`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const getNotificationsRequest = async (): Promise<NotificationEntity[]> => {
  const response = await baseUrl.get<NotificationEntity[]>("/get-notifications");
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ PATCH                                                                  ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const markAsReadRequest = async (_id: string): Promise<{ message: string }> => {
  const response = await baseUrl.patch<{ message: string }>("/mark-as-read", { _id });
  return response.data;
};

export const markAllAsReadRequest = async (): Promise<{ message: string }> => {
  const response = await baseUrl.patch<{ message: string }>("/mark-all-as-read");
  return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 🗑️ DELETE                                                                ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const deleteNotificationRequest = async (_id: string): Promise<{ message: string }> => {
  const response = await baseUrl.delete<{ message: string }>("/delete-notification", { data: { _id } });
  return response.data;
};

export const deleteAllNotificationsRequest = async (): Promise<{ message: string }> => {
  const response = await baseUrl.delete<{ message: string }>("/delete-all-notifications");
  return response.data;
};
