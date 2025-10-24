import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, it } from "vitest";

beforeEach(cleanup);

describe('EmptyButton', () => {
    const availableLinks = 
    [{label: "Inicio de sesión",to: "/login",underline: "underline"},
    {label: "Registro",to: "/register",underline: "none"}];

  it('should render LinksComponent', () => {
        render(<LinksComponent linksToShow={availableLinks}/>)
  });

  it('should render the text correctly', () => {
        render(<LinksComponent linksToShow={availableLinks}/>)
        screen.getByText('Inicio de sesión');
        screen.getByText('Registro');
  });
});