import LoginSideTitle from '../pages/LoginPage/components/LoginFormComponent/LoginSideTitle';
import { render } from '@testing-library/react';
import {describe, it} from 'vitest';


describe('LoginSideTitle', () => {
  it('should render correctly', () => {
    render(<LoginSideTitle />);
  });
})