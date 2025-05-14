
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Output() pageChanged = new EventEmitter<number>();
  @Output() itemsPerPageChanged = new EventEmitter<number>();

  itemsPerPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems']) {
      this.calculateTotalPages();
    }
  }

  calculateTotalPages(): void {
    this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
    // If current page is now invalid, reset to page 1
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
      this.pageChanged.emit(this.currentPage);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }

  changeItemsPerPage(): void {
    // Convert from string to number if needed
    this.itemsPerPage = Number(this.itemsPerPage);
    this.calculateTotalPages();
    this.currentPage = 1; // Reset to first page when changing items per page
    this.itemsPerPageChanged.emit(this.itemsPerPage);
    this.pageChanged.emit(this.currentPage);
  }

  visiblePages(): number[] {
    const maxPagesToShow = 5;
    const pages: number[] = [];
    
    if (this.totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than max
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;
      
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }
}