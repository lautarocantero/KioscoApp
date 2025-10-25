import { render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import RegisterFormButtons from "../pages/RegisterPage/components/RegisterFormButtons";


describe("RegisterFormButtons", () => {

    it('RegisterFormButtons should render correctly', () => {
        render(<RegisterFormButtons />);
    });

    it('RegisterFormButtons should have registry button', () => {
        render(<RegisterFormButtons />);
        screen.getByRole('button', { name: /Registrarse/i });
    });

});