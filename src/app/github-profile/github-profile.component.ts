import { GithubProfileService } from './../services/github-profile.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {
  public profile;
  username: string;

  object1 = {
    a: 'somestring',
    b: 42,
    c: false
  };
  

  constructor(
    private router: Router,
    private service: GithubProfileService,
    private route: ActivatedRoute) {}

  previous() {
    this.router.navigate(['/followers']
    //   , {
    //   queryParams: {page: 1, order: 'oldest' }
    // }
    ); 
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.username = params.get('username');
      });

    this.service.getProfile(this.username)
      .subscribe(profile => {
        this.profile = profile;// as unknown as Profil;
        console.log(this.profile);
      });

    console.log(this.profile);
    console.log(this.object1);
    
  }

  getServiceUrl() {
    return this.service.url+this.username;
  }

}

