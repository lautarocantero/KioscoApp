import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ResetPasswordStatusEnum } from "@typings/auth/authEnums";
import ResetPasswordSuccess from "../../pages/ResetPasswordPage/components/ResetPasswordSuccess";

vi.mock("../../../../shared/components/Buttons/PrimaryButtonComponent", () => ({
  default: ({ buttonText, buttonOnClick }: any) => (
    <button onClick={buttonOnClick}>{buttonText}</button>
  ),
}));

describe("ResetPasswordSuccess", () => {
  const handleGoToLogin = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("no renderiza nada cuando status es Error", () => {
    const { container } = render(
      <ResetPasswordSuccess
        status={ResetPasswordStatusEnum.Error}
        handleGoToLogin={handleGoToLogin}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("no renderiza nada cuando status es Idle", () => {
    const { container } = render(
      <ResetPasswordSuccess
        status={ResetPasswordStatusEnum.Idle}
        handleGoToLogin={handleGoToLogin}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("muestra el mensaje de éxito cuando status es Success", () => {
    render(
      <ResetPasswordSuccess
        status={ResetPasswordStatusEnum.Success}
        handleGoToLogin={handleGoToLogin}
      />
    );
    expect(
      screen.getByText("Tu contraseña fue actualizada con éxito.")
    ).toBeInTheDocument();
  });

  it("muestra el ícono de éxito cuando status es Success", () => {
    const { container } = render(
      <ResetPasswordSuccess
        status={ResetPasswordStatusEnum.Success}
        handleGoToLogin={handleGoToLogin}
      />
    );
    expect(
      container.querySelector('[data-testid="CheckCircleIcon"]')
    ).toBeInTheDocument();
  });

  it("muestra el botón para iniciar sesión", () => {
    render(
      <ResetPasswordSuccess
        status={ResetPasswordStatusEnum.Success}
        handleGoToLogin={handleGoToLogin}
      />
    );
    expect(
      screen.getByRole("button", { name: "Iniciar sesión" })
    ).toBeInTheDocument();
  });

  it("llama a handleGoToLogin al hacer click en el botón", async () => {
    const user = userEvent.setup();
    render(
      <ResetPasswordSuccess
        status={ResetPasswordStatusEnum.Success}
        handleGoToLogin={handleGoToLogin}
      />
    );
    await user.click(screen.getByRole("button", { name: "Iniciar sesión" }));
    expect(handleGoToLogin).toHaveBeenCalledTimes(1);
  });
});
