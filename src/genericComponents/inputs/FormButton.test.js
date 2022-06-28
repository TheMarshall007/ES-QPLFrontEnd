import React from "react";
import { render, screen } from "@testing-library/react";
import FormButton from "./FormButton";
import userEvent from "@testing-library/user-event";
import { FormFull } from "form-full";

describe("genericComponents / inputs / <FormButton />", () => {
  it('should render button with children text "Testando Botão"', () => {
    render(<FormButton name="submit">Testando Botão</FormButton>);

    // número de "expect" que deram certo;
    expect.assertions(1);
    const button = screen.getByRole("button", { name: /testando botão/i });
    expect(button).toBeInTheDocument();
  });

  it("should call function on button click", () => {
    const fn = jest.fn();
    render(
      <FormButton name="submit" onClick={fn}>
        Testando Botão
      </FormButton>
    );

    const button = screen.getByRole("button", { name: /testando botão/i });
    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    render(
      <FormButton name="submit" disabled>
        Testando Botão
      </FormButton>
    );
    const button = screen.getByRole("button", { name: /testando botão/i });
    expect(button).toBeDisabled();
  });

  it("should be enabled when not disabled", () => {
    render(<FormButton name="submit">Testando Botão</FormButton>);
    const button = screen.getByRole("button", { name: /testando botão/i });
    expect(button).toBeEnabled();
  });

  it("should call formHolder function on button click", () => {
    const fn = jest.fn();
    render(
      <FormFull onSubmit={fn}>
        <FormButton name="submit" actionType="submit">
          Testando Botão
        </FormButton>
      </FormFull>
    );

    const button = screen.getByRole("button", { name: /testando botão/i });
    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should match snapshot", () => {
    render(<FormButton name="submit">Testando Botão</FormButton>);
    const button = screen.getByRole("button", { name: /testando botão/i });
    expect(button).toMatchSnapshot();
  });
});
