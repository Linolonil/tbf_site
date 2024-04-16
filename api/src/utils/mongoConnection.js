import { MongoClient } from "mongodb";

import dotenv from 'dotenv';
dotenv.config();

const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DBNAME;
const collectionName = process.env.COLLECTIONNAME;
const collectionKda = process.env.COLLECTIONKDA;

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(mongoURL);

  const db = client.db(dbName);
  cachedDb = db;
  return db;
};

const mongoKdaResults = async () => {
  const db = await connectToDatabase();
  const collectionResults = db.collection(collectionKda);

  console.info("Conectando ao banco de dados...");
  console.info("Banco de dados conectado com sucesso!");

  return { collection: collectionResults };
};

const mongoResults = async () => {
  const db = await connectToDatabase();
  const collectionResults = db.collection(collectionName);

  console.info("Conectando ao banco de dados...");
  console.info("Banco de dados conectado com sucesso!");

  return { collection: collectionResults };
};

export default { mongoKdaResults, mongoResults };
