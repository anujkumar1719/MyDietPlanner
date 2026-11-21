import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  sendFeedback(feedback: Feedback): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/Feedback`,
      feedback,
      { responseType: 'text' as 'json' }
    );
  }

  getAllFeedbacksByUserId(userId: string): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${this.apiUrl}/api/Feedback/${userId}`
    );
  }

  deleteFeedback(feedbackId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/api/Feedback/${feedbackId}`,
      { responseType: 'text' as 'json' }
    );
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      `${this.apiUrl}/api/Feedback`
    );
  }
}