// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

import type { AuthRoleEnum } from "@typings/auth/authEnums";

// Espejo exacto de KioscoEntity en el back (@typings/kiosco).
interface KioscoEntity {
    _id: string;
    name: string;
    address: string;
    owner_id: string;
    invite_code: string;
    currency: string;
    created_at: string;
    updated_at: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type Kiosco = KioscoEntity;

export type KioscoWithStats = Kiosco & {
    role: AuthRoleEnum;
    sellers_count: number;
    sells_today_total: number;
    last_accessed_at: string | null;
};

export type InviteInfo = {
    invite_code: string;
    invite_link: string;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 API 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type CreateKioscoBody = {
    name: string;
    address: string;
};

export type JoinKioscoBody = {
    invite_code: string;
};

export type EditKioscoBody = {
    name?: string;
    address?: string;
    currency?: string;
};

export type UpdateMemberRoleBody = {
    role: AuthRoleEnum;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📝 FORMS 📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝📝               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type CreateKioscoFormValues = CreateKioscoBody;

export type JoinKioscoFormValues = JoinKioscoBody;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS 🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseKioscoSelectorReturn {
    kioscos: KioscoWithStats[];
    loading: boolean;
    error: string | null;
    clearError: () => void;
    handleEnterKiosco: (kiosco: KioscoWithStats) => Promise<void>;
    entering: string | null;
}

export interface UseActiveKioscoReturn {
    activeKiosco: KioscoWithStats | null;
    isAdmin: boolean;
}

export interface UseCreateKioscoReturn {
    isSubmitting: boolean;
    submitError: string | null;
    handleSubmit: (values: CreateKioscoFormValues) => Promise<void>;
}

export interface UseJoinKioscoReturn {
    isSubmitting: boolean;
    submitError: string | null;
    handleSubmit: (values: JoinKioscoFormValues) => Promise<void>;
}

export interface UseKioscoInviteReturn {
    inviteInfo: InviteInfo | null;
    loading: boolean;
    error: string | null;
    copied: boolean;
    handleCopy: () => void;
}
