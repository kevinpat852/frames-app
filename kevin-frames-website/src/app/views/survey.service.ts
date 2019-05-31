import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient) { }

  addSurvey(feed: string, suggest: string) {
    let feedback = feed;
    let suggestions = suggest;
    let surveyArr = {feedback: feedback, suggestions: suggestions};
    this.http.post<{post_id: string, message: string}>('surveys/addSurvey', surveyArr).subscribe((response) => {
      console.log(response);
    })
  }
}
