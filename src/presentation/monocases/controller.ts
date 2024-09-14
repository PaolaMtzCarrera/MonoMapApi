import { Request, Response } from "express";
import { MonoMapModel } from "../../data/models/monomap.models";

export class MonoMapController { 

    public getMonoCase = async (req: Request, res: Response) => {
        try {
            const monocase = await MonoMapModel.find();
            res.json(monocase);
        } catch (error) {
            console.error(error);
        }
    };

    public getMonoCasesLastWeek = async (req: Request, res: Response) => {
        try {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            const monocase = await MonoMapModel.find({
                creationDate: { $gte: oneWeekAgo }
            });
            res.json(monocase);
        } catch (error) {
            console.error(error);
        }
    };

    public createMonoCase = async (req: Request, res: Response) => {
        try {
            const { lat, lng, genre, age } = req.body;
            const newMonoCases = await MonoMapModel.create({
                lat,
                lng,
                genre,
                age,
            });
            return res.json(newMonoCases);
        } catch (error) {
            console.error(error);
        }
    };


    public updateMonoCase = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { lat, lng, genre, age } = req.body;
        try {
            const updatedMonoCase = await MonoMapModel.findByIdAndUpdate(id,{ 
                lat, 
                lng, 
                genre, 
                age 
            },
            { new: true, runValidators: true } 
            );
            return res.json(updatedMonoCase);
        } catch (error) {
            console.error(error);
        }
    };
    


    public deleteMonoCase = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await MonoMapModel.findByIdAndDelete(id);
            res.json({ message: "Registro eliminado" });
        } catch (error) {
            console.error(error);
        }
    };
}