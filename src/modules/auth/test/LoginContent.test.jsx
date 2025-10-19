import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import LoginContent from "../pages/LoginPage/components/LoginFormComponent/LoginContent";


describe('LoginContent', () => {
  it('should render correctly', () => {
        render(<LoginContent />);
  });
}); 