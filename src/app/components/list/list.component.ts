import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../interfaces/book.interface';
import { Author } from '../../interfaces/author.interface';
import { Authors } from '../../mocks/authors.mock';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule, ButtonModule, TableModule, DynamicDialogModule, PaginatorModule, MultiSelectModule, InputTextModule, DropdownModule, CommonModule],
  providers: [DialogService, DynamicDialogConfig],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit , OnDestroy {
  authors!: Author[];

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private bookService: BookService,
  ) {}

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.authors = Authors;
  }

  get books(): Book[] {
    return this.bookService.getAll();
  }

  edit(isAdd: boolean, book?: Book): void {
    const data = isAdd ? {
      isAdd,
    } : {
      isAdd,
      ...book,
    };
    this.ref = this.dialogService.open(EditComponent, {
      header: (isAdd ? 'Добавление' : 'Редактирование') + ' книги',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw',
      },
      data,
    });
    console.log('book:', book);
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
