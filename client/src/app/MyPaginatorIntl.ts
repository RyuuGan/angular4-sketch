import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

@Injectable()
export class MyPaginatorIntl extends MatPaginatorIntl {

  itemsPerPageLabel = '';
  nextPageLabel = '';
  previousPageLabel = '';
  outOf = '';

  constructor(private translate: TranslateService) {
    super();
    let translations = this.translate.instant([
      'Всего на странице:',
      'Следующая страница',
      'Предыдущая страница',
      'из'
    ]);
    this.itemsPerPageLabel = translations['Всего на странице:'];
    this.nextPageLabel = translations['Следующая страница'];
    this.previousPageLabel = translations['Предыдущая страница'];
    this.outOf = translations['из'];
  }

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.outOf} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.outOf} ${length}`;
  }
}
