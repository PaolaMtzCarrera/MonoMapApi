import { MonoMapModel } from "../../data/models/monomap.models";
import { IMonoMapDocument } from "../entities/monomap.entity";

export class MonoMapDataSource{
    public updateMonoCase = async (id:String, mono_case:Partial<IMonoMapDocument>)=>{
        await MonoMapModel.findByIdAndUpdate(id,{
            lng: mono_case.lng,
            lat: mono_case.lat,
            isEmailSent: mono_case.isEmailSent,
            genre: mono_case.genre,
            age: mono_case.age,
            creationDate: mono_case.creationDate
        })
    }
}