import { isPasswordValid, getPasswordValidationMessage } from "@/utils/password";

describe("Password Validation - Unit Tests", () => {
  // ==================== TESTE DE BUG (FALHA) ====================

  test("[BUG] Mensagem de senha inconsistente - diz 8 mas exige 9+", () => {
    const eightCharPassword = "Abcdef1@";

    expect(isPasswordValid(eightCharPassword)).toBe(false);

    const message = getPasswordValidationMessage(eightCharPassword);
    expect(message).toContain("9");
  });
}
);
