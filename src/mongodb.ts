import { Db, MongoClient, ServerApiVersion } from "mongodb";

export class MongoClientWrapper {
  private static instance: MongoClientWrapper;
  private client: MongoClient;
  private dbName: string = "workcash_test";
  private isConnected: boolean = false;

  private constructor(uri: string) {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  public static getInstance(uri: string): MongoClientWrapper {
    if (!MongoClientWrapper.instance) {
      MongoClientWrapper.instance = new MongoClientWrapper(uri);
    }
    return MongoClientWrapper.instance;
  }

  public async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
    }
  }

  public getDb(): Db {
    if (!this.isConnected) {
      throw new Error("MongoClient is not connected");
    }
    return this.client.db(this.dbName);
  }

  public async close(): Promise<void> {
    if (this.isConnected) {
      await this.client.close();
      this.isConnected = false;
    }
  }
}
