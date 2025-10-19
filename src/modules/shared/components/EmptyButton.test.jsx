import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import EmptyButton from "../../shared/components/EmptyButton";


describe('EmptyButton', () => {
  it('should render EmptyButtoncorrectly', () => {
        render(<EmptyButton 
                buttonText={'Iniciar sesión'}
                buttonOnClick={() => {}}
              />)
  });

  it('should render the text correctly', () => {
        render(<EmptyButton 
                buttonText={'Registrarse'}
                buttonOnClick={() => {}}
              />)
        expect(screen.queryAllByText('Registrarse'));
  });
});