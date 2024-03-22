import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostForm } from '../post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass']
})
export class PostFormComponent {
  form: FormGroup

  @Output() onSubmit = new EventEmitter<PostForm>();

  @Input() initialValues: PostForm = null;


  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();


    this.populateForm();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      canComment: [true]
    });
  }

  populateForm(): void {
    if (this.initialValues) {
      const { title, body, canComment } = this.initialValues;




      this.form.setValue({
        title,
        body,
        canComment
      });
    }
  }


  get canLeave(): boolean {
    return !this.form.dirty;
  }

  submit(): void {
    const formValues = this.form.value;
    this.reset();
    this.onSubmit.emit(formValues);
  }

  reset(values?) {
    this.form.reset(values);
  }
}
