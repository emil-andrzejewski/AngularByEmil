import { switchMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { FollowersService } from './../services/followers.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: any[];
  url;

  constructor(
    private route: ActivatedRoute,
    private service: FollowersService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ])
    .pipe(
      switchMap(combined => {
        let id= combined[0].get('id');
        let page = combined[1].get('page');
        let newest = combined[1].get('order');
        console.log(page);
        return this.service.getAll();
      })
    )    
    .subscribe(followers => {
          this.followers = Object.values(followers); 
      });

    //console.log(this.followers);
  }

  getServiceUrl() {
    return this.service.url;
  }

}
