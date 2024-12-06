import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { MongoClient } from "mongodb";
import { gqlschema } from "./schema.ts";
import { resolvers } from "./resolvers.ts";

const urlMongo = "mongodb+srv://gramirezg:rafa691228@nebrijacluster.q7zhz.mongodb.net/?retryWrites=true&w=majority&appName=NebrijaCluster"

if(!urlMongo)
  {
  console.log("No se ha podido conectar a la URL");
}

const client = new MongoClient(urlMongo);
const dbName = 'practica4';

await client.connect(); 
console.log('Connected successfully to server');
const db = client.db(dbName);
const vehiclesCollection = db.collection("vehicles");
const partsCollection = db.collection("parts");

const server = new ApolloServer({
  typeDefs: gqlschema,
  resolvers: resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ vehiclesCollection, partsCollection }),
});

console.log(`Server ready at: ${url}`);