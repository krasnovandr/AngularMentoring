import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // const unwrappedVariants: number[] = ko.unwrap(params.recordsPerPageVariants);
  // if (unwrappedVariants && unwrappedVariants.length) {
  //     // only overwrite if supplied
  //     this.recordsPerPageVariants(unwrappedVariants);
  // }

  // this.currentPage : number = 1;
// this.currentPageInput = ko.observable('1');
// this.pageInputIsInError = ko.observable(false);
// this.recordsPerPageSubscription = null;

// this.totalRecords = ko.observable(ko.unwrap(params.totalRecords));
// this.recordsPerPage = ko.observable(ko.unwrap(params.recordsPerPage));
// this.pageSizeDropPosition = params.pageSizeVariantsDropdownPosition;
// this.setCurrentPage(ko.unwrap(params.currentPage));

//   this.recordsPerPageSubscription = this.recordsPerPage.subscribe(this.recordsPerPageSubscriptionFunction);

//   // these are callbacks from the container that hosts the pager component
//   this.paginationEventCallback = params.paginationEventCallback;

//   if (params.paginationSettingsChangedEvent) {
//       params.paginationSettingsChangedEvent.on(this.onPaginationSettingsChanged);
//   }

//   this.totalPages = ko.computed(() => {
//       const rows: number = this.totalRecords();
//       const pageSize: number = this.recordsPerPage();
//       const totalPages: number = Math.floor(rows / pageSize);

//       return (rows % pageSize === 0 && rows !== 0) ? totalPages : (totalPages + 1);
//   });

//   this.rowDisplayProperty = ko.computed(() => {
//       let end: number = this.recordsPerPage() * this.currentPage();
//       const totalRecords: number = this.totalRecords();
//       const start: number = (totalRecords !== 0) ? end - this.recordsPerPage() + 1 : 0;
//       if (end > totalRecords) {
//           end = totalRecords;
//       }

//       return `${start} - ${end} of ${totalRecords}`;
//   });
// }

// // provide a mechanism for the host container to notify the component that it should reinitialize
// // its internal state
// public onPaginationSettingsChanged = (settings: IPaginationSettings): void => {
//   this.disableCallbacks();
//   if (settings.currentPage) {
//       this.setCurrentPage(settings.currentPage);
//   } else {
//       this.setCurrentPage(1);
//   }

//   this.totalRecords(ko.unwrap(settings.totalRecords));

//   this.recordsPerPage(settings.recordsPerPage);
//   this.enableCallbacks();
// }

// public nextPage(): void {
//   if (this.isNextAvailable()) {
//       this.setCurrentPage(this.currentPage() + 1);
//   }
// }

// public isNextAvailable(): boolean {
//   return this.currentPage() < this.totalPages();
// }

// public previousPage(): void {
//   if (this.isPreviousAvailable()) {
//       this.setCurrentPage(this.currentPage() - 1);
//   }
// }

// public isPreviousAvailable(): boolean {
//   return this.currentPage() > 1;
// }

// public firstPage(): void {
//   this.setCurrentPage(1);
// }

// public isFirstOrLastAvailable(): boolean {
//   return this.totalPages() > 1;
// }

// public lastPage(): void {
//   this.setCurrentPage(this.totalPages());
// }

// public setRecordsPerPage(pageSize: number): void {
//   this.recordsPerPage(pageSize);
// }

// public currentPageInputChanged(): void {
//   const newPage: number = parseInt(this.currentPageInput(), 10);
//   if (isNaN(newPage)) {
//       this.pageInputIsInError(true);

//       return;
//   } else if (newPage < 1) {
//       this.setCurrentPage(1);

//       return;
//   } else if (newPage > this.totalPages()) {
//       this.setCurrentPage(this.totalPages());

//       return;
//   }
//   this.setCurrentPage(newPage);
// }

// private throwOnInvalidParams(params: IPagerParam): void {
//   const totalRecords: number = ko.unwrap(params.totalRecords);
//   if (isNaN(totalRecords)) {
//       throw new TypeError('totalRecords must be a number');
//   } else if (totalRecords < 0) {
//       throw new RangeError('totalRecords must be >= 0');
//   }

//   const currentPage: number = ko.unwrap(params.currentPage);
//   if (currentPage) {
//       if (isNaN(totalRecords)) {
//           throw new TypeError('currentPage must be a number');
//       } else if (currentPage <= 0) {
//           throw new RangeError('currentPage must be > 0');
//       }
//   }

//   const recordsPerPage: number = ko.unwrap(params.recordsPerPage);
//   if (isNaN(recordsPerPage)) {
//       throw new TypeError('recordsPerPage must be a number');
//   } else if (recordsPerPage < 0) {
//       throw new RangeError('recordsPerPage must be >= 0');
//   }

//   if (params.pageSizeVariantsDropdownPosition !== DropdownPosition.Down &&
//       params.pageSizeVariantsDropdownPosition !== DropdownPosition.Up) {
//       throw new RangeError('pageSizeVariantsDropdownDirection must be a valid DropdownPosition value.');
//   }
// }

// private setCurrentPage(page: string | number): void {
//   this.pageInputIsInError(false);
//   this.currentPage(<number>page);
//   this.currentPageInput(<string>page);
//   this.onPaginationDataChanged();
// }

// private recordsPerPageSubscriptionFunction = (): void => {
//   this.setCurrentPage(1);
//   this.onPaginationDataChanged();
// }

// private disableCallbacks(): void {
//   this.callbacksEnabled = false;
//   if (this.recordsPerPageSubscription) {
//       this.recordsPerPageSubscription.dispose();
//   }
// }

// private enableCallbacks(): void {
//   this.callbacksEnabled = true;
//   this.recordsPerPageSubscription = this.recordsPerPage.subscribe(this.recordsPerPageSubscriptionFunction);
// }

// private onPaginationDataChanged(): void {
//   if (this.paginationEventCallback && this.callbacksEnabled) {
//       this.paginationEventCallback({
//           requestedPage: this.currentPage(),
//           recordsPerPage: this.recordsPerPage()
//       });
//   }
// }

}
