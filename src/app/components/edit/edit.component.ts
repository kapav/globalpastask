import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, FieldsetModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({
    name: new FormControl(),
    author: new FormControl(),
    pageCount: new FormControl(),
    language: new FormControl(),
    genre: new FormControl(),
  });

  constructor(public ref: DynamicDialogRef /*, public config: DynamicDialogConfig */) {
    // console.log("Data: " + JSON.stringify(config.data.book));
  }

  ngOnInit() {
    debugger;
    console.log('EditComponent');
  }
}
