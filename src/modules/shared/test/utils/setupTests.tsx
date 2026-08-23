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
import { SnackBarContext } from "../../components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
// Efecto lateral: inicializa i18next (mismo bootstrap que main.tsx) para
// que useTranslation()/t() resuelvan strings reales en los tests, en vez
// de devolver la key cruda por no haber Provider inicializado.
import "@i18n/i18n";

vi.mock("@hooks/auth/useGoogleAuth", () => ({
    useGoogleAuth: () => ({
        handleGoogleSignIn: vi.fn(),
        isLoading: false,
        error: null,
    }),
}));

// jsdom no implementa IntersectionObserver — mock mínimo para que los
// componentes que lo usan (ej. animaciones on-scroll) no rompan en tests.
class IntersectionObserverMock implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
}

vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

//─── 🔎 Tema de prueba (tema real de la app) 🔎 ───
export const testTheme = darkTheme;

//─── 🔎 Mocks de contexto 🔎 ───
export const mockProductDialogContext = {
    setShowModal: vi.fn(),
    showModal: false,
};

//─── 🔎 SnackBarContext: cualquier componente que haga            ───
//    `useContext(SnackBarContext)!` explota si no hay provider (el default
//    del contexto es null). Se centraliza acá para no repetirlo en cada
//    archivo de test — showSnackBar/closeSnackBar quedan disponibles para
//    hacer asserts sobre ellos si algún test lo necesita.
export const showSnackBar = vi.fn();
export const closeSnackBar = vi.fn();

export const mockSnackBarContext = {
    showSnackBar,
    closeSnackBar,
    snackBar: { open: false, message: "", color: AlertColor?.Info },
};

//─── 🔎 Store de prueba 🔎 ───
export const buildTestStore = () =>
    configureStore({
        reducer: {
            dummy: (state = {}) => state,
        },
    });

//─── 🔎 Render solo con tema (+ SnackBarContext) 🔎 ───
interface RenderWithThemeOptions extends Omit<RenderOptions, "wrapper"> {
    snackBarContext?: typeof mockSnackBarContext;
}

export const renderWithTheme = (
    ui: ReactNode,
    { snackBarContext = mockSnackBarContext, ...options }: RenderWithThemeOptions = {}
) =>
    render(
        <SnackBarContext.Provider value={snackBarContext as any}>
            <ThemeProvider theme={testTheme}>
                {ui}
            </ThemeProvider>
        </SnackBarContext.Provider>,
        options
    );

//─── 🔎 Render con todos los providers 🔎 ───
interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
    store?: ReturnType<typeof buildTestStore>;
    productDialogContext?: typeof mockProductDialogContext;
    snackBarContext?: typeof mockSnackBarContext;
}

export const renderWithProviders = (
    ui: ReactNode,
    {
        store = buildTestStore(),
        productDialogContext = mockProductDialogContext,
        snackBarContext = mockSnackBarContext,
        ...options
    }: RenderWithProvidersOptions = {}
) =>
    render(
        <Provider store={store}>
            <ThemeProvider theme={testTheme}>
                <SnackBarContext.Provider value={snackBarContext as any}>
                    <ProductDialogContext.Provider value={productDialogContext as any}>
                        {ui}
                    </ProductDialogContext.Provider>
                </SnackBarContext.Provider>
            </ThemeProvider>
        </Provider>,
        options
    );