import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DietPlan } from '../models/dietplan.model';
import { DietPlanRequest } from '../models/dietplanrequests.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DietplanService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllDietPlans(): Observable<DietPlan[]> {
    return this.http.get<DietPlan[]>(
      `${this.apiUrl}/api/DietPlan`
    );
  }

  deleteDietPlan(dietPlanId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/api/DietPlan/${dietPlanId}`,
      { responseType: 'text' as 'json' }
    );
  }

  getDietPlanById(id: number): Observable<DietPlan> {
    return this.http.get<DietPlan>(
      `${this.apiUrl}/api/DietPlan/${id}`
    );
  }

  addDietPlan(requestObject: DietPlan): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/DietPlan`,
      requestObject,
      { responseType: 'text' as 'json' }
    );
  }

  updateDietPlan(id: number, requestObject: DietPlan): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/api/DietPlan/${id}`,
      requestObject,
      { responseType: 'text' as 'json' }
    );
  }

  getAppliedDietPlans(userId: string): Observable<DietPlanRequest[]> {
    return this.http.get<DietPlanRequest[]>(
      `${this.apiUrl}/dietplanrequests/user/${userId}`
    );
  }
}