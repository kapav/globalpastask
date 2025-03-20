import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Book } from '../../interfaces/book.interface';
import { Books } from '../../mocks/books.mock';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardModule, ButtonModule, TableModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  loading: boolean = false;
  books!: Book[];

  ngOnInit() {
    this.books = Books;
  }

  add() {
      this.loading = true;

      setTimeout(() => {
          this.loading = false;
      }, 2000);
  }
}
