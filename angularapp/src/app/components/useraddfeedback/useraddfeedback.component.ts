import { Component } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent {

  showPopup = false;

  feedbackObj: any = {
    userId: 0,
    feedbackText: '',
    date: new Date().toISOString()
  };

  constructor(private feedbackService: FeedbackService) {}

  submit(form: any) {

    if (form.invalid) {
      return;
    }

    // Get logged-in user id from localStorage
    const userId = localStorage.getItem('userId');

    this.feedbackObj.userId = Number(userId);

    this.feedbackService.sendFeedback(this.feedbackObj)
      .subscribe({
        next: (response) => {
          console.log(this.feedbackObj);
          console.log('Success:', response);
          this.showPopup = true;

          form.resetForm();
        },
        error: (error) => {
          console.error('Error:', error);
          console.error('Backend Response:', error.error);
        }
      });
  }

  closePopup() {
    this.showPopup = false;
  }
}