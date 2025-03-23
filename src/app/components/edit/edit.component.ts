import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { BookService } from '../../services/book/book.service';
import { Author } from '../../interfaces/author.interface';
import { Authors } from '../../mocks/authors.mock';
import { Language } from '../../interfaces/language.interface';
import { Languages } from '../../mocks/languages.mock';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, DropdownModule, MessagesModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  authors!: Author[];
  languages!: Language[];
  editForm: FormGroup = new FormGroup({
    name: new FormControl(this.config.data.name),
    author: new FormControl(this.config.data.author),
    description: new FormControl(this.config.data.description),
    pageCount: new FormControl(this.config.data.pageCount),
    language: new FormControl(this.config.data.language),
    genre: new FormControl(this.config.data.genre),
  });
  messages: Message[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private bookService: BookService,
  ) {
  }

  ngOnInit() {
    this.authors = Authors;
    this.languages = Languages;
  }

  save() {
    console.log('this.editForm:', this.editForm);
    debugger;
    if (!(this.editForm.value.name
      && this.editForm.value.author
      && this.editForm.value.description
      && this.editForm.value.pageCount
      && this.editForm.value.language
      && this.editForm.value.genre)) {
        this.addMessages();
        return;
    }
    this.bookService.update({
      id: this.config.data.isAdd
        ? this.bookService.getNewId()
        : this.config.data.id,
      ...this.editForm.value,
    });
    this.clearMessages();
    this.ref.close();
  }

  close() {
    debugger;
    this.clearMessages();
    this.ref.close();
  }

  addMessages() {
    this.messages = [
      { severity: 'error', summary: 'Необходимо заполнить все поля' },
    ];
  }

  clearMessages() {
    this.messages = [];
  }
}
