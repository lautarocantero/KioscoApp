import { render, screen } from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import AuthTitle from '../pages/LoginPage/components/LoginFormComponent/AuthTitle'


describe('AuthTitle', () => {
  it('should render correctly', () => {
    render(<AuthTitle />);
  });

  it(`should show 'Stocko'`, () => {
        render(<AuthTitle />);
        expect(document.querySelector('h1').textContent).toContain('Stocko');
        expect(screen.findAllByAltText("stocko icon")).toBeTruthy()
  });

})