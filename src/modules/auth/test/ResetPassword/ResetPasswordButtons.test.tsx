import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResetPasswordButtons from "../../pages/ResetPasswordPage/components/ResetPasswordButtons";

let capturedButtonProps: any;

vi.mock("../../../shared/components/Buttons/PrimaryButtonComponent", () => ({
  default: (props: any) => {
    capturedButtonProps = props;
    return (
      <button type={props.buttonType} disabled={props.disabled}>
        {props.buttonText}
      </button>
    );
  },
}));

describe("ResetPasswordButtons", () => {
  afterEach(() => {
    capturedButtonProps = undefined;
    vi.clearAllMocks();
  });

  it("renderiza el botón de restablecer contraseña", () => {
    render(<ResetPasswordButtons errors={{}} isSubmitting={false} />);
    expect(
      screen.getByRole("button", { name: "Restablecer contraseña" })
    ).toBeInTheDocument();
  });

  it("usa color 'default' cuando no hay errores", () => {
    render(<ResetPasswordButtons errors={{}} isSubmitting={false} />);
    expect(capturedButtonProps.buttonColor).toBe("default");
  });

  it("usa color 'error' cuando hay al menos un error", () => {
    render(
      <ResetPasswordButtons
        errors={{ newPassword: "Requerido" }}
        isSubmitting={false}
      />
    );
    expect(capturedButtonProps.buttonColor).toBe("error");
  });

  it("deshabilita el botón cuando isSubmitting es true", () => {
    render(<ResetPasswordButtons errors={{}} isSubmitting={true} />);
    expect(
      screen.getByRole("button", { name: "Restablecer contraseña" })
    ).toBeDisabled();
  });

  it("habilita el botón cuando isSubmitting es false", () => {
    render(<ResetPasswordButtons errors={{}} isSubmitting={false} />);
    expect(
      screen.getByRole("button", { name: "Restablecer contraseña" })
    ).toBeEnabled();
  });

  it("el botón es de tipo submit", () => {
    render(<ResetPasswordButtons errors={{}} isSubmitting={false} />);
    expect(capturedButtonProps.buttonType).toBe("submit");
  });
});
