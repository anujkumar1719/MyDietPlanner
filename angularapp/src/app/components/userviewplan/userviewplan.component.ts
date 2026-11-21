import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DietPlan } from 'src/app/models/dietplan.model';
import { DietplanService } from 'src/app/services/dietplan.service';
import { DietplanrequestService } from 'src/app/services/dietplanrequest.service';

@Component({
  selector: 'app-userviewplan',
  templateUrl: './userviewplan.component.html',
  styleUrls: ['./userviewplan.component.css']
})
export class UserviewplanComponent implements OnInit {

  plans: DietPlan[] = [];
  filteredPlans: DietPlan[] = [];
  appliedPlanIds: number[] = [];

  searchText = '';
  isUserLoadPlan: boolean = false;

  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    private dietPlanService: DietplanService,
    private requestService: DietplanrequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlans();
    this.loadAppliedPlans();
  }

  loadPlans(): void {

    this.isUserLoadPlan = true;

    this.dietPlanService.getAllDietPlans().subscribe({
      next: (data) => {
        this.plans = data;
        this.filteredPlans = data;
        this.isUserLoadPlan = false;
      },
      error: (err) => {
        console.error(err);
        this.isUserLoadPlan = false;
      }
    });
  }

  loadAppliedPlans(): void {

    const userId = Number(localStorage.getItem('userId'));

    this.requestService.getAllPlanRequests().subscribe({
      next: (data) => {

        this.appliedPlanIds = data
          .filter(x => x.user.userId === userId)
          .map(x => x.dietPlan.dietPlanId);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  searchPlan(): void {

    const value = this.searchText.toLowerCase().trim();

    this.filteredPlans = this.plans.filter(plan =>
      plan.planName?.toLowerCase().includes(value) ||
      plan.description?.toLowerCase().includes(value)
    );

    // Reset to first page after search
    this.currentPage = 1;
  }

  isApplied(id: number): boolean {
    return this.appliedPlanIds.includes(id);
  }

  apply(id: number): void {
    this.router.navigate(['/userplanform', id]);
  }

  // Pagination

  get paginatedPlans(): DietPlan[] {

    const startIndex =
      (this.currentPage - 1) * this.pageSize;

    return this.filteredPlans.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  get totalPages(): number {

    return Math.ceil(
      this.filteredPlans.length / this.pageSize
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