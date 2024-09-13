import express, { request, Request, Response } from "express";
import { envs } from "./config/env";
import { MongoDatabase } from "./data/init";

console.log(envs.PORT);

const app = express();

(async () => {
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONDO_DB
    });
})();

app.get('/',(req:Request, res:Response)=>{
    res.send("Hola")
});

app.listen(envs.PORT, () => {
    console.log(`Server running on PORT ${envs.PORT}`);
});