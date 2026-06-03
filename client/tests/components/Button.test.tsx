import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "@/components/Button";

describe("Button Component - Unit Tests", () => {

  test("Deve renderizar botão com texto correto", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });
}
);
