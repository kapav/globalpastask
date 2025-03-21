import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BookService } from '../../services/book/book.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, FieldsetModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
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
  }

  save() {

  }

  close() {

  }
}
