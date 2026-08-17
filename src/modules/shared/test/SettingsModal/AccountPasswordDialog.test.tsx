import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FormikProps } from "formik";
import { renderWithTheme } from "../utils/setupTests";
import AccountPasswordDialog from "../../components/SettingsModal/sections/AccountPasswordDialog";
import type { AccountPasswordFormValues } from "@typings/settings/settingsTypes";

const buildFormik = (handleSubmit = vi.fn()) =>
  ({
    handleSubmit,
    values: { currentPassword: "", newPassword: "", repeatNewPassword: "" },
    setFieldValue: vi.fn(),
    errors: {},
  }) as unknown as FormikProps<AccountPasswordFormValues>;

describe("AccountPasswordDialog", () => {
  it("muestra los 3 campos de contraseña y cierra al hacer click en Cancelar", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderWithTheme(
      <AccountPasswordDialog open onClose={onClose} formik={buildFormik()} isSubmitting={false} errorMessage={null} />
    );

    expect(screen.getByPlaceholderText("Contraseña actual")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nueva contraseña")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirmar nueva contraseña")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("dispara formik.handleSubmit al enviar el formulario con 'Listo'", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((e?: { preventDefault?: () => void }) => e?.preventDefault?.());

    renderWithTheme(
      <AccountPasswordDialog
        open
        onClose={vi.fn()}
        formik={buildFormik(handleSubmit)}
        isSubmitting={false}
        errorMessage={null}
      />
    );

    await user.click(screen.getByRole("button", { name: "Listo" }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("muestra el mensaje de error cuando errorMessage no es null", () => {
    renderWithTheme(
      <AccountPasswordDialog
        open
        onClose={vi.fn()}
        formik={buildFormik()}
        isSubmitting={false}
        errorMessage="Contraseña incorrecta"
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Contraseña incorrecta");
  });
});
