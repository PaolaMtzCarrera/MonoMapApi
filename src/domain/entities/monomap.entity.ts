export interface IMonoMap{
    lat: number,
    lng: string,
    isEmailSent: boolean;
    genre: String,
    age: number,
    creationDate: Date,
}

export interface IMonoMapDocument extends Document, IMonoMap{}