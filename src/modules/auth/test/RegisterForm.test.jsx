import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, it, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';
import RegisterForm from "../pages/RegisterPage/components/RegisterForm";
import authReducer from "../../../store/auth/authSlice";

const renderWithProviders = (ui) => {
    const store = configureStore({ reducer: { auth: authReducer } });
    return render(
        <Provider store={store}>
            <MemoryRouter>{ui}</MemoryRouter>
        </Provider>
    );
};

beforeEach(cleanup);

describe('RegisterForm', () => {

    it('should render correctly', () => {
        renderWithProviders(<RegisterForm />);
    });

    it('should be a form', () => {
        renderWithProviders(<RegisterForm />);
        const form = screen.getByRole('form');
        expect(form).toBeInTheDocument();
    });

});