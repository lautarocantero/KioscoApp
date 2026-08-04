import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ResetPasswordStatusEnum } from "@typings/auth/authEnums";
import ResetPasswordError from "../../pages/ResetPasswordPage/components/ResetPasswordError";

describe("ResetPasswordError", () => {
  it("no renderiza nada cuando status es Success", () => {
    const { container } = render(
      <ResetPasswordError
        status={ResetPasswordStatusEnum.Success}
        errorMessage="Algún error"
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("no renderiza nada cuando status es Idle", () => {
    const { container } = render(
      <ResetPasswordError
        status={ResetPasswordStatusEnum.Idle}
        errorMessage="Algún error"
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza el mensaje de error cuando status es Error", () => {
    render(
      <ResetPasswordError
        status={ResetPasswordStatusEnum.Error}
        errorMessage="Las contraseñas no coinciden"
      />
    );
    expect(
      screen.getByText("Las contraseñas no coinciden")
    ).toBeInTheDocument();
  });

  it("renderiza aunque errorMessage sea null (no debería explotar)", () => {
    const { container } = render(
      <ResetPasswordError
        status={ResetPasswordStatusEnum.Error}
        errorMessage={null}
      />
    );
    expect(container).not.toBeEmptyDOMElement();
  });
});
