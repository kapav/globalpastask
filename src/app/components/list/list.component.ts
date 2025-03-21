import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../interfaces/book.interface';
import { Books } from '../../mocks/books.mock';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule, ButtonModule, TableModule, DynamicDialogModule],
  providers: [DialogService, DynamicDialogConfig],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit , OnDestroy {
  loading: boolean = false;

  constructor(
    public dialogService: DialogService,
    public config: DynamicDialogConfig,
    private bookService: BookService,
  ) {}

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
  }

  get books(): Book[] {
    return this.bookService.getAll();
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
