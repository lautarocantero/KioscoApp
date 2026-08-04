import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResetPasswordPage from "../../pages/ResetPasswordPage/ResetPasswordPage";

vi.mock("../../layout/AuthLayout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-layout">{children}</div>
  ),
}));

vi.mock("../../pages/LoginPage/components/LoginFormComponent/LoginLoader", () => ({
  default: () => <div data-testid="login-loader">Loading...</div>,
}));

vi.mock("../../pages/LoginPage/components/LoginFormComponent/AuthTitle", () => ({
  default: () => <div data-testid="auth-title">Título</div>,
}));

vi.mock("../../pages/ResetPasswordPage/components/ResetPassword", () => ({
  default: () => <div data-testid="reset-password">ResetPassword</div>,
}));

describe("ResetPasswordPage", () => {
  it("renderiza AuthLayout envolviendo el contenido", () => {
    render(<ResetPasswordPage />);
    expect(screen.getByTestId("auth-layout")).toBeInTheDocument();
  });

  it("renderiza AuthTitle dentro de AuthLayout", () => {
    render(<ResetPasswordPage />);
    expect(screen.getByTestId("auth-title")).toBeInTheDocument();
  });

  it("renderiza ResetPassword dentro de AuthLayout", () => {
    render(<ResetPasswordPage />);
    expect(screen.getByTestId("reset-password")).toBeInTheDocument();
  });

  it("AuthTitle y ResetPassword están dentro de AuthLayout (composición correcta)", () => {
    render(<ResetPasswordPage />);
    const layout = screen.getByTestId("auth-layout");
    expect(layout).toContainElement(screen.getByTestId("auth-title"));
    expect(layout).toContainElement(screen.getByTestId("reset-password"));
  });
});

// Nota: no se testea el fallback real de <Suspense> (LoginLoader) porque
// ninguno de los hijos actuales "suspende" de verdad (React.lazy o una
// promesa lanzada). Si en el futuro ResetPassword se carga de forma
// diferida, agregar un test que mockee ese import como lazy y verifique
// que se muestra <LoginLoader /> antes de resolverse.