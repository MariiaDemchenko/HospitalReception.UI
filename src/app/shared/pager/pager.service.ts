import { Injectable } from '@angular/core';

const defaultTotalPages = 10;
const defaultTotalItems = 9;
@Injectable({
  providedIn: 'root'
})
export class PagerService {
  getPager(totalItems: number, currentPage: number = 1, pageSize: number = defaultTotalItems) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);


    // ensure current page isn't out of range
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    let startPage: number, endPage: number;
    if (totalPages <= defaultTotalPages) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= defaultTotalPages / 2 + 1) {
        startPage = 1;
        endPage = defaultTotalPages;
      } else if (currentPage + defaultTotalPages / 2 - 1 >= totalPages) {
        startPage = totalPages - (defaultTotalPages - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - defaultTotalPages / 2;
        endPage = currentPage + defaultTotalPages / 2 - 1;
      }
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
