import { MongoClientWrapper } from "./mongodb";
import { validateCpf } from "./validateCpf";

export async function signup(input: any): Promise<any> {
  const uri =
    "mongodb+srv://workcash:workcash123@cluster0.nsyimxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const client = MongoClientWrapper.getInstance(uri);
  await client.connect();
  const db = client.getDb();
  const collection = db.collection("account");

  try {
    const id = crypto.randomUUID();
    const existingAccount = await collection.findOne({ email: input.email });
    if (existingAccount) throw new Error("Account already exists");
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/))
      throw new Error("Invalid name");
    if (!input.email.match(/^(.+)@(.+)$/)) throw new Error("Invalid email");
    if (!validateCpf(input.cpf)) throw new Error("Invalid CPF");
    await collection.insertOne({
      accountId: id,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
    });

    return {
      accountId: id,
    };
  } finally {
    await client.close();
  }
}
