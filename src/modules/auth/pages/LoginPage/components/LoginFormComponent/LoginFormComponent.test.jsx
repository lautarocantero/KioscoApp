import { render } from "@testing-library/react";
import { describe, test } from "vitest";
import LoginFormComponent from "./LoginFormComponent";


describe('LoginFormComponent', () => {
    test('should render LoginFormComponent correctly', () => {
        render(<LoginFormComponent />);
    });
});