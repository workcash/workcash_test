import AccountDAO from "./AccountDAO";
import { validateCpf } from "./validateCpf";

export default class Signup {
  constructor(readonly accountDAO: AccountDAO) {}

  async execute(input: any) {
    const id = crypto.randomUUID();
    const existingAccount = await this.accountDAO.findOne({
      email: input.email,
    });
    if (existingAccount) throw new Error("Account already exists");
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/))
      throw new Error("Invalid name");
    if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
    if (!validateCpf(input.cpf)) throw new Error("Invalid CPF");
    await this.accountDAO.insertOne({
      accountId: id,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
    });

    return {
      accountId: id,
    };
  }
}
