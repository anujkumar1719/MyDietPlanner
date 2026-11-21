import { Component, OnInit } from '@angular/core';
import { DietplanrequestService } from 'src/app/services/dietplanrequest.service';

@Component({
  selector: 'app-userappliedplan',
  templateUrl: './userappliedplan.component.html',
  styleUrls: ['./userappliedplan.component.css']
})
export class UserappliedplanComponent implements OnInit {

  requests: any[] = [];
  filteredRequests: any[] = [];
  searchText = '';

  showDeletePopup = false;
  selectedId = 0;
  isLoadApplied = false;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private requestService: DietplanrequestService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {

    this.isLoadApplied = true;

    this.requestService.getAllPlanRequests().subscribe({
      next: (data: any) => {
        this.requests = data;
        this.filteredRequests = data;
        this.isLoadApplied = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoadApplied = false;
      }
    });
  }

  searchPlan(): void {

    const value = this.searchText.toLowerCase();

    this.filteredRequests = this.requests.filter(x =>
      x.dietPlan?.planName?.toLowerCase().includes(value)
    );

    // Reset to first page after search
    this.currentPage = 1;
  }

  openDelete(id: number): void {
    this.selectedId = id;
    this.showDeletePopup = true;
  }

  cancelDelete(): void {
    this.showDeletePopup = false;
  }

  confirmDelete(): void {

    this.requestService.deletePlanApplication(this.selectedId)
      .subscribe({
        next: () => {
          this.showDeletePopup = false;
          this.loadRequests();
        }
      });
  }

  // Pagination Data
  get paginatedRequests(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;

    return this.filteredRequests.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  // Total Pages
  get totalPages(): number {
    return Math.ceil(this.filteredRequests.length / this.pageSize);
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