import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DietPlanRequest } from 'src/app/models/dietplanrequests.model';
import { DietplanrequestService } from 'src/app/services/dietplanrequest.service';

@Component({
  selector: 'app-userplanform',
  templateUrl: './userplanform.component.html',
  styleUrls: ['./userplanform.component.css']
})
export class UserplanformComponent {

  dietPlanId: number = 0;
  showPopup: boolean = false;

  request: DietPlanRequest = {
    age: 0,
    weight: 0,
    height: 0,
    gender: '',
    activityLevel: '',
    goal: '',
    medicalConditions: '',
    createdAt: '',
    status: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: DietplanrequestService
  ) {
    this.dietPlanId = Number(this.route.snapshot.paramMap.get('id'));
  }

  submit(form: any): void {

    if (form.invalid) {
      return;
    }

    const userId = Number(localStorage.getItem('userId'));

    this.requestService.getAllPlanRequests().subscribe({
      next: (data) => {

        const alreadyApplied = data.some(
          x => x.userId === userId &&
               x.dietPlanId === this.dietPlanId
        );

        if (alreadyApplied) {
          alert('You have already applied for this plan.');
          this.router.navigate(['/userviewplan']);
          return;
        }

        const payload = {
          ...this.request,
          userId: userId,
          dietPlanId: this.dietPlanId,
          createdAt: new Date().toISOString(),
          status: 'Pending'
        };

        this.requestService.addDietPlanRequest(payload).subscribe({
          next: () => {
            this.showPopup = true;
          }
        });

      }
    });
  }

  ok(): void {
    this.showPopup = false;
    this.router.navigate(['/userviewplan']);
  }

  back(): void {
    this.router.navigate(['/userviewplan']);
  }
}