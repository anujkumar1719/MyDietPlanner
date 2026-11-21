import { Component, OnInit } from '@angular/core';
import { DietplanService } from 'src/app/services/dietplan.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DietPlan } from 'src/app/models/dietplan.model';

@Component({
  selector: 'app-admineditplan',
  templateUrl: './admineditplan.component.html',
  styleUrls: ['./admineditplan.component.css']
})
export class AdmineditplanComponent implements OnInit {
  id = 0;
  showPopup:boolean = false;
 
  plan: DietPlan = {
    planName: '',
    description: '',
    duration: 0,
    createdAt: ''
  };
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dietPlanService: DietplanService
  ) {}
 
  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  
    this.dietPlanService.getDietPlanById(this.id).subscribe((data: any) => {
      this.plan = data;
  
      if (this.plan.createdAt) {
        this.plan.createdAt = new Date(this.plan.createdAt)
          .toISOString()
          .split('T')[0]; // yyyy-MM-dd
      }
    });
  }
 
  update(form: any) {
    if (form.invalid) {
      return;
    }
 
    this.dietPlanService.updateDietPlan(this.id, this.plan).subscribe(() => {
      this.showPopup = true;
    });
  }
 
  ok() {
    this.router.navigate(['/adminviewplan']);
  }
 
  back() {
    this.router.navigate(['/adminviewplan']);
  }
}
