import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, it } from "vitest";
import { MemoryRouter } from 'react-router-dom'
import LinksComponent from "../components/LinksComponent";

beforeEach(cleanup);

describe('LinksComponent', () => {
    const availableLinks = 
    [{label: "Inicio de sesión",to: "/login",underline: "underline"},
    {label: "Registro",to: "/register",underline: "none"}];

  it('should render LinksComponent', () => {
      render(
            <MemoryRouter>
                  <LinksComponent linksToShow={availableLinks} />
            </MemoryRouter>
      )
  });

  it('should render the text correctly', () => {
      render(
            <MemoryRouter>
                  <LinksComponent linksToShow={availableLinks}/>
            </MemoryRouter>
      )
        screen.getByText('Inicio de sesión');
        screen.getByText('Registro');
  });
});