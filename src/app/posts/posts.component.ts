import { BadRequestError } from './../common/bad-request-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from "./../services/post.service";
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private service: PostService) {  
  }  

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(posts => {
          this.posts = (posts as unknown as Object[]);
        });
  }

   createPost(input: HTMLInputElement) {
      let post = {title: input.value }
      this.posts.splice(0,0,post);

      input.value='';
            
      //(this.posts as Object[]).splice(0,0,post);
      
      this.service.create(post)
        .subscribe(
          response => {   
            console.log(response);
            //post['id']=response.id;
            
          }, 
          (error: AppError) => {
            this.posts.splice(0,1);
            if(error instanceof BadRequestError)
              alert('Bad input');
              //this.form.setErrors(error.originalError);
            else throw error;
          });
   }

  update(post,index) {
    this.posts[index].isRead = true;
    this.service.update(post) 
      .subscribe(
        response => {
          console.log(response);
        });
  }

  delete(post,index) {
    this.posts.splice(index,1);
    this.service.delete(3345)//post.id)
      .subscribe(
        response => {
          console.log(response);
          
        }, 
        (error: AppError) => {
          this.posts.splice(index,0,post);
          if(error instanceof NotFoundError)
            alert('This post has already been deleted');
          else throw error;
        });
  }

  getServiceUrl() {
    return this.service.url;
  }

}
