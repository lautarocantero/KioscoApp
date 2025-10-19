import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrimaryButton from "../../shared/components/PrimaryButton";


describe('PrimaryButton', () => {
  it('should render PrimaryButtoncorrectly', () => {
        render(<PrimaryButton 
                buttonText={'Iniciar sesión'}
                buttonOnClick={() => {}}
              />)
  });

  it('should render the text correctly', () => {
        render(<PrimaryButton 
                buttonText={'Iniciar sesión'}
                buttonOnClick={() => {}}
              />)
        expect(screen.queryAllByText('Iniciar sesión'));
  });
});