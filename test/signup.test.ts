import { signup } from "../src/signup";
test("deve testar o signup", async function () {
  const input = {
    name: "J Santos",
    email: `a${Date.now()}@a.com`,
    cpf: "97456321558",
  };

  const result = await signup(input);

  expect(result).toEqual({ accountId: expect.any(String) });
});
