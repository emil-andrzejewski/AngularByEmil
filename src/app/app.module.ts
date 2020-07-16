import { AsyncClientIDValidator } from './validators/async-clientID.validator';
import { ClientDeleteComponent } from './client-delete/client-delete.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GithubProfileService } from './services/github-profile.service';
import { TitleCasePipe } from './common/title-case.pipe';
import { TitleCaseComponent } from './title-case/title-case.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { NewCourseFormComponent } from './new-course-form/new-course-form.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { ZippyComponent } from './zippy/zippy.component';
import { ArchivesService } from './services/archives.service';
import { PostService } from './services/post.service';
import { FollowersService } from './services/followers.service';
import { FollowersComponent } from './followers/followers.component';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NotFoundError } from './common/not-found-error';
import { AppErrorHandler } from './common/app-error-handler';
import { ClientsService } from './services/clients.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ClientsComponent } from './clients/clients.component';
import { PostsComponent } from './posts/posts.component';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import { ClientCreateComponent } from './client-create/client-create.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    GithubProfileComponent,
    FollowersComponent,
    PostsComponent,
    ZippyComponent,
    CourseFormComponent,
    NewCourseFormComponent,
    PasswordChangeComponent,
    SignupFormComponent,
    ContactFormComponent,
    TitleCaseComponent,
    TitleCasePipe,
    ClientsComponent,
    ClientEditComponent,
    ClientDeleteComponent,
    ClientCreateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule, 
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    RouterModule.forRoot([
      { path: '', component: ClientsComponent},
      { path: 'clients', component: ClientsComponent },
      { path: 'followers/:id/:username', component: GithubProfileComponent },
      { path: 'followers', component: FollowersComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'zippy', component: ZippyComponent },
      { path: 'courseForm', component: CourseFormComponent },
      { path: 'newCourseForm', component: NewCourseFormComponent },
      { path: 'singUpForm', component: SignupFormComponent },
      { path: 'contact', component: ContactFormComponent },
      { path: 'title-case', component: TitleCaseComponent },      
      { path: '**', component: NotFoundError }
    ])
  ],
  providers: [
    ClientsService,
    FollowersService,
    PostService,
    ArchivesService,
    GithubProfileService,
    AsyncClientIDValidator,
    { provide: ErrorHandler, useClass: AppErrorHandler } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
