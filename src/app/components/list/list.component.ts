import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Book } from '../../interfaces/book.interface';
import { Books } from '../../mocks/books.mock';
import { Footer } from 'primeng/api';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule, ButtonModule, TableModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit , OnDestroy {
  loading: boolean = false;
  books!: Book[];

  constructor(public dialogService: DialogService) {}

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.books = Books;
  }

  add() {
      this.loading = true;

      setTimeout(() => {
          this.loading = false;
      }, 2000);
  }

  edit(book: Book) {
    this.ref = this.dialogService.open(EditComponent, {
      header: 'Редактирование книги',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      data: {...book},
    });
    console.log('book:', book);
    console.log('dialogService:', this.dialogService);
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
