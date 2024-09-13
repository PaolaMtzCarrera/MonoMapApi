import express, { Request, Response } from "express";
import { envs } from "./config/env";
import { MongoDatabase } from "./data/init";
import { MonoMapModel } from "./data/models/init.models";

console.log(envs.PORT);

const app = express();
app.use(express.json());

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

app.get('/', (req: Request, res: Response) => {
    res.send("Hola");
});

app.post("/", async (req: Request, res: Response) => {
    try {
        const { lat, lng, genre, age } = req.body;
        const newMono = await MonoMapModel.create({
            lat,
            lng,
            genre,
            age
        });
        return res.json(newMono);
    } catch (error) {
    }
});

app.listen(envs.PORT, () => {
    console.log(`Server running on PORT ${envs.PORT}`);
});