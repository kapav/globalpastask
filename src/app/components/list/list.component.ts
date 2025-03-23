import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookService } from '../../services/book/book.service';
import { Book } from '../../interfaces/book.interface';
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
    const isAdd = true;
    this.ref = this.dialogService.open(EditComponent, {
      header: 'Добавление книги',
      width: '50vw',
      modal: true,
      contentStyle: { overflow: 'auto' },
      breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
      },
      data: {
        isAdd,
      },
    });
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
    console.log('dialogService:', this.dialogService);
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }
}
