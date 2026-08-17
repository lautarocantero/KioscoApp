import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FormikProps } from "formik";
import { renderWithTheme } from "../utils/setupTests";
import AccountPasswordSection from "../../components/SettingsModal/sections/AccountPasswordSection";
import { useAccountPasswordForm } from "@hooks/account/useAccountPasswordForm";
import type { AccountPasswordFormValues } from "@typings/settings/settingsTypes";

vi.mock("@hooks/account/useAccountPasswordForm");

const mockedUseAccountPasswordForm = vi.mocked(useAccountPasswordForm);

const baseFormik = {
  handleSubmit: vi.fn(),
  values: { currentPassword: "", newPassword: "", repeatNewPassword: "" },
  setFieldValue: vi.fn(),
  errors: {},
} as unknown as FormikProps<AccountPasswordFormValues>;

describe("AccountPasswordSection", () => {
  it("muestra la fila 'Contraseña' con el botón Editar y dispara openDialog al hacer click", async () => {
    const openDialog = vi.fn();
    mockedUseAccountPasswordForm.mockReturnValue({
      formik: baseFormik,
      isSubmitting: false,
      errorMessage: null,
      isDialogOpen: false,
      openDialog,
      closeDialog: vi.fn(),
    });

    const user = userEvent.setup();
    renderWithTheme(<AccountPasswordSection />);

    expect(screen.getByText("Contraseña")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Editar" }));

    expect(openDialog).toHaveBeenCalledTimes(1);
  });

  it("renderiza el diálogo de cambio de contraseña abierto cuando isDialogOpen es true", () => {
    mockedUseAccountPasswordForm.mockReturnValue({
      formik: baseFormik,
      isSubmitting: false,
      errorMessage: null,
      isDialogOpen: true,
      openDialog: vi.fn(),
      closeDialog: vi.fn(),
    });

    renderWithTheme(<AccountPasswordSection />);

    expect(screen.getByText("Actualiza tu contraseña")).toBeInTheDocument();
    expect(screen.getByText("Introduce tu contraseña actual y una nueva contraseña.")).toBeInTheDocument();
  });
});
