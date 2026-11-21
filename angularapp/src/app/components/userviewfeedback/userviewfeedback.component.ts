import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  feedbacks: any[] = [];
  showDeletePopup = false;
  selectedId: number = 0;
  isLoadUseFeed: boolean = false;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.isLoadUseFeed = true;

    this.feedbackService.getFeedbacks().subscribe({
      next: (data: any) => {
        this.feedbacks = data;
        this.isLoadUseFeed = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoadUseFeed = false;
      }
    });
  }

  openDelete(id: number): void {
    this.selectedId = id;
    this.showDeletePopup = true;
  }

  cancelDelete(): void {
    this.showDeletePopup = false;
  }

  confirmDelete(): void {
    this.feedbackService.deleteFeedback(this.selectedId)
      .subscribe({
        next: () => {
          this.showDeletePopup = false;
          this.loadFeedbacks();
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  get paginatedFeedbacks(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.feedbacks.slice(startIndex, startIndex + this.pageSize);
  }

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