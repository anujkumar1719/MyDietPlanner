import { DietPlan } from "./dietplan.model";
import { User } from "./user.model";

export interface DietPlanRequest
{
    dietPlanRequestId?:number;
    userId?:number;
    dietPlanId?:number;
    age:number;
    weight:number;
    height:number;
    gender:string;
    activityLevel:string;
    goal:string;
    medicalConditions:string;
    createdAt:string;
    status:string;
    user?:User;
    dietPlan?:DietPlan
}