import { Component, Directive, ElementRef, Renderer } from '@angular/core';
import { lorem } from 'faker';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  wordsPerMinute = 0;
  totalWords = 0;
  finalTime = null;
  initialTime= null;
  initialised = false;
  isFinished = false;
  randomText='';
  enteredText='';
  constructor(private http: HttpClient) { }

  ngOnInit(){
    const myInput = document.getElementById('enter-text-here');
    myInput.onpaste = function(e) {
      e.preventDefault();
    }
    myInput.oncut = function(e) {
      e.preventDefault();
    }
    myInput.oncopy = function(e) {
      e.preventDefault();
    }
    this.http.get('http://poetrydb.org/author,title/Shakespeare;Sonnet').subscribe(data => console.log(data));
    this.randomText = lorem.paragraph();
    this.totalWords = this.randomText.split(' ').length;
    console.log(this.totalWords);
  }

  onInput(value: string){
    this.enteredText = value;
    if(this.enteredText === this.randomText){
      this.finalTime = moment();
      var duration = moment.duration(this.finalTime.diff(this.initialTime));
      var minutes = duration.asMinutes();
      this.wordsPerMinute = Math.floor((this.totalWords)/minutes);
    }
    
  }

  compareLetter(enteredLetter, requiredLetter){
    if(!enteredLetter){
      return "black";
    }
    else if(enteredLetter === requiredLetter){
      if(this.initialised === false){
        this.initialised = true;
        this.initialTime =  moment();
      }
      return "green";
    }
    else{
      if(this.initialised === false){
        this.initialised = true;
        this.initialTime =  moment();
      }
      return "red";
    }
  }
}



