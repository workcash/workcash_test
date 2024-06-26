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
    const acc = await collection.findOne({ email: input.email });
    if (acc) return -4;
    if (!input.name.match(/[a-zA-Z] [a-zA-Z]+/)) return -3;
    if (!input.email.match(/^(.+)@(.+)$/)) return -2;
    if (!validateCpf(input.cpf)) return -1;
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
