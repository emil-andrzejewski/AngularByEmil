import { Injectable } from '@angular/core';

@Injectable()
export class ArchivesService {
  archive = [
    {year: 2017, number: 1},
    {year: 2017, number: 2},
    {year: 2017, number: 3},
  ];

  constructor() { }
}
