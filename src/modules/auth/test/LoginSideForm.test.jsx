import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import LoginForm from "../pages/LoginPage/components/LoginFormComponent/LoginForm";

describe('LoginForm', () => {
  it('should render LoginForm correctly', () => {
    render(<LoginForm />);
  });
});