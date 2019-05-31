import { SurveyService } from './../survey.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  surveyForm: FormGroup;

  constructor(public survey: SurveyService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.surveyForm = new FormGroup({
      feedback: new FormControl('', Validators.required),
      suggestions: new FormControl('')
    });
  }

  onSurvey() {
    console.log(this.surveyForm.value);
    this.survey.addSurvey(this.surveyForm.value.feedback, this.surveyForm.value.suggestions);
    this.surveyForm.reset();
    alert('Thank you for your feedback!');
  }
}
