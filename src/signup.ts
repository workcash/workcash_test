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

    if (!acc) {
      if (input.name.match(/[a-zA-Z] [a-zA-Z]+/)) {
        if (input.email.match(/^(.+)@(.+)$/)) {
          if (validateCpf(input.cpf)) {
            await collection.insertOne({
              accountId: id,
              name: input.name,
              email: input.email,
              cpf: input.cpf,
            });

            const obj = {
              accountId: id,
            };
            return obj;
          } else {
            // invalid cpf
            return -1;
          }
        } else {
          // invalid email
          return -2;
        }
      } else {
        // invalid name
        return -3;
      }
    } else {
      // already exists
      return -4;
    }
  } finally {
    await client.close();
  }
}
