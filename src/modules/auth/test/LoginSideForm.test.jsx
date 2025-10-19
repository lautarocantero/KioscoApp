import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import LoginSideForm from "../pages/LoginPage/components/LoginFormComponent/LoginSideForm";

describe('LoginSideForm', () => {
  it('should render LoginSideForm correctly', () => {
    render(<LoginSideForm />);
  });
});