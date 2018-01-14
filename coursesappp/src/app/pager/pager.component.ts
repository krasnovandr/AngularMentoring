import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { PagerOptions } from '../models/courses';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit, OnChanges {
  @Input() public totalRecords: number;
  @Input() public recordsPerPage: number;
  @Output() onPageChanged: EventEmitter<any> = new EventEmitter<any>();

  public recordsPerPageVariants: number[] = [5, 10, 15, 20];
  currentPage = 1;
  currentPageInput = this.currentPage;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  public nextPage(): void {
    if (this.isNextAvailable()) {
      this.setCurrentPage(this.currentPage + 1);
    }
  }

  public isNextAvailable(): boolean {
    return this.currentPage < this.totalPages;
  }

  public previousPage(): void {
    if (this.isPreviousAvailable()) {
      this.setCurrentPage(this.currentPage - 1);
    }
  }

  public isPreviousAvailable(): boolean {
    return this.currentPage > 1;
  }

  public firstPage(): void {
    this.setCurrentPage(1);
  }

  public isFirstOrLastAvailable(): boolean {
    return this.totalPages > 1;
  }

  public lastPage(): void {
    this.setCurrentPage(this.totalPages);
  }

  private setCurrentPage(page: number): void {
    this.currentPage = page;
    this.currentPageInput = page;
    this.onPageChanged.emit(new PagerOptions(this.currentPage, this.recordsPerPage));
  }

  get totalPages() {
    const pages: number = Math.floor(this.totalRecords / this.recordsPerPage);
    return this.totalRecords % this.recordsPerPage === 0 ? pages : (pages + 1);
  }

  get rowDisplayProperty() {
    let end: number = this.recordsPerPage * this.currentPage;
    const totalRecords: number = this.totalRecords;
    const start: number = (totalRecords !== 0) ? end - this.recordsPerPage + 1 : 0;
    if (end > totalRecords) {
      end = totalRecords;
    }

    return `${start} - ${end} of ${totalRecords}`;
  }

  updateRecordPerPage() {
    this.setCurrentPage(1);
    this.onPageChanged.emit(new PagerOptions(this.currentPage, this.recordsPerPage));
  }
  cuurentPageChanged() {
    if (this.currentPageInput < 1) {
      this.setCurrentPage(1);
      return;
    } else if (this.currentPageInput > this.totalPages) {
      this.setCurrentPage(this.totalPages);
      return;
    }

    this.setCurrentPage(this.currentPageInput);
    this.onPageChanged.emit(new PagerOptions(this.currentPage, this.recordsPerPage));
  }
}
