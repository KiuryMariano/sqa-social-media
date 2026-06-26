import { isPasswordValid, getPasswordValidationMessage } from "@/utils/password";

describe("Password Validation - Unit Tests", () => {
  // ==================== VALIDAÇÃO DE MÍNIMO DE CARACTERES ====================

  test("deve aceitar senha com exatamente 8 caracteres válidos", () => {
    const eightCharPassword = "Abcdef1@";

    expect(isPasswordValid(eightCharPassword)).toBe(true);

    const message = getPasswordValidationMessage(eightCharPassword);
    expect(message).toBe("");
  });
}
);
