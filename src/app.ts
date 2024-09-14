import express, { Request, Response } from "express";
import { envs } from "./config/env";
import { MongoDatabase } from "./data/init";
import { AppRoutes } from "./presentation/router";

console.log(envs.PORT);

const app = express();
app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
    try {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONDO_DB
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
    }
})();

app.listen(envs.PORT, () => {
    console.log(`Server running on PORT ${envs.PORT}`);
});