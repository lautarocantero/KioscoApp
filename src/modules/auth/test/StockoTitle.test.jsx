import StockoTitle from '../pages/LoginPage/components/LoginFormComponent/StockoTitle';
import { render, screen } from '@testing-library/react';
import {it, describe, expect} from 'vitest';

describe('StockoTitle', () => {

    it('should render correctly', () => {
        render(<StockoTitle />);
    });

    it(`should show 'Stocko'`, () => {
        render(<StockoTitle />);
        expect(document.querySelector('h1').textContent).toContain('Stocko');
        expect(screen.findAllByAltText("stocko icon")).toBeTruthy()
    });

});