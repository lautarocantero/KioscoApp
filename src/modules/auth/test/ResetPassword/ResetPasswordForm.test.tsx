import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ResetPasswordStatusEnum } from "@typings/auth/authEnums";
import ResetPasswordForm from "../../pages/ResetPasswordPage/components/ResetPasswordForm";

let capturedInputsProps: any;
let capturedErrorProps: any;
let capturedButtonsProps: any;

vi.mock("../../pages/ResetPasswordPage/components/ResetPasswordInputs", () => ({
  default: (props: any) => {
    capturedInputsProps = props;
    return <div data-testid="reset-password-inputs" />;
  },
}));

vi.mock("../../pages/ResetPasswordPage/components/ResetPasswordError", () => ({
  default: (props: any) => {
    capturedErrorProps = props;
    return <div data-testid="reset-password-error" />;
  },
}));

vi.mock("../../pages/ResetPasswordPage/components/ResetPasswordButtons", () => ({
  default: (props: any) => {
    capturedButtonsProps = props;
    return <div data-testid="reset-password-buttons" />;
  },
}));

describe("ResetPasswordForm", () => {
  const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) =>
    e.preventDefault()
  );
  const setFieldValue = vi.fn();
  const values = { newPassword: "abc", repeatNewPassword: "abc" };
  const errors = {};

  const renderForm = (overrides = {}) =>
    render(
      <ResetPasswordForm
        handleSubmit={handleSubmit}
        values={values}
        setFieldValue={setFieldValue}
        errors={errors}
        isSubmitting={false}
        errorMessage={null}
        status={ResetPasswordStatusEnum.Idle}
        {...overrides}
      />
    );

  afterEach(() => {
    vi.clearAllMocks();
    capturedInputsProps = undefined;
    capturedErrorProps = undefined;
    capturedButtonsProps = undefined;
  });

  it("renderiza un elemento <form>", () => {
    renderForm();
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renderiza ResetPasswordInputs, ResetPasswordError y ResetPasswordButtons", () => {
    renderForm();
    expect(screen.getByTestId("reset-password-inputs")).toBeInTheDocument();
    expect(screen.getByTestId("reset-password-error")).toBeInTheDocument();
    expect(screen.getByTestId("reset-password-buttons")).toBeInTheDocument();
  });

  it("llama a handleSubmit al enviar el formulario", () => {
    renderForm();
    fireEvent.submit(screen.getByRole("form"));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("pasa values, setFieldValue y errors a ResetPasswordInputs", () => {
    renderForm();
    expect(capturedInputsProps.values).toEqual(values);
    expect(capturedInputsProps.setFieldValue).toBe(setFieldValue);
    expect(capturedInputsProps.errors).toEqual(errors);
  });

  it("pasa status y errorMessage a ResetPasswordError", () => {
    renderForm({
      errorMessage: "Ups",
      status: ResetPasswordStatusEnum.Error,
    });
    expect(capturedErrorProps.status).toBe(ResetPasswordStatusEnum.Error);
    expect(capturedErrorProps.errorMessage).toBe("Ups");
  });

  it("pasa errors e isSubmitting a ResetPasswordButtons", () => {
    renderForm({ isSubmitting: true });
    expect(capturedButtonsProps.errors).toEqual(errors);
    expect(capturedButtonsProps.isSubmitting).toBe(true);
  });
});