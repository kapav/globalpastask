import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookService } from '../../services/book/book.service';
import { Author } from '../../interfaces/author.interface';
import { Authors } from '../../mocks/authors.mock';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DropdownModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  authors!: Author[];
  editForm: FormGroup = new FormGroup({
    name: new FormControl(this.config.data.name),
    author: new FormControl(this.config.data.author),
    pageCount: new FormControl(this.config.data.pageCount),
    language: new FormControl(this.config.data.language),
    genre: new FormControl(this.config.data.genre),
  });

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private bookService: BookService,
  ) {
  }

  ngOnInit() {
    this.authors = Authors;
  }

  save() {
    console.log('this.editForm:', this.editForm);
    debugger;
    this.bookService.update({
      id: this.config.data.id,
      ...this.editForm.value,
    });
    this.ref.close();
  }

  close() {
    debugger;
    this.ref.close();
  }
}
