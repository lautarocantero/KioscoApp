import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import RegisterFormButtons from "../../pages/RegisterPage/components/RegisterFormButtons";

const defaultProps = {
    errors: {},
    isSubmitting: false,
    onGoToLogin: () => {},
};

describe("RegisterFormButtons", () => {

    it('RegisterFormButtons should render google button', () => {
        render(<RegisterFormButtons {...defaultProps} />);
        const googleButton = screen.getByRole('button', { name: /google/i });
        expect(googleButton).toBeInTheDocument();
    });

    it('RegisterFormButtons should disable the submit button when disabled prop is true', () => {
        render(<RegisterFormButtons {...defaultProps} disabled={true} />);
        const submitButton = screen.getByRole('button', { name: /Registrarse/i });
        expect(submitButton).toBeDisabled();
    });

    it('RegisterFormButtons should disable the submit button when isSubmitting is true', () => {
        render(<RegisterFormButtons {...defaultProps} isSubmitting={true} />);
        const submitButton = screen.getByRole('button', { name: /Registrarse/i });
        expect(submitButton).toBeDisabled();
    });

    it('RegisterFormButtons should enable the submit button when not submitting and not disabled', () => {
        render(<RegisterFormButtons {...defaultProps} disabled={false} isSubmitting={false} />);
        const submitButton = screen.getByRole('button', { name: /Registrarse/i });
        expect(submitButton).not.toBeDisabled();
    });

});