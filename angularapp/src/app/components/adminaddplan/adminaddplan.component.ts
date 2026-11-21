import { Component } from '@angular/core';
import { DietplanService } from 'src/app/services/dietplan.service';
import { Router } from '@angular/router';
import { DietPlan } from 'src/app/models/dietplan.model';

@Component({
  selector: 'app-adminaddplan',
  templateUrl: './adminaddplan.component.html',
  styleUrls: ['./adminaddplan.component.css']
})
export class AdminaddplanComponent {
  showPopup = false;
 
  plan: DietPlan = {
    planName: '',
    description: '',
    duration: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };
 
constructor(
    private dietPlanService: DietplanService,
    private router: Router
  ) {}
 
  submit(form: any) {
    if (form.invalid) {
      return;
    }
 
    this.dietPlanService.addDietPlan(this.plan).subscribe(() => {
      this.showPopup = true;
    });
  }
 
  ok() {
  this.router.navigate(['/adminviewplan']);
  }
}
