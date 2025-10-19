import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import LoginAppBar from "./LoginAppBar";


describe('LoginAppBar', () => {

    it('should render correctly', () => {
        render(<LoginAppBar />);
    });

});