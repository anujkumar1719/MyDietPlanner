import { Component, OnInit } from '@angular/core';
import { DietplanrequestService } from 'src/app/services/dietplanrequest.service';
import { DietPlanRequest } from 'src/app/models/dietplanrequests.model';

@Component({
  selector: 'app-requestedplan',
  templateUrl: './requestedplan.component.html',
  styleUrls: ['./requestedplan.component.css']
})
export class RequestedplanComponent implements OnInit {

  requests: DietPlanRequest[] = [];
  filteredRequests: DietPlanRequest[] = [];

  searchText = '';
  statusFilter = '';

  selectedPlan: any = null;
  isRequestedPlanLoad: boolean = false;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private requestService: DietplanrequestService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {

    this.isRequestedPlanLoad = true;

    this.requestService.getAllPlanRequests().subscribe({
      next: (data: DietPlanRequest[]) => {
        console.log(data);

        this.requests = data;
        this.filteredRequests = data;

        this.isRequestedPlanLoad = false;
      },
      error: (err) => {
        console.error('Error loading requests', err);
        this.isRequestedPlanLoad = false;
      }
    });
  }

  filterData(): void {

    const search = this.searchText.toLowerCase();

    this.filteredRequests = this.requests.filter((x: any) => {

      const planName = x.planName || x.dietPlan?.planName || '';
      const status = x.status || '';

      return (
        planName.toLowerCase().includes(search) &&
        (this.statusFilter === '' || status === this.statusFilter)
      );
    });

    // Reset pagination after filtering
    this.currentPage = 1;
  }

  approve(item: DietPlanRequest): void {

    const updatedRequest = {
      ...item,
      user: null,
      dietPlan: null,
      status: 'Approved'
    };

    this.requestService
      .updatePlanStatus(item.dietPlanRequestId, updatedRequest)
      .subscribe({
        next: () => {
          this.loadRequests();
        },
        error: (err) => {
          console.error('Error approving request', err);
        }
      });
  }

  reject(item: DietPlanRequest): void {

    const updatedRequest = {
      ...item,
      user: null,
      dietPlan: null,
      status: 'Rejected'
    };

    this.requestService
      .updatePlanStatus(item.dietPlanRequestId, updatedRequest)
      .subscribe({
        next: () => {
          this.loadRequests();
        },
        error: (err) => {
          console.error('Error rejecting request', err);
        }
      });
  }

  showMore(item: any): void {
    this.selectedPlan = item;
  }

  closeModal(): void {
    this.selectedPlan = null;
  }

  // Pagination

  get paginatedRequests(): DietPlanRequest[] {

    const startIndex =
      (this.currentPage - 1) * this.pageSize;

    return this.filteredRequests.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredRequests.length / this.pageSize
    );
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