import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import LoginAppBar from "../pages/LoginPage/components/LoginAppBar/LoginAppBar";


describe('LoginAppBar', () => {

    it('should render correctly', () => {
        render(<LoginAppBar />);
    });

});