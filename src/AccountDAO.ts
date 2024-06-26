import { Collection } from "mongodb";
import { MongoClientWrapper } from "./mongodb";

export default class AccountDAO {
  uri: string =
    "mongodb+srv://workcash:workcash123@cluster0.nsyimxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  collection: Collection<Document>;
  client: MongoClientWrapper;

  constructor() {
    this.client = MongoClientWrapper.getInstance(this.uri);
    this.connect();
    this.collection = this.client.getDb().collection("account");
  }
  async connect() {
    await this.client.connect();
  }
  async insertOne(account: any) {
    this.collection.insertOne(account);
    this.client.close();
  }
  async findOne(query: any) {
    const account = this.collection.findOne(query);
    this.client.close();
    return account;
  }
}
