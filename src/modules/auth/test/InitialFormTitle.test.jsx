import { render, screen } from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import InitialFormTitle from '../pages/LoginPage/components/LoginFormComponent/InitialFormTitle'


describe('InitialFormTitle', () => {
  it('should render correctly', () => {
    render(<InitialFormTitle />);
  });

  it(`should show 'Kiosco'`, () => {
        render(<InitialFormTitle />);
        expect(document.querySelector('h1').textContent).toContain('Kiosco');
        expect(screen.findAllByAltText("kiosco icon")).toBeTruthy()
  });

})