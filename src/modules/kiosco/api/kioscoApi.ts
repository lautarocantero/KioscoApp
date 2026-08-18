import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";
import type {
    CreateKioscoBody,
    EditKioscoBody,
    InviteInfo,
    JoinKioscoBody,
    Kiosco,
    KioscoWithStats,
    UpdateMemberRoleBody,
} from "@typings/kiosco/kioscoTypes";

const baseUrl = createHttpClient(`${API_URL}/kiosco`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const getMyKioscosRequest = async (): Promise<KioscoWithStats[]> => {
    const response = await baseUrl.get<KioscoWithStats[]>("/my-kioscos");
    return response.data;
};

export const getInviteInfoRequest = async (kioscoId: string): Promise<InviteInfo> => {
    const response = await baseUrl.get<InviteInfo>(`/${kioscoId}/invite-info`);
    return response.data;
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const createKioscoRequest = async (data: CreateKioscoBody): Promise<{ kiosco: Kiosco; message: string }> => {
    const response = await baseUrl.post("/create", data);
    return response.data;
};

export const joinKioscoRequest = async (data: JoinKioscoBody): Promise<{ kiosco: Kiosco; message: string }> => {
    const response = await baseUrl.post("/join", data);
    return response.data;
};

export const selectKioscoRequest = async (kioscoId: string): Promise<void> => {
    await baseUrl.post(`/${kioscoId}/select`);
};

/*══════════════════════════════════════════════════════════════════════════╗
║ ✏️ PUT / 🗑️ DELETE                                                       ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const editKioscoRequest = async (kioscoId: string, data: EditKioscoBody): Promise<void> => {
    await baseUrl.put(`/${kioscoId}`, data);
};

export const removeKioscoMemberRequest = async (kioscoId: string, userId: string): Promise<void> => {
    await baseUrl.delete(`/${kioscoId}/member/${userId}`);
};

export const updateKioscoMemberRoleRequest = async (
    kioscoId: string,
    userId: string,
    data: UpdateMemberRoleBody,
): Promise<void> => {
    await baseUrl.put(`/${kioscoId}/member/${userId}/role`, data);
};
