import React from "react";
import { render, screen } from "@testing-library/react";
import Input from "@/components/Input";

describe("Input Component - Unit Tests", () => {

  test("Deve renderizar input com label e mensagem de erro", () => {
    render(<Input label="Email" error="Email inválido" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Email inválido")).toBeInTheDocument();
  });
}
);
