import { Component, OnInit } from '@angular/core';
import { Time } from 'src/app/models/time';



@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.css']
})
export class ChronometerComponent implements OnInit {

  time: Time;
  timer: any;

  constructor() { }

  ngOnInit() {
    this.time = new Time();
    this.start();
  }

  reset(): void {
    this.pause();
    this.time.minute = this.time.second = this.time.millesimal = 0;
  }

  pause(): void {
    clearInterval(this.timer);
  }

  getTime() {
    return this.time;
  }

  start(): void {
    if (this.timer) {
      this.pause();
    }

    this.timer = setInterval(() => {
      if (this.time.millesimal < 59) {
        this.time.millesimal++;
      }
      else {
        this.time.millesimal = 0;

        if (this.time.second < 59) {
          this.time.second++;
        }
        else {
          this.time.second = 0;
          this.time.minute++;
        }
      }
    }, 10);
  }
}
