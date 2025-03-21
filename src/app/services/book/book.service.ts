import { Injectable } from '@angular/core';
import { Book } from '../../interfaces/book.interface';
import { Books } from '../../mocks/books.mock';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books!: Book[];

  constructor() {
    this.books = Books;
  }

  getAll(): Book[] {
    return this.books;
  }

  update(book: Book): void {
    const index = this.books.findIndex(item => item.id === book.id);
    this.books.splice(index, 1, book);
  }
}
