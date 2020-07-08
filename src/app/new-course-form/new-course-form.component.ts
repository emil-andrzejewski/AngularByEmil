import { Component, OnInit } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'new-course-form',
  templateUrl: './new-course-form.component.html',
  styleUrls: ['./new-course-form.component.css']
})
export class NewCourseFormComponent  {
  form: FormGroup;
  // form = new FormGroup({
  //   name: new FormControl(),
  //   contact: new FormGroup({
  //     email: new FormControl(),
  //     phone: new FormControl()
  //   }),
  //   topics: new FormArray([])
  // });

  //forma budowania może być jak wyżej lub niżej przez FormBuilder
  constructor(fb: FormBuilder) {
    this.form = fb.group({
      name: [],
      contact: fb.group({
        email: [],
        phone: []
      }),
      topics: fb.array([])
    });
  }


  // FORM ARRAY
  
  addTopic(topic: HTMLInputElement) {
    this.topics.push(new FormControl(topic.value));
    topic.value='';
  }

  get topics(): FormArray{
    return (this.form.get('topics') as FormArray);
  }

  remove(i) {
    this.topics.removeAt(i);
  }

}
