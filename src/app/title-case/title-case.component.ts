import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'title-case',
  templateUrl: './title-case.component.html',
  styleUrls: ['./title-case.component.css']
})
export class TitleCaseComponent implements OnInit {
  tytul: string;

  constructor() { }

  ngOnInit(): void {
  }
  onKeyUp(){
    console.log("lala");
  }

}
