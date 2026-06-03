import { isEmailValid } from "@/utils/email";

describe("Email Validation - Unit Tests", () => {
  // ==================== TESTE DE SUCESSO ====================

  test("Deve aceitar email válido com formato correto", () => {
    expect(isEmailValid("usuario@example.com")).toBe(true);
    expect(isEmailValid("user.name@domain.co")).toBe(true);
    expect(isEmailValid("test@test.br")).toBe(true);
  });
}
);
