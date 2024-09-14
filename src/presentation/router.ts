import { Router } from "express";
import { MonoMapRoutes } from "./monocases/router";

export class AppRoutes{

    static get routes(): Router{
        const router = Router();
        router.use("/api/monocases",MonoMapRoutes.routes)
        return router;
    }
}