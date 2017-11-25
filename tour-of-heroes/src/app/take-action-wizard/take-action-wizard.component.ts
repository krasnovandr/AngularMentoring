import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-take-action-wizard',
  templateUrl: './take-action-wizard.component.html',
  styleUrls: ['./take-action-wizard.component.css']
})
export class TakeActionWizardComponent implements OnInit {
  isCompleted = false;
  constructor() { }

  ngOnInit() {
  }
  onStep1Next() {
    alert('onStep1Next');
  }

  onStep2Next() {
    alert('onStep2Next');
  }

  onStep3Next() {
    alert('onStep3Next');
  }

  onComplete() {
    this.isCompleted = true;
  }
}
