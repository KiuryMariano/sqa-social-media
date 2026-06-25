import React from "react";
import { render, screen } from "@testing-library/react";
import SignUpPage from "@/app/signup/page";

// Mock do Next.js routing
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock do módulo api
jest.mock("@/service/api", () => ({
  default: {
    post: jest.fn(() => Promise.resolve({ data: { id: 1, email: "test@example.com" } })),
  },
}));

// Mock do AuthContext
jest.mock("@/contexts/AuthContext", () => ({
  AuthContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  useAuth: () => ({
    login: jest.fn(),
    user: null,
    logout: jest.fn(),
  }),
}));

describe("SignUp Page - Integration Tests", () => {

  test("Deve renderizar página de signup com todos os elementos", () => {
    render(<SignUpPage />);

    expect(screen.getAllByText("Criar Conta")).toHaveLength(3); // Header, título e botão
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Senha")).toBeInTheDocument();
    expect(screen.getByText("Confirmar Senha")).toBeInTheDocument();
  });
}
);
