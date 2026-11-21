import { Component, OnInit } from '@angular/core';
import { DietplanService } from 'src/app/services/dietplan.service';
import { Router } from '@angular/router';
import { DietPlan } from 'src/app/models/dietplan.model';

@Component({
  selector: 'app-adminviewplan',
  templateUrl: './adminviewplan.component.html',
  styleUrls: ['./adminviewplan.component.css']
})
export class AdminviewplanComponent implements OnInit {

  plans: DietPlan[] = [];
  filteredPlans: DietPlan[] = [];

  searchText = '';
  showDeletePopup = false;
  selectedId = 0;
  isLoading: boolean = false;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private dietPlanService: DietplanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    this.isLoading = true;

    this.dietPlanService.getAllDietPlans().subscribe({
      next: (data) => {
        this.plans = data;
        this.filteredPlans = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  searchPlan(): void {
    const value = this.searchText.toLowerCase();

    this.filteredPlans = this.plans.filter(
      x =>
        x.planName.toLowerCase().includes(value) ||
        x.description.toLowerCase().includes(value)
    );

    // Reset to first page after search
    this.currentPage = 1;
  }

  edit(id: number): void {
    this.router.navigate(['/admineditplan', id]);
  }

  openDelete(id: number): void {
    this.selectedId = id;
    this.showDeletePopup = true;
  }

  cancelDelete(): void {
    this.showDeletePopup = false;
  }

  confirmDelete(): void {
    this.dietPlanService.deleteDietPlan(this.selectedId).subscribe(() => {
      this.showDeletePopup = false;
      this.loadPlans();
    });
  }

  // Paginated Data
  get paginatedPlans(): DietPlan[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredPlans.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  // Total Pages
  get totalPages(): number {
    return Math.ceil(this.filteredPlans.length / this.pageSize);
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