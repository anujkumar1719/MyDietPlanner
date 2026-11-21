import { User } from "./user.model";

export class Feedback{
    feedbackId?:number;
    userId:number;
    feedbackText:number;
    date:Date;

    user?:User;
}