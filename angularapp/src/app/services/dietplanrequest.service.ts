import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DietPlanRequest } from '../models/dietplanrequests.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DietplanrequestService {

  public apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addDietPlanRequest(data: DietPlanRequest): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/api/DietPlanRequest`,
      data,
      { responseType: 'text' as 'json' }
    );
  }

  getAppliedPlans(userId: string): Observable<DietPlanRequest[]> {
    return this.http.get<DietPlanRequest[]>(
      `${this.apiUrl}/api/DietPlanRequest/user/${userId}`
    );
  }

  deletePlanApplication(requestedId: number): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/api/DietPlanRequest/${requestedId}`,
      { responseType: 'text' as 'json' }
    );
  }

  getAllPlanRequests(): Observable<DietPlanRequest[]> {
    return this.http.get<DietPlanRequest[]>(
      `${this.apiUrl}/api/DietPlanRequest`
    );
  }

  updatePlanStatus(
    id: number,
    planApplication: DietPlanRequest
  ): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/api/DietPlanRequest/${id}`,
      planApplication
    );
  }
}
