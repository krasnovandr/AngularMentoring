import { Component, Inject, Input, OnInit, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { BaseModalRemoteService } from '../base-modal/base-modal-remote.service';
import { REMOTE_SERVICE } from '../base-modal/base-modal.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-course-delete-overlay',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Input()
  confirmationText: string;
  @Input()
  response: Subject<boolean>;

  innerHtml: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(REMOTE_SERVICE) private baseModalRemoteService: BaseModalRemoteService) { }

  ngOnInit() {
    this.innerHtml = this.sanitizer.bypassSecurityTrustHtml(this.confirmationText);
  }

  close() {
    this.response.next(false);
    this.baseModalRemoteService.close();
  }

  ok() {
    this.response.next(true);
    this.baseModalRemoteService.close();
  }
}
