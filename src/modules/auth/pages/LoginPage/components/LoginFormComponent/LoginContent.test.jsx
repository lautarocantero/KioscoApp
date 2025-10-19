import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import LoginContent from "./LoginContent";


describe('LoginContent', () => {
  it('should render correctly', () => {
        render(<LoginContent />);
  });
}); 