// src/modules/shared/test/setupTests.ts
import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("@hooks/auth/useGoogleAuth", () => ({
    useGoogleAuth: () => ({
        handleGoogleSignIn: vi.fn(),
        isLoading: false,
        error: null,
    }),
}));