import KioscoTitle from '../pages/LoginPage/components/LoginFormComponent/KioscoTitle';
import { render, screen } from '@testing-library/react';
import {it, describe, expect} from 'vitest';

describe('KioscoTitle', () => {

    it('should render correctly', () => {
        render(<KioscoTitle />);
    });

    it(`should show 'Stoko'`, () => {
        render(<KioscoTitle />);
        expect(document.querySelector('h1').textContent).toContain('Stoko');
        expect(screen.findAllByAltText("stoko icon")).toBeTruthy()
    });

});