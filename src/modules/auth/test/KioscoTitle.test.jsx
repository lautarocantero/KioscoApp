import KioscoTitle from '../pages/LoginPage/components/LoginFormComponent/KioscoTitle';
import { render, screen } from '@testing-library/react';
import {it, describe, expect} from 'vitest';

describe('KioscoTitle', () => {

    it('should render correctly', () => {
        render(<KioscoTitle />);
    });

    it(`should show 'Kiosco'`, () => {
        render(<KioscoTitle />);
        expect(document.querySelector('h1').textContent).toContain('Kiosco');
        expect(screen.findAllByAltText("kiosco icon")).toBeTruthy()
    });

});