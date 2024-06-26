import AccountDAO from "../src/AccountDAO";
import Signup from "../src/Signup";

let signup: Signup;
beforeEach(() => {
  const accountDAO = new AccountDAO();
  signup = new Signup(accountDAO);
});
test("deve testar o signup", async function () {
  const input = {
    name: "J Santos",
    email: `a${Date.now()}@a.com`,
    cpf: "97456321558",
  };

  const result = await signup.execute(input);

  expect(result).toEqual({ accountId: expect.any(String) });
});

test("deve testar o signup com email inválido", async function () {
  const input = {
    name: "J Santos",
    email: `a${Date.now()}a.com`,
    cpf: "97456321558",
  };

  await expect(() => signup.execute(input)).rejects.toThrow(
    new Error("Invalid email")
  );
});

test("deve testar o signup com cpf inválido", async function () {
  const input = {
    name: "J Santos",
    email: `a${Date.now()}@a.com`,
    cpf: "97456321559",
  };

  await expect(() => signup.execute(input)).rejects.toThrow(
    new Error("Invalid CPF")
  );
});

test("deve testar o signup com nome inválido", async function () {
  const input = {
    name: "J",
    email: `a${Date.now()}@a.com`,
    cpf: "97456321558",
  };

  await expect(() => signup.execute(input)).rejects.toThrow(
    new Error("Invalid name")
  );
});
