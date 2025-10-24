import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach } from "node:test";
import { describe, it, expect } from "vitest";
import RegisterForm from "../pages/RegisterPage/components/RegisterForm";
import '@testing-library/jest-dom'


beforeEach(cleanup)

describe('RegisterForm', () => {

    it('should render correctly', () => {
        render(<RegisterForm />)
    })

    it('should be a form', () => {
        render(<RegisterForm />)
        const form = screen.getByRole('form')
        expect(form).toBeInTheDocument()
    })



})