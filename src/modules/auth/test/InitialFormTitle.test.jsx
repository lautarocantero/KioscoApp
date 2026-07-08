import { render, screen } from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import AuthTitle from '../pages/LoginPage/components/LoginFormComponent/AuthTitle'


describe('AuthTitle', () => {
  it('should render correctly', () => {
    render(<AuthTitle />);
  });

  it(`should show 'Stoko'`, () => {
        render(<AuthTitle />);
        expect(document.querySelector('h1').textContent).toContain('Stoko');
        expect(screen.findAllByAltText("stoko icon")).toBeTruthy()
  });

})