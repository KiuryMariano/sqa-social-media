import { isPasswordValid, getPasswordValidationMessage } from "@/utils/password";

describe("Password Validation - Unit Tests", () => {
  // ==================== TESTE DE BUG (FALHA) ====================

  test("[BUG] Mensagem de senha inconsistente - diz 8 mas exige 9+", () => {
    // BUG: A validação usa `password.length <= 8` que rejeita 8 caracteres,
    // mas a mensagem de erro diz "mínimo de 8 caracteres"
    // Isso é confuso - se o mínimo é 8, por que 8 é rejeitado?
    const eightCharPassword = "Abcdef1@"; // Exatamente 8 caracteres

    // A senha de 8 caracteres é inválida (correto)
    expect(isPasswordValid(eightCharPassword)).toBe(false);

    // BUG: A mensagem diz "mínimo de 8 caracteres" mas na verdade precisa ser 9+
    const message = getPasswordValidationMessage(eightCharPassword);
    expect(message).toContain("9"); // Este teste FALHA porque a mensagem diz "8"
  });
}
);
