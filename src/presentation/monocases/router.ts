import { Router } from 'express';
import { MonoMapController } from './controller';
 

export class MonoMapRoutes {
    static get routes(): Router {
        const router = Router();
        const monoCaseController = new MonoMapController;

        router.get('/', monoCaseController.getMonoCase);
        router.get('/last-week', monoCaseController.getMonoCasesLastWeek);
        router.post('/', monoCaseController.createMonoCase);
        router.put('/:id', monoCaseController.updateMonoCase);
        router.delete('/:id', monoCaseController.deleteMonoCase);
        return router;
    }
}