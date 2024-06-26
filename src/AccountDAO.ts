import { Collection, Db } from "mongodb";
import { MongoClientWrapper } from "./mongodb";

export default class AccountDAO {
  private readonly uri: string =
    "mongodb+srv://workcash:workcash123@cluster0.nsyimxr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  private client: MongoClientWrapper;
  private db: Db | null = null;
  private collection: Collection | null = null;

  constructor() {
    this.client = MongoClientWrapper.getInstance(this.uri);
  }

  private async connect(): Promise<void> {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.getDb();
      this.collection = this.db.collection("account");
    }
  }

  private async close(): Promise<void> {
    await this.client.close();
    this.db = null;
    this.collection = null;
  }

  public async insertOne(account: Record<string, any>): Promise<void> {
    try {
      await this.connect();
      if (this.collection) {
        await this.collection.insertOne(account);
      }
    } catch (error) {
      console.error("Error inserting account:", error);
      throw error;
    } finally {
      await this.close();
    }
  }

  public async findOne(query: Record<string, any>): Promise<any> {
    try {
      await this.connect();
      if (this.collection) {
        return await this.collection.findOne(query);
      }
      return null;
    } catch (error) {
      console.error("Error finding account:", error);
      throw error;
    } finally {
      await this.close();
    }
  }
}
