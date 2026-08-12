// src/modules/shared/test/setupTests.tsx
import { vi } from "vitest";
import "@testing-library/jest-dom";
import type { ReactNode } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { darkTheme } from "../../../../theme/mainTheme";
import { ProductDialogContext } from "../../../cart/context/Product/ProductDialogContext";

vi.mock("@hooks/auth/useGoogleAuth", () => ({
    useGoogleAuth: () => ({
        handleGoogleSignIn: vi.fn(),
        isLoading: false,
        error: null,
    }),
}));

//─── 🔎 Tema de prueba (tema real de la app) 🔎 ───
export const testTheme = darkTheme;

//─── 🔎 Mocks de contexto 🔎 ───
export const mockProductDialogContext = {
    setShowModal: vi.fn(),
    showModal: false,
};

//─── 🔎 Store de prueba 🔎 ───
export const buildTestStore = () =>
    configureStore({
        reducer: {
            dummy: (state = {}) => state,
        },
    });

//─── 🔎 Render solo con tema 🔎 ───
export const renderWithTheme = (ui: ReactNode, options?: Omit<RenderOptions, "wrapper">) =>
    render(
        <ThemeProvider theme={testTheme}>
            {ui}
        </ThemeProvider>,
        options
    );

//─── 🔎 Render con todos los providers 🔎 ───
interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
    store?: ReturnType<typeof buildTestStore>;
    productDialogContext?: typeof mockProductDialogContext;
}

export const renderWithProviders = (
    ui: ReactNode,
    { store = buildTestStore(), productDialogContext = mockProductDialogContext, ...options }: RenderWithProvidersOptions = {}
) =>
    render(
        <Provider store={store}>
            <ThemeProvider theme={testTheme}>
                <ProductDialogContext.Provider value={productDialogContext as any}>
                    {ui}
                </ProductDialogContext.Provider>
            </ThemeProvider>
        </Provider>,
        options
    );