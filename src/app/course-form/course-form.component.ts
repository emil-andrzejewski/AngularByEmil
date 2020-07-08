import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {
  defaultValue: boolean=true;
  categories = [
    {id:1,name: 'Art'},
    {id:2,name: 'Development'},
    {id:3,name: 'Mathematics'}
  ];

  submit(course){
    console.log(course);
  }

  log(courseName){
    console.log(courseName);
  }

}
