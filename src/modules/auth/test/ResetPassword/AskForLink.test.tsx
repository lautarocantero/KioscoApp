import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import AskForLink from "../../pages/ResetPasswordPage/components/AskForLink";

vi.mock("../../../../shared/components/Buttons/PrimaryButtonComponent", () => ({
  default: ({ buttonText, buttonOnClick }: any) => (
    <button onClick={buttonOnClick}>{buttonText}</button>
  ),
}));

describe("AskForLink", () => {
  const handleGoToForgotPassword = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("no renderiza nada si hasToken es true", () => {
    const { container } = render(
      <AskForLink
        hasToken={true}
        errorMessage="Token inválido"
        handleGoToForgotPassword={handleGoToForgotPassword}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("muestra el mensaje de error cuando hasToken es false", () => {
    render(
      <AskForLink
        hasToken={false}
        errorMessage="El link expiró"
        handleGoToForgotPassword={handleGoToForgotPassword}
      />
    );
    expect(screen.getByText("El link expiró")).toBeInTheDocument();
  });

  it("muestra el botón para pedir un nuevo link", () => {
    render(
      <AskForLink
        hasToken={false}
        errorMessage="El link expiró"
        handleGoToForgotPassword={handleGoToForgotPassword}
      />
    );
    expect(
      screen.getByRole("button", { name: "Pedir un link nuevo" })
    ).toBeInTheDocument();
  });

  it("llama a handleGoToForgotPassword al hacer click en el botón", async () => {
    const user = userEvent.setup();
    render(
      <AskForLink
        hasToken={false}
        errorMessage="El link expiró"
        handleGoToForgotPassword={handleGoToForgotPassword}
      />
    );
    await user.click(screen.getByRole("button", { name: "Pedir un link nuevo" }));
    expect(handleGoToForgotPassword).toHaveBeenCalledTimes(1);
  });

  it("renderiza el ícono de error cuando hasToken es false", () => {
    const { container } = render(
      <AskForLink
        hasToken={false}
        errorMessage="El link expiró"
        handleGoToForgotPassword={handleGoToForgotPassword}
      />
    );
    expect(
      container.querySelector('[data-testid="ErrorOutlineIcon"]')
    ).toBeInTheDocument();
  });

  it("funciona sin errorMessage (prop opcional)", () => {
    const { container } = render(
      <AskForLink
        hasToken={false}
        handleGoToForgotPassword={handleGoToForgotPassword}
      />
    );
    expect(container).not.toBeEmptyDOMElement();
  });
});
