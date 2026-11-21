import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  selectedUser: any = null;
  isFeedLoading: boolean = false;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.isFeedLoading = true;

    this.feedbackService.getFeedbacks().subscribe({
      next: (data: any) => {
        this.feedbacks = data;
        this.isFeedLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isFeedLoading = false;
      }
    });
  }

  showProfile(item: any): void {
    this.selectedUser = item.user || item;
  }

  closeProfile(): void {
    this.selectedUser = null;
  }

  // Returns only 10 records for the current page
  get paginatedFeedbacks(): Feedback[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.feedbacks.slice(startIndex, startIndex + this.pageSize);
  }

  // Calculates total pages
  get totalPages(): number {
    return Math.ceil(this.feedbacks.length / this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}