import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ResetPasswordInputs from "../../pages/ResetPasswordPage/components/ResetPasswordInputs";

let capturedProps: any[] = [];

vi.mock("../../../shared/components/PasswordField/PasswordField", () => ({
  default: (props: any) => {
    capturedProps.push(props);
    return (
      <input
        data-testid={`password-field-${props.name}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        aria-label={props.ariaLabel}
      />
    );
  },
}));

describe("ResetPasswordInputs", () => {
  const setFieldValue = vi.fn();

  beforeEach(() => {
    capturedProps = [];
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza los dos campos de contraseña", () => {
    render(
      <ResetPasswordInputs
        values={{ newPassword: "", repeatNewPassword: "" }}
        setFieldValue={setFieldValue}
        errors={{}}
      />
    );
    expect(screen.getByTestId("password-field-newPassword")).toBeInTheDocument();
    expect(
      screen.getByTestId("password-field-repeatNewPassword")
    ).toBeInTheDocument();
  });

  it("pasa los placeholders correctos", () => {
    render(
      <ResetPasswordInputs
        values={{ newPassword: "", repeatNewPassword: "" }}
        setFieldValue={setFieldValue}
        errors={{}}
      />
    );
    expect(screen.getByPlaceholderText("Nueva contraseña")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Repetí la nueva contraseña")
    ).toBeInTheDocument();
  });

  it("pasa los valores actuales a cada campo", () => {
    render(
      <ResetPasswordInputs
        values={{ newPassword: "abc123", repeatNewPassword: "xyz789" }}
        setFieldValue={setFieldValue}
        errors={{}}
      />
    );
    expect(screen.getByTestId("password-field-newPassword")).toHaveValue(
      "abc123"
    );
    expect(
      screen.getByTestId("password-field-repeatNewPassword")
    ).toHaveValue("xyz789");
  });

  it("llama a setFieldValue('newPassword', ...) al escribir en el primer campo", async () => {
    const user = userEvent.setup();
    render(
      <ResetPasswordInputs
        values={{ newPassword: "", repeatNewPassword: "" }}
        setFieldValue={setFieldValue}
        errors={{}}
      />
    );
    await user.type(screen.getByTestId("password-field-newPassword"), "a");
    expect(setFieldValue).toHaveBeenCalledWith("newPassword", "a");
  });

  it("llama a setFieldValue('repeatNewPassword', ...) al escribir en el segundo campo", async () => {
    const user = userEvent.setup();
    render(
      <ResetPasswordInputs
        values={{ newPassword: "", repeatNewPassword: "" }}
        setFieldValue={setFieldValue}
        errors={{}}
      />
    );
    await user.type(
      screen.getByTestId("password-field-repeatNewPassword"),
      "b"
    );
    expect(setFieldValue).toHaveBeenCalledWith("repeatNewPassword", "b");
  });

  it("marca error=true y pasa el helperText cuando hay errores de validación", () => {
    render(
      <ResetPasswordInputs
        values={{ newPassword: "", repeatNewPassword: "" }}
        setFieldValue={setFieldValue}
        errors={{ newPassword: "Muy corta", repeatNewPassword: "No coincide" }}
      />
    );
    const newPasswordProps = capturedProps.find((p) => p.name === "newPassword");
    const repeatProps = capturedProps.find(
      (p) => p.name === "repeatNewPassword"
    );
    expect(newPasswordProps.error).toBe(true);
    expect(newPasswordProps.helperText).toBe("Muy corta");
    expect(repeatProps.error).toBe(true);
    expect(repeatProps.helperText).toBe("No coincide");
  });

  it("marca error=false cuando no hay errores", () => {
    render(
      <ResetPasswordInputs
        values={{ newPassword: "", repeatNewPassword: "" }}
        setFieldValue={setFieldValue}
        errors={{}}
      />
    );
    const newPasswordProps = capturedProps.find((p) => p.name === "newPassword");
    const repeatProps = capturedProps.find(
      (p) => p.name === "repeatNewPassword"
    );
    expect(newPasswordProps.error).toBe(false);
    expect(repeatProps.error).toBe(false);
  });

  it("asigna los ariaLabel correctos a cada campo", () => {
    render(
      <ResetPasswordInputs
        values={{ newPassword: "", repeatNewPassword: "" }}
        setFieldValue={setFieldValue}
        errors={{}}
      />
    );
    const newPasswordProps = capturedProps.find((p) => p.name === "newPassword");
    const repeatProps = capturedProps.find(
      (p) => p.name === "repeatNewPassword"
    );
    expect(newPasswordProps.ariaLabel).toBe("Nueva contraseña");
    expect(repeatProps.ariaLabel).toBe("Repetir nueva contraseña");
  });
});
