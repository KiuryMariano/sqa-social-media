import React from "react";
import { render, screen } from "@testing-library/react";
import SignInPage from "@/app/signin/page";

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

describe("SignIn Page - Integration Tests", () => {

  test("Deve renderizar página de signin com todos os elementos", () => {
    render(<SignInPage />);

    expect(screen.getAllByText("Entrar")).toHaveLength(3); // Header, título e botão
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Senha")).toBeInTheDocument();
  });
}
);
