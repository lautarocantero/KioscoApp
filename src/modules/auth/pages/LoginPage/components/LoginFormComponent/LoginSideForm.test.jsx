import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import LoginSideForm from "./LoginSideForm";

describe('LoginSideForm', () => {
  it('should render LoginSideForm correctly', () => {
    render(<LoginSideForm />);
  });
});