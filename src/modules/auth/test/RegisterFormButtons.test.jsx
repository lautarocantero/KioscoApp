import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import RegisterFormButtons from "../pages/RegisterPage/components/RegisterFormButtons";

const defaultProps = {
    errors: {},
    isSubmitting: false,
    onGoToLogin: () => {},
};

describe("RegisterFormButtons", () => {

    it('RegisterFormButtons should render correctly', () => {
        render(<RegisterFormButtons {...defaultProps} />);
    });

    it('RegisterFormButtons should have registry button', () => {
        render(<RegisterFormButtons {...defaultProps} />);
        screen.getByRole('button', { name: /Registrarse/i });
    });

    it('should call onGoToLogin when clicking "Inicia Sesión"', () => {
        const onGoToLogin = vi.fn();
        render(<RegisterFormButtons {...defaultProps} onGoToLogin={onGoToLogin} />);
        screen.getByText('Inicia Sesión').click();
        expect(onGoToLogin).toHaveBeenCalledOnce();
    });

});